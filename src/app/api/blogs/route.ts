// app/api/blogs/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { title, description, date } = body

    // Validate required fields
    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        date
      }
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Blog creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}