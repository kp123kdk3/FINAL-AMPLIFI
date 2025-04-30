import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // Create contact submission
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Error submitting contact form' },
      { status: 500 }
    )
  }
} 