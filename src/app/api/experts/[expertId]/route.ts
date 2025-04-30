import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: { expertId: string } }
) {
  try {
    const expert = await prisma.expert.findUnique({
      where: { id: params.expertId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!expert) {
      return NextResponse.json(
        { error: 'Expert not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(expert)
  } catch (error) {
    console.error('Error fetching expert:', error)
    return NextResponse.json(
      { error: 'Error fetching expert details' },
      { status: 500 }
    )
  }
} 