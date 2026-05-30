import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";
import crypto from "crypto";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      email,
      name,
      arrival,
      departure,
      adults,
      children,
      specialRequest,
    } = body;

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    if (arrivalDate >= departureDate) {
      return NextResponse.json(
        { error: "Departure must be after arrival" },
        { status: 400 },
      );
    }

    const unavailableDate = await prisma.blockedDate.findFirst({
      where: {
        NOT: [
          { endDate: { lte: arrivalDate } },
          { startDate: { gte: departureDate } },
        ],
      },
    });

    if (unavailableDate) {
      return NextResponse.json(
        { error: "Selected dates are unavailable" },
        { status: 400 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const tokenExpiresAt = new Date();
    tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 30);

    const booking = await prisma.booking.create({
      data: {
        guestEmail: email,
        guestName: name,
        checkIn: arrivalDate,
        checkOut: departureDate,
        guestsCount: Number(adults) + Number(children),
        specialRequests: specialRequest,
        status: "PENDING",
        confirmationToken: token,
        tokenExpiresAt: tokenExpiresAt,
      },
    });

    const confirmUrl = `http://localhost:3000/api/bookings/confirm?token=${token}`;
    const cancelUrl = `http://localhost:3000/api/bookings/cancel?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirm Your Booking",
      html: `
        <div style="
          font-family: Arial;
          padding: 24px;
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
        ">
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #1a1a18;">
            Confirm Your Stay
          </h1>

          <p style="font-size: 15px; color: #444;">
            Hello ${name},
          </p>

          <p style="font-size: 15px; color: #444; line-height: 1.7;">
            Thank you for choosing Habitat.
            Please confirm your booking by clicking the button below.
          </p>

          <div style="margin: 32px 0;">
            <a href="${confirmUrl}"
              style="
                background: #2d4a3e;
                color: white;
                text-decoration: none;
                padding: 14px 24px;
                border-radius: 8px;
                display: inline-block;
                font-size: 14px;
                font-weight: 600;
              ">
              Confirm Booking
            </a>

            <a href="${cancelUrl}"
              style="
                background: #ffffff;
                color: #cc3333;
                text-decoration: none;
                padding: 14px 24px;
                border-radius: 8px;
                display: inline-block;
                font-size: 14px;
                font-weight: 600;
                border: 1.5px solid #cc3333;
                margin-top: 12px;
                margin-left: 16px;
              ">
              Cancel Booking
            </a>
          </div>

          <div style="background: #f7f7f5; padding: 16px; border-radius: 10px;">
            <p><strong>Arrival:</strong> ${arrival}</p>
            <p><strong>Departure:</strong> ${departure}</p>
          </div>

          <p style="margin-top: 32px; font-size: 13px; color: #777;">
            Both links expire in 30 minutes.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    const bookingId = Number(id);
    const nextStatus = String(status || "").toUpperCase();

    if (
      !bookingId ||
      !["PENDING", "CONFIRMED", "EXPIRED", "CANCELLED"].includes(nextStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid booking update" },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { blockedDate: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (nextStatus === "CONFIRMED" && booking.status !== "CONFIRMED") {
      const overlappingDate = await prisma.blockedDate.findFirst({
        where: {
          bookingId: { not: booking.id },
          NOT: [
            { endDate: { lte: booking.checkIn } },
            { startDate: { gte: booking.checkOut } },
          ],
        },
      });

      if (overlappingDate) {
        return NextResponse.json(
          { error: "This booking overlaps with blocked dates" },
          { status: 400 },
        );
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: nextStatus,
        confirmedAt:
          nextStatus === "CONFIRMED"
            ? booking.confirmedAt || new Date()
            : booking.confirmedAt,
        confirmationToken:
          nextStatus === "CONFIRMED" ? null : booking.confirmationToken,
        tokenExpiresAt:
          nextStatus === "CONFIRMED" ? null : booking.tokenExpiresAt,
      },
    });

    if (nextStatus === "CONFIRMED" && !booking.blockedDate) {
      await prisma.blockedDate.create({
        data: {
          startDate: booking.checkIn,
          endDate: booking.checkOut,
          reason: `Booking #${booking.id}`,
          booking: {
            connect: { id: booking.id },
          },
        },
      });
    }

    if (nextStatus === "CANCELLED" && booking.blockedDate) {
      await prisma.blockedDate.delete({
        where: { id: booking.blockedDate.id },
      });
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
