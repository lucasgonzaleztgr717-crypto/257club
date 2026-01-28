'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dumbbell, Apple, TrendingUp, Brain, MessageSquare, Calendar, ChevronRight, Award, Target, Clock } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">¡Hola, Usuario! 👋</h1>
        <p className="text-lg opacity-90 mb-4">
          Bienvenido/a de nuevo. Aquí está tu resumen de progreso.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Badge className="bg-white/20 text-white border-0">
            <Target className="h-3 w-3 mr-1" />
            Plan PRO
          </Badge>
          <Badge className="bg-white/20 text-white border-0">
            <Clock className="h-3 w-3 mr-1" />
            Día 45 de 180
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entrenamientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38/45</div>
            <p className="text-xs text-muted-foreground mt-1">Completados</p>
            <Progress value={84} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">-5.2 kg</div>
            <p className="text-xs text-muted-foreground mt-1">Este mes</p>
            <div className="text-xs text-green-600 mt-2">En progreso</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cintura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">-4 cm</div>
            <p className="text-xs text-muted-foreground mt-1">Este mes</p>
            <div className="text-xs text-green-600 mt-2">En progreso</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Racha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 días</div>
            <p className="text-xs text-muted-foreground mt-1">Consecutivos</p>
            <Award className="h-4 w-4 text-yellow-500 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Today's Tasks */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Entrenamiento de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                Lu
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Full Body A - Fuerza</h3>
                <p className="text-sm text-muted-foreground">
                  45 min • 6 ejercicios
                </p>
                <div className="mt-2">
                  <Badge variant="outline">Fuerza</Badge>
                  <Badge variant="outline" className="ml-2">Nivel Medio</Badge>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            <Button className="w-full" size="lg">
              Comenzar Entrenamiento
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Próximo entrenamiento: <strong className="text-foreground">Miércoles</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Nutrición del Día
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Cal</div>
                <div className="font-bold">1,850</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Pro</div>
                <div className="font-bold text-blue-600">140g</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Carb</div>
                <div className="font-bold text-green-600">180g</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Gra</div>
                <div className="font-bold text-yellow-600">65g</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Proteína</span>
                <span>110g / 140g</span>
              </div>
              <Progress value={79} className="h-2" />

              <div className="flex justify-between text-sm">
                <span>Carbohidratos</span>
                <span>145g / 180g</span>
              </div>
              <Progress value={81} className="h-2" />

              <div className="flex justify-between text-sm">
                <span>Grasas</span>
                <span>48g / 65g</span>
              </div>
              <Progress value={74} className="h-2" />
            </div>

            <Button variant="outline" className="w-full">
              Ver Plan Nutricional Completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments & Community */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximas Citas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">ENE</div>
                <div className="text-2xl font-bold">25</div>
                <div className="text-xs text-muted-foreground">10:00</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Check-in Mensual</h3>
                <p className="text-sm text-muted-foreground">
                  Revisión de progreso con coach
                </p>
                <Badge className="mt-1" variant="secondary">Confirmado</Badge>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">FEB</div>
                <div className="text-2xl font-bold">08</div>
                <div className="text-xs text-muted-foreground">11:30</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Coaching de Mindset</h3>
                <p className="text-sm text-muted-foreground">
                  Sesión de hábitos y motivación
                </p>
                <Badge className="mt-1" variant="outline">Pendiente</Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Ver Todas las Citas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Comunidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  MG
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Maria G.</strong> compartió su progreso: "¡Perdí 3kg este mes! 🎉"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hace 2 horas • 12 likes
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  CR
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Carlos R.</strong> pregunta: "¿Alguien ha probado los suplementos recomendados?"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hace 4 horas • 5 comentarios
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  LM
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>Laura M.</strong> compartió: "Nueva receta de prep que es increíble 💚"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ayer • 23 likes
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Ver Comunidad Completa
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Ejercicio Mindset</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Registrar Medidas</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Chat con IA</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Agendar Cita</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
