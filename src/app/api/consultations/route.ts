import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // TODO: Get actual user ID from auth session
    const userId = 'current-user-id'

    const consultations = await prisma.consultation.findMany({
      where: { userId },
      include: {
        expert: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json(
      { error: 'Error fetching consultations' },
      { status: 500 }
    )
  }
} 