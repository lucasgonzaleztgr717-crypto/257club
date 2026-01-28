'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Calendar, Camera, Plus, ChevronRight } from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

// Mock data for charts
const weightData = [
  { month: 'Ago', weight: 82.5 },
  { month: 'Sep', weight: 81.2 },
  { month: 'Oct', weight: 79.8 },
  { month: 'Nov', weight: 78.5 },
  { month: 'Dic', weight: 77.3 },
  { month: 'Ene', weight: 76.0 },
]

const measurementsData = [
  { date: 'Ago', chest: 102, waist: 92, hips: 98 },
  { date: 'Sep', chest: 101.5, waist: 90, hips: 97.5 },
  { date: 'Oct', chest: 101, waist: 88, hips: 97 },
  { date: 'Nov', chest: 100.5, waist: 86.5, hips: 96.5 },
  { date: 'Dic', chest: 100, waist: 85, hips: 96 },
  { date: 'Ene', chest: 99.5, waist: 84, hips: 95.5 },
]

const workoutData = [
  { week: '1', completed: 2, planned: 3 },
  { week: '2', completed: 3, planned: 3 },
  { week: '3', completed: 3, planned: 3 },
  { week: '4', completed: 2, planned: 3 },
  { week: '5', completed: 3, planned: 3 },
  { week: '6', completed: 3, planned: 3 },
]

const currentMeasurements = {
  weight: { value: 76.0, change: -1.3, unit: 'kg' },
  bodyFat: { value: 18.5, change: -0.8, unit: '%' },
  chest: { value: 99.5, change: -0.5, unit: 'cm' },
  waist: { value: 84, change: -1.0, unit: 'cm' },
  hips: { value: 95.5, change: -0.5, unit: 'cm' },
  biceps: { value: 35, change: +0.5, unit: 'cm' },
  thighs: { value: 56, change: -0.5, unit: 'cm' },
}

const progressPhotos = [
  { id: 1, date: '20 Ago 2024', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
  { id: 2, date: '20 Sep 2024', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
  { id: 3, date: '20 Oct 2024', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
  { id: 4, date: '20 Nov 2024', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
  { id: 5, date: '20 Dic 2024', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
  { id: 6, date: '20 Ene 2025', front: '/placeholder-front.jpg', side: '/placeholder-side.jpg', back: '/placeholder-back.jpg' },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Progreso</h1>
          <p className="text-muted-foreground">
            Seguimiento de tu transformación
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Subir Fotos
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Medidas
          </Button>
        </div>
      </div>

      {/* Current Measurements */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Actuales</CardTitle>
          <CardDescription>Última medición: 20 Enero 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(currentMeasurements).map(([key, metric]) => (
              <div key={key} className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-xs text-muted-foreground mt-1 capitalize">
                  {key === 'bodyFat' ? '% Grasa' : key === 'chest' ? 'Pecho' :
                   key === 'waist' ? 'Cintura' : key === 'hips' ? 'Cadera' :
                   key === 'biceps' ? 'Bíceps' : key === 'thighs' ? 'Muslos' : 'Peso'}
                </div>
                <div
                  className={`text-xs mt-1 flex items-center justify-center gap-1 ${
                    metric.change < 0 ? 'text-green-600' : 'text-blue-600'
                  }`}
                >
                  {metric.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {Math.abs(metric.change)}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Peso</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">-6.5 kg</div>
              <div className="text-sm text-muted-foreground">Pérdida total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">76.0 kg</div>
              <div className="text-sm text-muted-foreground">Peso actual</div>
            </div>
            <div>
              <div className="text-2xl font-bold">71.0 kg</div>
              <div className="text-sm text-muted-foreground">Objetivo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurements Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Circunferencias</CardTitle>
          <CardDescription>Pecho, cintura y cadera (cm)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={measurementsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[80, 105]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="chest"
                stroke="#ef4444"
                strokeWidth={2}
                name="Pecho"
              />
              <Line
                type="monotone"
                dataKey="waist"
                stroke="#22c55e"
                strokeWidth={2}
                name="Cintura"
              />
              <Line
                type="monotone"
                dataKey="hips"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Cadera"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Workout Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Completitud de Entrenamientos</CardTitle>
          <CardDescription>Últimas 6 semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completados" />
              <Bar dataKey="planned" fill="hsl(var(--muted))" name="Planificados" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">38/45</div>
              <div className="text-sm text-muted-foreground">Total completados</div>
            </div>
            <div>
              <div className="text-2xl font-bold">84%</div>
              <div className="text-sm text-muted-foreground">Tasa de completitud</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Días de racha</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Photos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fotos de Progreso</CardTitle>
              <CardDescription>Registro visual de tu transformación</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Foto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {progressPhotos.map((photo) => (
              <Card key={photo.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-3">
                  <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-xs font-medium">{photo.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Before/After */}
      <Card>
        <CardHeader>
          <CardTitle>Antes vs Después</CardTitle>
          <CardDescription>Comparativa de inicio vs actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Agosto 2024 - Inicio</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Frontal • Lateral • Posterior
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Enero 2025 - Actual</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Frontal • Lateral • Posterior
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <TrendingDown className="h-5 w-5" />
              <span className="font-semibold">¡Excelente progreso!</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              Has perdido 6.5kg, reducido tu cintura 8cm y mantenido una tasa de completitud del 84% en tus entrenamientos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
