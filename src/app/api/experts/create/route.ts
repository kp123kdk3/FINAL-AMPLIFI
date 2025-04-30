import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId, bio, expertise, hourlyRate } = await req.json()

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if expert profile already exists
    const existingExpert = await prisma.expert.findUnique({
      where: { userId },
    })

    if (existingExpert) {
      return NextResponse.json(
        { error: 'Expert profile already exists' },
        { status: 400 }
      )
    }

    // Create expert profile
    const expert = await prisma.expert.create({
      data: {
        userId,
        bio,
        expertise,
        hourlyRate,
      },
    })

    return NextResponse.json(expert)
  } catch (error) {
    console.error('Expert creation error:', error)
    return NextResponse.json(
      { error: 'Error creating expert profile' },
      { status: 500 }
    )
  }
} 