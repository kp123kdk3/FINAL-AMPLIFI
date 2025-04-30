import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { title, description, userId } = await req.json()

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

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json(
      { error: 'Error creating project' },
      { status: 500 }
    )
  }
} 