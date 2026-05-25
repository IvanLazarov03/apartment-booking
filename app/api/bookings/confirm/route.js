import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: {
        confirmationToken: token,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: "confirmed",
        confirmedAt: new Date(),
        confirmationToken: null,
      },
    });

    return Response.redirect("http://localhost:3000/booking-confirmed");
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
