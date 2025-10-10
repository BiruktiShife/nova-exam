// app/api/videos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { title, youtubeUrl, description } = body

    // Validate required fields
    if (!title || !youtubeUrl || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const video = await prisma.video.create({
      data: {
        title,
        youtubeUrl,
        description
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Video creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}