import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId, expertId, date, duration, notes } = await req.json()

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

    // Check if expert exists and is available
    const expert = await prisma.expert.findUnique({
      where: { id: expertId },
    })

    if (!expert) {
      return NextResponse.json(
        { error: 'Expert not found' },
        { status: 404 }
      )
    }

    if (!expert.isAvailable) {
      return NextResponse.json(
        { error: 'Expert is not available at the moment' },
        { status: 400 }
      )
    }

    // Check for existing consultations at the same time
    const existingConsultation = await prisma.consultation.findFirst({
      where: {
        expertId,
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + duration * 60000), // Convert duration to milliseconds
        },
        status: {
          notIn: ['CANCELLED', 'COMPLETED'],
        },
      },
    })

    if (existingConsultation) {
      return NextResponse.json(
        { error: 'Expert has a consultation scheduled at this time' },
        { status: 400 }
      )
    }

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        userId,
        expertId,
        date: new Date(date),
        duration,
        notes,
      },
    })

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Consultation booking error:', error)
    return NextResponse.json(
      { error: 'Error booking consultation' },
      { status: 500 }
    )
  }
} 