import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // 1. Find booking
    const booking = await prisma.booking.findUnique({
      where: {
        confirmationToken: token,
      },
    });

    // 2. Invalid token
    if (!booking) {
      return NextResponse.redirect(new URL("/booking-expired", req.url));
    }

    // 3. Expired token check
    if (!booking.tokenExpiresAt || booking.tokenExpiresAt < new Date()) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "EXPIRED",
          confirmationToken: null,
          tokenExpiresAt: null,
        },
      });

      return NextResponse.redirect(new URL("/booking-expired", req.url));
    }

    // already processed guard
    if (booking.status !== "PENDING") {
      return NextResponse.redirect(new URL("/booking-confirmed", req.url));
    }

    // 4. Already confirmed
    if (booking.status === "CONFIRMED") {
      return NextResponse.redirect(new URL("/booking-confirmed", req.url));
    }

    // 5. Confirm booking (IMPORTANT FIX HERE)
    const updatedBooking = await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
        confirmationToken: null,
        tokenExpiresAt: null,
      },
    });

    // 6. Create blocked date
    await prisma.blockedDate.create({
      data: {
        startDate: updatedBooking.checkIn,
        endDate: updatedBooking.checkOut,
        reason: `Booking #${updatedBooking.id}`,
        booking: {
          connect: {
            id: updatedBooking.id,
          },
        },
      },
    });

    // 7. Success
    return NextResponse.redirect(new URL("/booking-confirmed", req.url));
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
