'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Apple, Clock, Utensils, Droplets, Plus, ChevronRight } from 'lucide-react'

// Mock nutrition data
const dailyGoals = {
  calories: { current: 1650, goal: 1850, unit: '' },
  protein: { current: 110, goal: 140, unit: 'g' },
  carbs: { current: 145, goal: 180, unit: 'g' },
  fats: { current: 48, goal: 65, unit: 'g' },
  water: { current: 1.8, goal: 2.5, unit: 'L' },
}

const meals = [
  {
    id: 1,
    type: 'BREAKFAST',
    name: 'Desayuno',
    time: '08:00',
    completed: false,
    items: [
      { name: 'Huevos revueltos (3)', calories: 210, protein: 18 },
      { name: 'Avena con frutas', calories: 300, protein: 8 },
      { name: 'Café con leche', calories: 80, protein: 4 },
    ],
    total: { calories: 590, protein: 30 },
  },
  {
    id: 2,
    type: 'MORNING_SNACK',
    name: 'Snack mañana',
    time: '10:30',
    completed: true,
    items: [
      { name: 'Yogur griego con nueces', calories: 220, protein: 18 },
    ],
    total: { calories: 220, protein: 18 },
  },
  {
    id: 3,
    type: 'LUNCH',
    name: 'Almuerzo',
    time: '13:00',
    completed: false,
    items: [
      { name: 'Pollo a la parrilla (200g)', calories: 330, protein: 62 },
      { name: 'Arroz integral (1 taza)', calories: 220, protein: 5 },
      { name: 'Verduras al vapor', calories: 80, protein: 3 },
      { name: 'Aceite de oliva (1 cdta)', calories: 40, protein: 0 },
    ],
    total: { calories: 670, protein: 70 },
  },
  {
    id: 4,
    type: 'AFTERNOON_SNACK',
    name: 'Merienda',
    time: '16:30',
    completed: false,
    items: [
      { name: 'Batido de proteína', calories: 180, protein: 25 },
      { name: 'Banana', calories: 105, protein: 1 },
    ],
    total: { calories: 285, protein: 26 },
  },
  {
    id: 5,
    type: 'DINNER',
    name: 'Cena',
    time: '20:00',
    completed: false,
    items: [
      { name: 'Salmón (150g)', calories: 350, protein: 34 },
      { name: 'Papa horneada', calories: 160, protein: 4 },
      { name: 'Ensalada mixta', calories: 60, protein: 2 },
    ],
    total: { calories: 570, protein: 40 },
  },
]

const getMealTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    BREAKFAST: 'Desayuno',
    MORNING_SNACK: 'Snack mañana',
    LUNCH: 'Almuerzo',
    AFTERNOON_SNACK: 'Merienda',
    DINNER: 'Cena',
    EVENING_SNACK: 'Snack noche',
    PRE_WORKOUT: 'Pre-entrenamiento',
    POST_WORKOUT: 'Post-entrenamiento',
  }
  return labels[type] || type
}

export default function NutritionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Nutrición</h1>
          <p className="text-muted-foreground">
            Tu plan nutricional personalizado
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Alimento
        </Button>
      </div>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos del Día</CardTitle>
          <CardDescription>Lunes 20 Enero, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {dailyGoals.calories.current}
              </div>
              <div className="text-xs text-muted-foreground">
                de {dailyGoals.calories.goal} kcal
              </div>
              <Progress
                value={(dailyGoals.calories.current / dailyGoals.calories.goal) * 100}
                className="mt-2 h-2"
              />
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {dailyGoals.protein.current}g
              </div>
              <div className="text-xs text-muted-foreground">
                de {dailyGoals.protein.goal}g proteína
              </div>
              <Progress
                value={(dailyGoals.protein.current / dailyGoals.protein.goal) * 100}
                className="mt-2 h-2"
              />
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {dailyGoals.carbs.current}g
              </div>
              <div className="text-xs text-muted-foreground">
                de {dailyGoals.carbs.goal}g carbohidratos
              </div>
              <Progress
                value={(dailyGoals.carbs.current / dailyGoals.carbs.goal) * 100}
                className="mt-2 h-2"
              />
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {dailyGoals.fats.current}g
              </div>
              <div className="text-xs text-muted-foreground">
                de {dailyGoals.fats.goal}g grasas
              </div>
              <Progress
                value={(dailyGoals.fats.current / dailyGoals.fats.goal) * 100}
                className="mt-2 h-2"
              />
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-cyan-600">
                {dailyGoals.water.current}L
              </div>
              <div className="text-xs text-muted-foreground">
                de {dailyGoals.water.goal}L agua
              </div>
              <Progress
                value={(dailyGoals.water.current / dailyGoals.water.goal) * 100}
                className="mt-2 h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comidas del Día</h2>

        {meals.map((meal) => (
          <Card key={meal.id} className={meal.completed ? 'opacity-75' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{meal.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {meal.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {meal.total.calories}
                  </div>
                  <div className="text-xs text-muted-foreground">kcal</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meal.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded"
                  >
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-blue-600">{item.protein}g pro</span>
                      <span className="text-muted-foreground">{item.calories} kcal</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Badge variant={meal.completed ? 'default' : 'outline'}>
                      {meal.completed ? 'Completado' : 'Pendiente'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Total: {meal.total.protein}g proteína
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    {meal.completed ? 'Ver' : <><Plus className="h-3 w-3 mr-1" /> Registrar</>}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hydration Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-cyan-600" />
            Hidratación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-cyan-600">1.8L / 2.5L</div>
              <div className="text-sm text-muted-foreground">Vasos de 250ml</div>
            </div>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full ${
                    i < 7 ? 'bg-cyan-500' : 'bg-muted'
                  }`}
                />
              ))}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i + 7}
                  className={`h-8 w-8 rounded-full ${
                    false ? 'bg-cyan-500' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Agregar vaso de agua (250ml)
          </Button>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Tips Nutricionales</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Apple className="h-4 w-4 text-primary mt-0.5" />
              <span>
                La proteína en cada comida ayuda a mantener la saciedad y preservar masa muscular.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Apple className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Los carbohidratos complejos (avena, arroz integral) te dan energía sostenible.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Apple className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Las grasas saludables (aguacate, nueces, aceite de oliva) son esenciales para hormonas.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Apple className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Bebe agua durante el día, no solo cuando tengas sed.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
