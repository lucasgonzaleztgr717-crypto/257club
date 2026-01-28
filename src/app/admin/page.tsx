'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, ClipboardList, Calendar, TrendingUp, Dumbbell, DollarSign, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <p className="text-muted-foreground">
            Bienvenido, Coach. Aquí está el resumen de tu negocio.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Última actualización: hace 5 min</Button>
          <Button>Generar Reporte</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +5 este mes
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Leads Nuevos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +8 esta semana
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Citas Agendadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              Próximos 7 días
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$8.5M</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +15% vs mes anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Planes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">START</span>
                <Badge variant="outline">8 clientes</Badge>
              </div>
              <div className="text-2xl font-bold">$1.2M</div>
              <div className="text-sm text-muted-foreground">Ingreso mensual</div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">PRO ⭐</span>
                <Badge>32 clientes</Badge>
              </div>
              <div className="text-2xl font-bold">$6.4M</div>
              <div className="text-sm text-muted-foreground">Ingreso mensual</div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">ELITE</span>
                <Badge variant="outline">7 clientes</Badge>
              </div>
              <div className="text-2xl font-bold">$2.8M</div>
              <div className="text-sm text-muted-foreground">Ingreso mensual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Tasks & Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Tareas Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Llamada de cierre pendiente</p>
                  <p className="text-sm text-muted-foreground">
                    María González - hace 24hs
                  </p>
                </div>
                <Badge variant="destructive">URGENTE</Badge>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Plan de entrenamiento vence</p>
                  <p className="text-sm text-muted-foreground">
                    Carlos Rodríguez - en 3 días
                  </p>
                </div>
                <Badge variant="secondary">Próximo</Badge>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">5 leads sin follow-up</p>
                  <p className="text-sm text-muted-foreground">
                    Último contacto hace más de 48hs
                  </p>
                </div>
                <Badge variant="outline">Atención</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Métricas de Éxito
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tasa de conversión leads → clientes</span>
                <span className="font-medium text-green-600">23%</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                +5% vs mes anterior
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tasa de retención mensual</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                +3% vs mes anterior
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completitud de entrenamientos</span>
                <span className="font-medium">84%</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                +2% vs mes anterior
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Churn rate (cancelaciones)</span>
                <span className="font-medium text-orange-600">8%</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowDownRight className="h-3 w-3 text-green-600" />
                -2% vs mes anterior (mejora)
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>NPS (Satisfacción cliente)</span>
                <span className="font-medium text-green-600">68</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                +8 vs mes anterior
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Users className="h-6 w-6" />
              <span className="text-sm">Ver Todos los Clientes</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Gestionar Leads</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Dumbbell className="h-6 w-6" />
              <span className="text-sm">Crear Entrenamiento</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Agendar Cita</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-foreground">Nuevo cliente:</strong>{' '}
                  Laura Martínez se inscribió al plan PRO
                </p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-foreground">Nuevo lead:</strong>{' '}
                  Juan Pérez completó el formulario web
                </p>
                <p className="text-xs text-muted-foreground">Hace 3 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Dumbbell className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-foreground">Entrenamiento completado:</strong>{' '}
                  Carlos R. completó Full Body A
                </p>
                <p className="text-xs text-muted-foreground">Hace 4 horas</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-foreground">Cita completada:</strong>{' '}
                  Check-in mensual con María G.
                </p>
                <p className="text-xs text-muted-foreground">Hace 5 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
