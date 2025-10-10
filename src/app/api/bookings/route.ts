// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { examTypeId, timeSlotId, date, name, email, phone, notes } = body

    // Validate required fields
    if (!examTypeId || !timeSlotId || !date || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        examTypeId,
        timeSlotId,
        date: new Date(date),
        name,
        email,
        phone,
        notes
      },
      include: {
        examType: true,
        timeSlot: true
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
// Add this to app/api/bookings/route.ts
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        examType: true,
        timeSlot: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}