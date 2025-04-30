import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(
  req: Request,
  { params }: { params: { consultationId: string } }
) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.consultationId },
    })

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    if (consultation.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Consultation is already cancelled' },
        { status: 400 }
      )
    }

    if (consultation.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot cancel a completed consultation' },
        { status: 400 }
      )
    }

    const updatedConsultation = await prisma.consultation.update({
      where: { id: params.consultationId },
      data: { status: 'CANCELLED' },
    })

    return NextResponse.json(updatedConsultation)
  } catch (error) {
    console.error('Error cancelling consultation:', error)
    return NextResponse.json(
      { error: 'Error cancelling consultation' },
      { status: 500 }
    )
  }
} 