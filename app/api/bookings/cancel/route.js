import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { transporter } from "@/lib/mail";

export async function GET(req) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // 1. Find booking
    const booking = await prisma.booking.findUnique({
      where: { confirmationToken: token },
      include: { blockedDate: true },
    });

    // 2. Invalid token
    if (!booking) {
      return NextResponse.redirect(new URL("/booking-cancelled", req.url));
    }

    // 3. Already cancelled guard
    if (booking.status === "CANCELLED") {
      return NextResponse.redirect(new URL("/booking-cancelled", req.url));
    }

    // 4. Cancel allowed only until one week before check-in
    const now = new Date();
    const latestCancelDate = new Date(booking.checkIn);
    latestCancelDate.setDate(latestCancelDate.getDate() - 7);

    if (now > latestCancelDate) {
      return NextResponse.redirect(new URL("/booking-confirmed", req.url));
    }

    // 5. Cancel the booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "CANCELLED",
        confirmationToken: null,
        tokenExpiresAt: null,
      },
    });

    // 6. Remove blocked date if it exists
    if (booking.blockedDate) {
      await prisma.blockedDate.delete({
        where: { id: booking.blockedDate.id },
      });
    }

    // 7. Send cancellation confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.guestEmail,
      subject: "Your Booking Has Been Cancelled",
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
            Booking Cancelled
          </h1>

          <p style="font-size: 15px; color: #444;">
            Hello ${booking.guestName},
          </p>

          <p style="font-size: 15px; color: #444; line-height: 1.7;">
            Your booking has been successfully cancelled.
            If this was a mistake or you'd like to rebook, please visit our website.
          </p>

          <div style="background: #f7f7f5; padding: 16px; border-radius: 10px; margin-top: 24px;">
            <p><strong>Booking ID:</strong> #${booking.id}</p>
            <p><strong>Arrival:</strong> ${booking.checkIn.toDateString()}</p>
            <p><strong>Departure:</strong> ${booking.checkOut.toDateString()}</p>
          </div>

          <p style="margin-top: 32px; font-size: 13px; color: #777;">
            — The Habitat Team
          </p>
        </div>
      `,
    });

    // 8. Success
    return NextResponse.redirect(new URL("/booking-cancelled", req.url));
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
