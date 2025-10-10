// app/api/data/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [examTypes, timeSlots, features] = await Promise.all([
      prisma.examType.findMany(),
      prisma.timeSlot.findMany(),
      prisma.feature.findMany()
    ])

    return NextResponse.json({
      examTypes,
      timeSlots,
      features
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}