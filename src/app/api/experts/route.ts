import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const expertise = searchParams.get('expertise')
    const minRate = searchParams.get('minRate')
    const maxRate = searchParams.get('maxRate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter conditions
    const where: any = {}
    if (expertise) {
      where.expertise = {
        contains: expertise,
        mode: 'insensitive',
      }
    }
    if (minRate || maxRate) {
      where.hourlyRate = {}
      if (minRate) where.hourlyRate.gte = parseFloat(minRate)
      if (maxRate) where.hourlyRate.lte = parseFloat(maxRate)
    }

    // Get total count for pagination
    const total = await prisma.expert.count({ where })

    // Get experts with pagination
    const experts = await prisma.expert.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      experts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Experts listing error:', error)
    return NextResponse.json(
      { error: 'Error retrieving experts list' },
      { status: 500 }
    )
  }
} 