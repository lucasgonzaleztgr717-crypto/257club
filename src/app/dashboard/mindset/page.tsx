'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, CheckCircle2, Circle, BookOpen, Award, Calendar, ChevronRight } from 'lucide-react'

interface MindsetExercise {
  id: string
  type: string
  title: string
  description: string
  duration: number
  isCompleted: boolean
  completedAt?: Date
}

const mockExercises: MindsetExercise[] = [
  {
    id: '1',
    type: 'GRATITUD',
    title: 'Diario de Gratitud',
    description: 'Escribe 3 cosas por las que estás agradecido hoy',
    duration: 5,
    isCompleted: false
  },
  {
    id: '2',
    type: 'VISUALIZACIÓN',
    title: 'Visualización de Metas',
    description: 'Imagina tu versión futura exitosa por 5 minutos',
    duration: 5,
    isCompleted: true,
    completedAt: new Date()
  },
  {
    id: '3',
    type: 'AFIRMACIONES',
    title: 'Afirmaciones Matutinas',
    description: 'Lee y repite tus 3 afirmaciones principales',
    duration: 3,
    isCompleted: true,
    completedAt: new Date()
  },
  {
    id: '4',
    type: 'REFLEXIÓN',
    title: 'Reflexión de Progreso',
    description: '¿Qué hiciste bien esta semana? ¿Qué mejorar?',
    duration: 10,
    isCompleted: false
  },
  {
    id: '5',
    type: 'MINDFULNESS',
    title: 'Respiración Consciente',
    description: '5 minutos de respiración profunda y consciente',
    duration: 5,
    isCompleted: false
  },
]

const weeklyStats = {
  completed: 12,
  total: 21,
  streak: 5,
  totalTime: 95 // minutes
}

const resources = [
  {
    id: '1',
    title: 'El Poder de los Hábitos Atómicos',
    type: 'Libro',
    author: 'James Clear',
    readTime: '15 min'
  },
  {
    id: '2',
    title: 'Mindset de Crecimiento vs Fijo',
    type: 'Artículo',
    author: 'Carol Dweck',
    readTime: '10 min'
  },
  {
    id: '3',
    title: 'Visualización: Qué es y Cómo Practicarla',
    type: 'Video',
    author: 'Transformación Consciente',
    readTime: '8 min'
  },
]

export default function MindsetPage() {
  const [exercises, setExercises] = useState<MindsetExercise[]>(mockExercises)
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  const toggleExercise = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          isCompleted: !ex.isCompleted,
          completedAt: !ex.isCompleted ? new Date() : undefined
        }
      }
      return ex
    }))
  }

  const getExerciseTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'GRATITUD': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'VISUALIZACIÓN': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'AFIRMACIONES': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'REFLEXIÓN': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'MINDFULNESS': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    }
    return colors[type] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mindset</h1>
          <p className="text-muted-foreground">
            Ejercicios y recursos para desarrollar tu fortaleza mental
          </p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Ver Todos los Recursos
        </Button>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{weeklyStats.completed}/{weeklyStats.total}</div>
                <div className="text-xs text-muted-foreground">Ejercicios esta semana</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-green-600">{weeklyStats.streak}</div>
                <div className="text-xs text-muted-foreground">Días de racha</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{weeklyStats.totalTime} min</div>
                <div className="text-xs text-muted-foreground">Tiempo invertido</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((weeklyStats.completed / weeklyStats.total) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Completitud</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso semanal de Mindset</span>
              <span>{weeklyStats.completed} de {weeklyStats.total} completados</span>
            </div>
            <Progress value={(weeklyStats.completed / weeklyStats.total) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Exercises */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Ejercicios de Hoy</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedExercise === exercise.id ? 'ring-2 ring-primary' : ''
              } ${exercise.isCompleted ? 'opacity-75' : ''}`}
              onClick={() => setSelectedExercise(
                selectedExercise === exercise.id ? null : exercise.id
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={getExerciseTypeColor(exercise.type)}
                  >
                    {exercise.type}
                  </Badge>
                  {exercise.isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-lg">{exercise.title}</CardTitle>
                <CardDescription className="mt-2">
                  {exercise.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{exercise.duration} minutos</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExercise(exercise.id)
                    }}
                  >
                    {exercise.isCompleted ? 'Completado' : 'Marcar'}
                  </Button>
                </div>

                {selectedExercise === exercise.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="text-sm">
                      <strong>Instrucciones:</strong>
                      <p className="mt-2 text-muted-foreground">
                        {exercise.type === 'GRATITUD' &&
                          '1. Encuentra un momento tranquilo\n2. Escribe 3 cosas específicas\n3. Por cada cosa, explica por qué estás agradecido\n4. Reléelo al final'}
                        {exercise.type === 'VISUALIZACIÓN' &&
                          '1. Siéntate cómodamente\n2. Cierra los ojos\n3. Imagina tu versión exitosa\n4. Visualiza los detalles\n5. Mantén por 5 minutos'}
                        {exercise.type === 'AFIRMACIONES' &&
                          '1. Lee tu afirmación en voz alta\n2. Repítela 3 veces\n3. Siente la emoción\n4. Hazlo con todas las afirmaciones'}
                        {exercise.type === 'REFLEXIÓN' &&
                          '1. Revisa tu semana\n2. Identifica logros\n3. Identifica áreas de mejora\n4. Escribe una acción específica'}
                        {exercise.type === 'MINDFULNESS' &&
                          '1. Siéntate derecho\n2. Cierra los ojos\n3. Respira profundo\n4. Enfócate en el aliento\n5. Mantén 5 minutos'}
                      </p>
                    </div>
                    <Button className="w-full">
                      {exercise.isCompleted ? 'Repetir Ejercicio' : 'Comenzar Ejercicio'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Resources */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recursos Recomendados</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      por {resource.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {resource.readTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Tips para Mejorar tu Mindset</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm">
                <strong>Consistencia sobre intensidad:</strong> Es mejor hacer 5 minutos de mindfulness cada día que 30 minutos una vez a la semana.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm">
                <strong>Comienza pequeño:</strong> Si 5 minutos parece mucho, empieza con 2. Lo importante es crear el hábito.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm">
                <strong>Usa recordatorios:</strong> Establece recordatorios en tu celular para hacer tus ejercicios.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm">
                <strong>Combina con entrenamiento:</strong> Haz un ejercicio de mindset antes o después de cada entrenamiento.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm">
                <strong>Comparte en comunidad:</strong> Cuenta tu progreso con otros clientes, esto mantiene la motivación alta.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
