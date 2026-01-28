'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Video, CheckCircle2, XCircle, Plus, ChevronRight } from 'lucide-react'

interface Appointment {
  id: string
  title: string
  type: string
  date: Date
  duration: number
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  meetingUrl?: string
  with: string
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Check-in Mensual',
    type: 'CHECK_IN',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 45,
    status: 'CONFIRMED',
    meetingUrl: 'https://meet.google.com/xxx',
    with: 'Lucas Gonzalez - Coach'
  },
  {
    id: '2',
    title: 'Coaching de Mindset',
    type: 'MINDSET',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    duration: 30,
    status: 'SCHEDULED',
    with: 'Lucas Gonzalez - Coach'
  },
  {
    id: '3',
    title: 'Revisión de Nutrición',
    type: 'NUTRITION',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    duration: 30,
    status: 'COMPLETED',
    with: 'Nutricionista'
  },
  {
    id: '4',
    title: 'Check-in Mensual',
    type: 'CHECK_IN',
    date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000), // 24 days ago
    duration: 45,
    status: 'COMPLETED',
    with: 'Lucas Gonzalez - Coach'
  },
]

const typeLabels: Record<string, string> = {
  'CHECK_IN': 'Check-in',
  'COACHING': 'Coaching',
  'NUTRITION': 'Nutrición',
  'MINDSET': 'Mindset',
  'ONBOARDING': 'Onboarding',
  'FOLLOW_UP': 'Follow-up'
}

const statusColors: Record<string, string> = {
  'SCHEDULED': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  'CONFIRMED': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'COMPLETED': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'CANCELLED': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
}

const statusLabels: Record<string, string> = {
  'SCHEDULED': 'Pendiente',
  'CONFIRMED': 'Confirmada',
  'COMPLETED': 'Completada',
  'CANCELLED': 'Cancelada'
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'PAST'>('ALL')

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date()
    if (filter === 'UPCOMING') return apt.date > now
    if (filter === 'PAST') return apt.date < now
    return true
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Citas</h1>
          <p className="text-muted-foreground">
            Gestiona tus sesiones de coaching y check-ins
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agendar Nueva Cita
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground">Próximas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-xs text-muted-foreground">Completadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">11h 30m</div>
                <div className="text-xs text-muted-foreground">Tiempo total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Video className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground">Asistencia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['ALL', 'UPCOMING', 'PAST'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === 'ALL' ? 'Todas' : f === 'UPCOMING' ? 'Próximas' : 'Pasadas'}
          </Button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No hay citas</p>
              <p className="text-sm text-muted-foreground">
                {filter === 'UPCOMING' ? 'No tienes citas próximas agendadas.' :
                 filter === 'PAST' ? 'No tienes citas pasadas registradas.' :
                 'No hay citas registradas.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className={`hover:shadow-lg transition-shadow ${
                appointment.status === 'CANCELLED' ? 'opacity-60' : ''
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{appointment.title}</h3>
                        <Badge
                          variant="secondary"
                          className={statusColors[appointment.status]}
                        >
                          {statusLabels[appointment.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        con {appointment.with}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {appointment.status === 'CONFIRMED' && appointment.meetingUrl && (
                      <Button size="sm" onClick={() => window.open(appointment.meetingUrl, '_blank')}>
                        <Video className="h-4 w-4 mr-2" />
                        Unirse
                      </Button>
                    )}

                    {appointment.status === 'SCHEDULED' && (
                      <Button size="sm" variant="outline">
                        Confirmar
                      </Button>
                    )}

                    {(appointment.status === 'SCHEDULED' || appointment.status === 'CONFIRMED') && (
                      <Button size="sm" variant="ghost">
                        Reagendar
                      </Button>
                    )}

                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Tips para tus Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                <strong>Llega 5 minutos antes:</strong> Prepárate con tiempo para aprovechar al máximo la sesión.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                <strong>Ten tus métricas listas:</strong> Peso, medidas y fotos de progreso recientes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                <strong>Prepara tus preguntas:</strong> Escribe las dudas que quieras resolver.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                <strong>Revisa tu progreso:</strong> Antes de la cita, mira tu app y tus últimos resultados.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                <strong>Cancela con tiempo:</strong> Si no puedes asistir, avisa con 24hs de antelación.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
