import { NextRequest, NextResponse } from 'next/server'
import {
  createLead,
  getLeadByEmail,
  getLeads
} from '@/lib/supabase-helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, goal, painPoints, commitment, source = 'WEBSITE' } = body

    // Validate required fields
    if (!name || !email || !phone || !goal) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Check if lead already exists by email
    const existingLead = await getLeadByEmail(email)

    if (existingLead) {
      return NextResponse.json(
        { error: 'Ya existe un lead con este email' },
        { status: 409 }
      )
    }

    // Prepare notes with timestamp
    const notes = JSON.stringify([{
      timestamp: new Date().toISOString(),
      message: 'Lead creado desde formulario web'
    }])

    // Calculate follow up time (24 hours from now)
    const followUpAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // Create lead
    const lead = await createLead({
      name,
      email,
      phone,
      source,
      status: 'NEW',
      goals: goal,
      pain_points: painPoints,
      commitment: commitment ? parseInt(commitment) : undefined,
      notes,
      follow_up_at: followUpAt
    })

    // TODO: Send email notification to coach
    // TODO: Add to email automation sequence
    // TODO: Send confirmation email to lead

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email
      },
      message: 'Lead creado correctamente'
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Error al crear el lead' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const leads = await getLeads({
      status: status || undefined,
      limit
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Error al obtener los leads' },
      { status: 500 }
    )
  }
}
