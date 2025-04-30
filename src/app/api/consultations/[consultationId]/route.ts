import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: { consultationId: string } }
) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.consultationId },
      include: {
        expert: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json(
      { error: 'Error fetching consultation details' },
      { status: 500 }
    )
  }
} 