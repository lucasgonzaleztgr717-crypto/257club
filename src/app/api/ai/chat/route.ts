import { NextRequest, NextResponse } from 'next/server'
import {
  saveAIConversation,
  getLatestAIConversation
} from '@/lib/supabase-helpers'

// System prompt for the AI assistant
const SYSTEM_PROMPT = `Eres un asistente experto en entrenamiento, nutrición y mindset para un programa de transformación integral.

Tu rol es ayudar a los clientes con:
- Preguntas sobre entrenamientos y técnica de ejercicios
- Consultas sobre nutrición y alimentación
- Consejos de mindset y motivación
- Dudas sobre el programa en general

Directrices importantes:
1. Siempre prioriza la salud y la seguridad
2. Basa tus respuestas en evidencia científica
3. Para lesiones o problemas médicos, recomienda consultar a un profesional
4. Sé amigable, motivador y profesional
5. Cuando no tengas información específica, sugiere consultar con el coach
6. Adapta tus respuestas al nivel del usuario (principiante, intermedio, avanzado)

Enfoque del programa:
- Entrenamiento 3x por semana (fuerza + zona 2 + movilidad)
- Enfoque en salud sostenible, no en resultados extremos
- Nutrición balanceada sin restricciones innecesarias
- Trabajo de hábitos y mindset para cambios duraderos

Responde en español y sé conciso pero completo.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, userId } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Formato de mensajes inválido' },
        { status: 400 }
      )
    }

    // Prepare messages with system prompt
    const messagesWithSystem = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages
    ]

    // Get AI SDK from z-ai-web-dev-sdk
    const LLM = (await import('z-ai-web-dev-sdk')).LLM

    // Call AI to get response
    const aiResponse = await LLM({
      messages: messagesWithSystem
    })

    // Get response content
    const assistantMessage = aiResponse.message?.content || 'Lo siento, no pude generar una respuesta en este momento.'

    // Save conversation if userId is provided
    if (userId) {
      const updatedMessages = [
        ...messages,
        { role: 'assistant' as const, content: assistantMessage }
      ]
      await saveAIConversation(userId, updatedMessages)
    }

    return NextResponse.json({
      role: 'assistant',
      content: assistantMessage,
    })
  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
