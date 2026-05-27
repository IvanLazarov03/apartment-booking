import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blockedDates = await prisma.blockedDate.findMany({
      include: {
        booking: {
          select: {
            id: true,
            guestName: true,
            status: true,
          },
        },
      },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(blockedDates);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { startDate, endDate, reason } = await req.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (start >= end) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 },
      );
    }

    const overlappingDate = await prisma.blockedDate.findFirst({
      where: {
        NOT: [
          { endDate: { lte: start } },
          { startDate: { gte: end } },
        ],
      },
    });

    if (overlappingDate) {
      return NextResponse.json(
        { error: "Selected dates overlap with an existing blocked period" },
        { status: 400 },
      );
    }

    const blockedDate = await prisma.blockedDate.create({
      data: {
        startDate: start,
        endDate: end,
        reason: reason?.trim() || "Manual block",
      },
    });

    return NextResponse.json(blockedDate, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ error: "Missing blocked date id" }, { status: 400 });
    }

    const blockedDate = await prisma.blockedDate.findUnique({
      where: { id },
    });

    if (!blockedDate) {
      return NextResponse.json({ error: "Blocked date not found" }, { status: 404 });
    }

    if (blockedDate.bookingId) {
      return NextResponse.json(
        { error: "Booking dates should be changed from the bookings page" },
        { status: 400 },
      );
    }

    await prisma.blockedDate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
