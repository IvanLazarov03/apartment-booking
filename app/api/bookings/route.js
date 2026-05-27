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

    // Check overlapping CONFIRMED bookings only
    const existingBooking = await prisma.booking.findFirst({
      where: {
        status: "confirmed",

        NOT: [
          {
            checkOut: {
              lte: new Date(arrival),
            },
          },
          {
            checkIn: {
              gte: new Date(departure),
            },
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          error: "Selected dates are unavailable",
        },
        {
          status: 400,
        },
      );
    }

    // Generate confirmation token
    const token = crypto.randomBytes(32).toString("hex");

    //EXPIRATION (30 minutes)
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 30);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        guestEmail: email,
        guestName: name,

        checkIn: new Date(arrival),
        checkOut: new Date(departure),

        guestsCount: Number(adults) + Number(children),

        specialRequests: specialRequest,

        status: "pending",

        confirmationToken: token,
        tokenExpiresAt: tokenExpiresAt,
      },
    });

    // Confirmation URL
    const confirmUrl = `http://localhost:3000/api/bookings/confirm?token=${token}`;

    // Send confirmation email
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
          </div>

          <div style="background: #f7f7f5; padding: 16px; border-radius: 10px;">
            <p><strong>Arrival:</strong> ${arrival}</p>
            <p><strong>Departure:</strong> ${departure}</p>
          </div>

          <p style="margin-top: 32px; font-size: 13px; color: #777;">
            This link expires in 30 minutes.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
