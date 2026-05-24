import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";

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

    // Check overlapping bookings
    const existingBooking = await prisma.booking.findFirst({
      where: {
        status: {
          not: "cancelled",
        },

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
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Booking Request Received",

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h1>Booking Request Received</h1>

          <p>Hello ${name},</p>

          <p>
            Thank you for your booking request.
          </p>

          <p>
            <strong>Arrival:</strong> ${arrival}
          </p>

          <p>
            <strong>Departure:</strong> ${departure}
          </p>

          <p>
            We will confirm your reservation shortly.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
