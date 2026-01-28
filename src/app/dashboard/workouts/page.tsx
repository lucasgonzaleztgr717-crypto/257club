'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dumbbell, Clock, CheckCircle2, Circle, Play, ChevronRight } from 'lucide-react'

// Mock workout data
const workouts = [
  {
    id: 1,
    day: 'Lunes',
    date: '20 Ene',
    title: 'Full Body A - Fuerza',
    type: 'Fuerza',
    duration: '45 min',
    exercises: 6,
    completed: false,
    exercisesList: [
      { name: 'Sentadilla con barra', sets: 3, reps: '8-10', rest: '90s' },
      { name: 'Press de banca plano', sets: 3, reps: '8-10', rest: '90s' },
      { name: 'Remo con barra', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Prensa de piernas', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Press militar', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Plancha abdominal', sets: 3, reps: '45s', rest: '45s' },
    ]
  },
  {
    id: 2,
    day: 'Miércoles',
    date: '22 Ene',
    title: 'Full Body B - Hipertrofia',
    type: 'Hipertrofia',
    duration: '50 min',
    exercises: 7,
    completed: false,
    exercisesList: [
      { name: 'Peso muerto rumano', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Press inclinado con mancuernas', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Dominadas', sets: 3, reps: '8-10', rest: '90s' },
      { name: 'Zancadas alternas', sets: 3, reps: '12 c/pie', rest: '60s' },
      { name: 'Elevaciones laterales', sets: 3, reps: '15', rest: '45s' },
      { name: 'Curl de bíceps', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Russian twist', sets: 3, reps: '20', rest: '45s' },
    ]
  },
  {
    id: 3,
    day: 'Viernes',
    date: '24 Ene',
    title: 'Zona 2 + Movilidad',
    type: 'Cardio',
    duration: '40 min',
    exercises: 5,
    completed: false,
    exercisesList: [
      { name: 'Caminata/Zona 2', sets: 1, reps: '30 min', rest: '-' },
      { name: 'Estiramiento cuádriceps', sets: 2, reps: '30s', rest: '15s' },
      { name: 'Estiramiento isquiotibiales', sets: 2, reps: '30s', rest: '15s' },
      { name: 'Apertura de hombros', sets: 2, reps: '30s', rest: '15s' },
      { name: 'Gato-vaca', sets: 2, reps: '10 reps', rest: '15s' },
    ]
  },
]

export default function WorkoutsPage() {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Entrenamientos</h1>
          <p className="text-muted-foreground">
            Tu plan de entrenamiento personalizado - Semana 7
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            3 entrenamientos por semana
          </Badge>
          <Badge variant="outline" className="text-sm">
            Nivel: Medio
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0/3</div>
              <p className="text-sm text-muted-foreground">Completados esta semana</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">38</div>
              <p className="text-sm text-muted-foreground">Total completados</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-sm text-muted-foreground">Días de racha</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2h 15m</div>
              <p className="text-sm text-muted-foreground">Tiempo total</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progreso semanal</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Workout Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Card
            key={workout.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedWorkout === workout.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedWorkout(workout.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {workout.day} • {workout.date}
                  </div>
                  <CardTitle className="text-xl">{workout.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {workout.type} • {workout.exercises} ejercicios
                  </CardDescription>
                </div>
                {workout.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                {workout.duration}
              </div>

              {selectedWorkout === workout.id ? (
                <div className="space-y-3">
                  {workout.exercisesList.map((exercise, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-muted/50 rounded-lg text-sm"
                    >
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-muted-foreground mt-1">
                        {exercise.sets} series × {exercise.reps}
                        {exercise.rest !== '-' && ` • ${exercise.rest} descanso`}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Comenzar Entrenamiento
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Ver Ejercicios
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Tips de Esta Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                En el trabajo de fuerza, enfócate en la técnica sobre el peso. Un rep bien ejecutado vale más que 5 mal hechos.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                El trabajo de zona 2 (cardio moderado) mejora tu base aeróbica y ayuda en la recuperación.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Descansa 48-72h entre sesiones del mismo grupo muscular para permitir la recuperación.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Hidrátate bien antes, durante y después del entrenamiento.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
