'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Apple, Brain, TrendingUp, Users, Clock, CheckCircle2, Star, ChevronRight, Mail, Phone, Instagram, AlertCircle } from 'lucide-react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    painPoints: '',
    commitment: '5'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Submit lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'WEBSITE',
          status: 'NEW'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else {
        setErrorMessage(data.error || 'Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      setErrorMessage('Error de conexión. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">Transformación Consciente</span>
              <span className="text-xs text-muted-foreground">by: Lucas Gonzalez</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#planes" className="text-sm font-medium hover:text-primary transition-colors">
              Planes
            </a>
            <a href="#resultados" className="text-sm font-medium hover:text-primary transition-colors">
              Resultados
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
              Cómo Funciona
            </a>
            <Button onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🎯 Coaching Fitness 100% Personalizado
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Transformación Consciente:<br />
            Cuerpo, Nutrición y Mente
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deja de probar planes genéricos que no funcionan. Obtén un programa totalmente
            personalizado con entrenador, nutricionista y coach mindset. Resultados reales,
            sostenibles y basados en ciencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Obten tu Plan Gratis <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conoce Cómo Funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Clientes Transformados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">3x/sem</div>
              <div className="text-sm text-muted-foreground">Frecuencia Ideal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Soporte IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              ¿Te Suena Familiar?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Planes que No Funcionan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Has probado dietas y entrenamientos genéricos de internet pero los resultados
                    no llegan o no se sostienen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sin Tiempo o Energía</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tienes un trabajo ocupado y responsabilidades, no puedes dedicar horas al día
                    en el gimnasio.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Falta de Consistencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Empiezas motivado pero luego te desconectas. Necesitas guía, apoyo y
                    herramientas para mantener la disciplina.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">Nuestra Propuesta Única</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Un Enfoque 100% Integral
            </h2>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
              No somos solo entrenamiento. Somos un equipo interdisciplinario que aborda
              todos los aspectos de tu transformación: físico, nutricional y mental.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Entrenamiento</CardTitle>
                  <CardDescription>Adaptativo y Sostenible</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Plan 100% personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      3 sesiones por semana
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Fuerza + Zona 2 + Movilidad
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Basado en evidencia científica
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      App con videos y demostraciones
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Apple className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Nutrición</CardTitle>
                  <CardDescription>Sin Dietas Extremas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Plan alimentario personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Nutricionista del equipo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Recetas prácticas y deliciosas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Ajustes según progreso
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Sin restricciones innecesarias
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle>Mindset</CardTitle>
                  <CardDescription>Cambios Duraderos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Coach mindset especializado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Ejercicios de hábitos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Trabajo de motivación
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Comunidad de apoyo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      IA 24/7 para dudas rápidas
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cómo Funciona Tu Transformación
            </h2>
            <p className="text-xl text-muted-foreground mb-16">
              Un proceso simple pero poderoso para lograr tus objetivos
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Llamada Gratuita</h3>
                <p className="text-sm text-muted-foreground">
                  Agendamos una llamada de 30 min para entender tus objetivos y diseñar tu plan
                </p>
              </div>

              <div className="relative">
                <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Plan Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Creamos tu programa integral: entrenamiento, nutrición y mindset a tu medida
                </p>
              </div>

              <div className="relative">
                <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Ejecución con App</h3>
                <p className="text-sm text-muted-foreground">
                  Tu programa en una app profesional con seguimiento de progreso y soporte 24/7
                </p>
              </div>

              <div className="relative">
                <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Resultados Reales</h3>
                <p className="text-sm text-muted-foreground">
                  Check-ins semanales, ajustes y soporte continuo para garantizar tu éxito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results / Testimonials */}
      <section id="resultados" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Resultados Reales de Personas Reales
            </h2>
            <p className="text-xl text-muted-foreground mb-16">
              Mira lo que nuestros clientes han logrado
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "Perdí 12kg en 3 meses mientras mantenía mi trabajo de 10hs. El enfoque de
                    3x por semana es perfecto. Nunca me sentí privado o hambriento."
                  </p>
                  <div className="font-semibold">María G.</div>
                  <div className="text-xs text-muted-foreground">Plan PRO</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "Aumenté mi fuerza un 40% y mejoré mi postura. Lo mejor es el trabajo de mindset,
                    ahora tengo hábitos que mantendré para siempre."
                  </p>
                  <div className="font-semibold">Carlos R.</div>
                  <div className="text-xs text-muted-foreground">Plan ELITE</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">
                    "Después de 3 años de intentar todo, por fin encontré algo que funciona.
                    La nutricionista es increíble y el soporte de IA es un game changer."
                  </p>
                  <div className="font-semibold">Laura M.</div>
                  <div className="text-xs text-muted-foreground">Plan PRO</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="planes" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu Plan de Transformación
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Un único plan integral con descuentos por compromiso
            </p>
            <p className="text-sm text-muted-foreground mb-16">
              Inversión mensual: <strong>$150.000 ARS</strong> • Mayor compromiso = Mayor ahorro
            </p>

            <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
              {/* 3 Meses Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="mb-3 w-fit mx-auto">3 Meses</Badge>
                  <CardTitle className="text-2xl">Plan Base</CardTitle>
                  <CardDescription>Para comenzar tu transformación</CardDescription>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground line-through">$150.000/mes</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-primary">$120.000</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      Ahorras $90.000 (20% OFF)
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total: <strong>$360.000</strong> pago único
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Entrenamiento personalizado 3x/sem
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Plan nutricional personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Check-in semanal con coach
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      App profesional con progreso
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Chat IA 24/7 para dudas rápidas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Comunidad exclusiva
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Elegir 3 Meses
                  </Button>
                </CardContent>
              </Card>

              {/* 6 Meses Plan - Featured */}
              <Card className="border-2 border-primary relative hover:shadow-lg transition-shadow">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600">
                  RECOMENDADO
                </Badge>
                <CardHeader>
                  <Badge className="mb-3 w-fit mx-auto bg-green-600">6 Meses</Badge>
                  <CardTitle className="text-2xl">Plan Pro</CardTitle>
                  <CardDescription>Transformación profunda</CardDescription>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground line-through">$150.000/mes</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-primary">$105.000</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      Ahorras $270.000 (30% OFF)
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total: <strong>$630.000</strong> pago único
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <strong>Todo de 3 Meses</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Llamada coaching mensual (45 min)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Ejercicios de mindset semanales
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Ajustes ilimitados de nutrición
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Revisión de técnica vía video
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Análisis de progreso mensual detallado
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    Elegir 6 Meses
                  </Button>
                </CardContent>
              </Card>

              {/* 12 Meses Plan */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="mb-3 w-fit mx-auto bg-purple-600">12 Meses</Badge>
                  <CardTitle className="text-2xl">Plan Elite</CardTitle>
                  <CardDescription>Transformación completa</CardDescription>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground line-through">$150.000/mes</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-purple-600">$75.000</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      Ahorras $900.000 (50% OFF)
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total: <strong>$900.000</strong> pago único
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <strong>Todo de 6 Meses</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Llamadas de coaching cada 2 semanas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Sesión mindset 1-on-1 mensual
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      WhatsApp directo con el equipo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Prioridad absoluta (menos de 24hs respuesta)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Plan de suplementación personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Análisis e interpretación de laboratorios
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Elegir 12 Meses
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                ✓ Garantía de 7 días • Sin preguntas
              </p>
              <p className="text-xs text-muted-foreground">
                *Los planes incluyen todas las herramientas: App profesional, entrenamiento, nutrición, mindset, comunidad y soporte IA 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section - Google Form */}
      <section id="lead-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">
                  Estás a un paso de comenzar tu transformación
                </CardTitle>
                <CardDescription className="text-base mt-4">
                  Déjanos conocerte un poco y Lucas se contactará con vos para diseñar tu plan personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSezCSfiDUI5CdQWq0qFqnCj91bb7AczYJ3WuUG7xufMcGIzWQ/viewform?embedded=true" 
                  width="100%" 
                  height="700" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  style={{ borderRadius: '8px', maxWidth: '600px' }}
                >
                  Cargando…
                </iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-4 text-left">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Realmente es solo 3 veces por semana?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sí, y está diseñado así intencionalmente. La ciencia muestra que 3 sesiones de calidad
                    con suficiente descanso son más efectivas que entrenar todos los días sin propósito.
                    Además, hace que el programa sea sostenible para personas ocupadas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Necesito equipo de gimnasio?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Adaptamos el plan según lo que tengas disponible. Podemos trabajar con equipamiento
                    completo de gimnasio, equipo básico en casa, o solo peso corporal.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿La IA reemplaza al coach humano?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No, la IA es un complemento. Responde dudas rápidas 24/7, genera entrenamientos basados
                    en nuestro conocimiento, y te ayuda cuando el coach no está disponible. El humano siempre
                    está supervisando y ajustando tu programa.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Es solo para jóvenes o personas fitness?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Para nada. Trabajamos con personas de todas las edades y niveles de condición física.
                    Cada plan está 100% personalizado según tus capacidades, limitaciones y objetivos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Qué pasa si me arrepiento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tienes 7 días de garantía. Si no estás satisfecho con el programa, te devolvemos el
                    dinero sin preguntas. Además, puedes cancelar en cualquier momento (con aviso previo).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Comenzar tu Transformación?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              No esperes más. La mejor inversión es en tu salud y bienestar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar mi Llamada Gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Planes y Precios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-6 w-6 text-primary" />
                <div>
                  <span className="font-bold">Transformación Consciente</span>
                  <p className="text-xs text-muted-foreground">by: Lucas Gonzalez</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Transformación física, mental y nutricional con un equipo interdisciplinario y tecnología de punta.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Proyecto <strong>257Club</strong> • Transformando vidas conscientemente
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Entrenamiento Personalizado</a></li>
                <li><a href="#" className="hover:text-primary">Nutrición</a></li>
                <li><a href="#" className="hover:text-primary">Mindset Coaching</a></li>
                <li><a href="#" className="hover:text-primary">Comunidad</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary">Testimonios</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contacto@transformacionintegral.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+54 9 11 XXXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  <span>@tu.marca.personal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Transformación Consciente by Lucas Gonzalez. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Términos</a>
              <a href="#" className="hover:text-primary">Privacidad</a>
              <a href="#" className="hover:text-primary">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
