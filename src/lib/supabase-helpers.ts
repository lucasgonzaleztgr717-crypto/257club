import { supabase } from './supabase'

// ============================================
// LEADS / PROSPECTOS
// ============================================

export type Lead = {
  id?: string
  user_id?: string
  name: string
  email: string
  phone?: string
  source?: string
  status?: string
  goals?: string
  budget?: string
  timeline?: string
  pain_points?: string
  previous_attempts?: string
  commitment?: number
  notes?: string
  last_contacted_at?: string
  follow_up_at?: string
  created_at?: string
  updated_at?: string
}

/**
 * Crea un nuevo lead
 */
export async function createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('leads')
    .insert({
      ...lead,
      created_at: now,
      updated_at: now,
      source: lead.source || 'WEBSITE',
      status: lead.status || 'NEW',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    throw error
  }

  return data
}

/**
 * Obtiene todos los leads con filtros opcionales
 */
export async function getLeads(filters?: {
  status?: string
  source?: string
  limit?: number
  offset?: number
}) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.source) {
    query = query.eq('source', filters.source)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching leads:', error)
    throw error
  }

  return data
}

/**
 * Obtiene un lead por email
 */
export async function getLeadByEmail(email: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching lead by email:', error)
    throw error
  }

  return data
}

/**
 * Actualiza el estado de un lead
 */
export async function updateLeadStatus(id: string, status: string, notes?: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (notes) {
    updates.notes = notes
  }

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating lead status:', error)
    throw error
  }

  return data
}

/**
 * Agrega notas a un lead
 */
export async function addLeadNote(id: string, note: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data: existing } = await supabase
    .from('leads')
    .select('notes')
    .eq('id', id)
    .single()

  if (!existing) {
    throw new Error('Lead not found')
  }

  const newNote = {
    note,
    timestamp: new Date().toISOString(),
  }

  const notes = existing.notes
    ? JSON.stringify([...JSON.parse(existing.notes), newNote])
    : JSON.stringify([newNote])

  const { data, error } = await supabase
    .from('leads')
    .update({
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error adding lead note:', error)
    throw error
  }

  return data
}

// ============================================
// USERS / USUARIOS
// ============================================

export type User = {
  id?: string
  email: string
  name?: string
  password?: string
  phone?: string
  role?: string
  created_at?: string
  updated_at?: string
}

/**
 * Crea un nuevo usuario
 */
export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('users')
    .insert({
      ...user,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    throw error
  }

  return data
}

/**
 * Obtiene un usuario por email
 */
export async function getUserByEmail(email: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user by email:', error)
    throw error
  }

  return data
}

// ============================================
// CLIENTS / CLIENTES
// ============================================

export type Client = {
  id?: string
  user_id: string
  date_of_birth?: string
  gender?: string
  height?: number
  weight?: number
  body_fat?: number
  activity_level?: string
  primary_goal?: string
  secondary_goals?: string
  goal_description?: string
  injuries?: string
  limitations?: string
  equipment?: string
  preferred_days?: string
  preferred_time?: string
  workout_frequency?: number
  workout_duration?: number
  status?: string
  start_date?: string
  end_date?: string
  coach_notes?: string
  mindset_notes?: string
  nutrition_notes?: string
  created_at?: string
  updated_at?: string
}

/**
 * Crea un nuevo cliente
 */
export async function createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('clients')
    .insert({
      ...client,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating client:', error)
    throw error
  }

  return data
}

/**
 * Obtiene un cliente por user_id
 */
export async function getClientByUserId(userId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching client by user_id:', error)
    throw error
  }

  return data
}

// ============================================
// MEASUREMENTS / MEDICIONES
// ============================================

export type Measurement = {
  id?: string
  client_id: string
  date?: string
  weight?: number
  body_fat?: number
  muscle_mass?: number
  water_mass?: number
  chest?: number
  waist?: number
  hips?: number
  biceps_left?: number
  biceps_right?: number
  thighs_left?: number
  thighs_right?: number
  calves_left?: number
  calves_right?: number
  resting_heart_rate?: number
  blood_pressure_systolic?: number
  blood_pressure_diastolic?: number
  notes?: string
  created_at?: string
}

/**
 * Crea una nueva medición
 */
export async function createMeasurement(measurement: Omit<Measurement, 'id' | 'created_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('measurements')
    .insert({
      ...measurement,
      date: measurement.date || new Date().toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating measurement:', error)
    throw error
  }

  return data
}

/**
 * Obtiene todas las mediciones de un cliente
 */
export async function getMeasurementsByClientId(clientId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('measurements')
    .select('*')
    .eq('client_id', clientId)
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching measurements:', error)
    throw error
  }

  return data
}

/**
 * Obtiene la última medición de un cliente
 */
export async function getLatestMeasurement(clientId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('measurements')
    .select('*')
    .eq('client_id', clientId)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching latest measurement:', error)
    throw error
  }

  return data
}

// ============================================
// APPOINTMENTS / CITAS
// ============================================

export type Appointment = {
  id?: string
  user_id: string
  client_id?: string
  coach_id?: string
  nutritionist_id?: string
  mindset_coach_id?: string
  lead_id?: string
  type?: string
  status?: string
  title: string
  description?: string
  start_time: string
  end_time: string
  meeting_url?: string
  meeting_id?: string
  meeting_password?: string
  notes?: string
  follow_up_actions?: string
  created_at?: string
  updated_at?: string
}

/**
 * Crea una nueva cita
 */
export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      ...appointment,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating appointment:', error)
    throw error
  }

  return data
}

/**
 * Obtiene todas las citas de un usuario
 */
export async function getAppointmentsByUserId(userId: string, filters?: {
  status?: string
  upcoming?: boolean
}) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  let query = supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('start_time', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.upcoming) {
    query = query.gte('start_time', new Date().toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }

  return data
}

/**
 * Actualiza el estado de una cita
 */
export async function updateAppointmentStatus(id: string, status: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('appointments')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating appointment status:', error)
    throw error
  }

  return data
}

// ============================================
// AI CONVERSATIONS / CHAT IA
// ============================================

export type AIConversation = {
  id?: string
  user_id: string
  messages?: string
  created_at?: string
  updated_at?: string
}

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

/**
 * Crea o actualiza una conversación de IA
 */
export async function saveAIConversation(userId: string, messages: ChatMessage[]) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const now = new Date().toISOString()

  // First check if conversation exists
  const { data: existing } = await supabase
    .from('ai_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from('ai_conversations')
      .update({
        messages: JSON.stringify(messages),
        updated_at: now,
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating AI conversation:', error)
      throw error
    }

    return data
  } else {
    // Create new
    const { data, error } = await supabase
      .from('ai_conversations')
      .insert({
        user_id: userId,
        messages: JSON.stringify(messages),
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating AI conversation:', error)
      throw error
    }

    return data
  }
}

/**
 * Obtiene la última conversación de IA de un usuario
 */
export async function getLatestAIConversation(userId: string) {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('ai_conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching AI conversation:', error)
    throw error
  }

  return data
}
