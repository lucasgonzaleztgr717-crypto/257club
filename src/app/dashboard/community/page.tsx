'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Users, Heart, MessageCircle, Share2, Plus, Send } from 'lucide-react'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  isLiked: boolean
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'María García',
      avatar: '/avatar-placeholder.jpg',
      initials: 'MG'
    },
    content: '¡Buenas comunidad! 🎉 Quiero compartir mi progreso de este mes. Perdí 3kg y mis medidas mejoraron increíblemente. Gracias Lucas y a todo el equipo de 257Club por el apoyo!',
    likes: 24,
    comments: 8,
    timestamp: 'hace 2 horas',
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Carlos Rodríguez',
      avatar: '/avatar-placeholder.jpg',
      initials: 'CR'
    },
    content: '¿Alguien ha probado el trabajo de zona 2 que recomendó Lucas? Estoy notando mucha mejora en mi resistencia. Es increíble cómo algo tan simple como caminar a ritmo moderado hace tanta diferencia.',
    likes: 18,
    comments: 12,
    timestamp: 'hace 4 horas',
    isLiked: false
  },
  {
    id: '3',
    author: {
      name: 'Laura Martínez',
      avatar: '/avatar-placeholder.jpg',
      initials: 'LM'
    },
    content: 'Hoy fue día de entrenamiento Full Body y lo sentí fenomenal. Los ejercicios que me mandaron fueron perfectos para mi nivel. +2kg en sentadilla esta semana 💪',
    likes: 31,
    comments: 5,
    timestamp: 'hace 6 horas',
    isLiked: true
  },
  {
    id: '4',
    author: {
      name: 'Lucas Gonzalez',
      avatar: '/avatar-lucas.jpg',
      initials: 'LG'
    },
    content: '💡 Tip del día: La consistencia le gana a la intensidad. Es mejor entrenar 3 veces por semana durante un año, que entrenar 6 veces por semana por un mes y luego abandonar.\n\nEl secreto no es encontrar el "mejor" programa, sino encontrar el programa que puedas mantener a largo plazo.\n\n¿Cuál es su mayor desafío con la consistencia?',
    likes: 67,
    comments: 24,
    timestamp: 'hace 8 horas',
    isLiked: false
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleSubmitPost = () => {
    if (!newPost.trim()) return

    const newPostData: Post = {
      id: Date.now().toString(),
      author: {
        name: 'Tu Nombre',
        avatar: '/avatar-placeholder.jpg',
        initials: 'TN'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'ahora mismo',
      isLiked: false
    }

    setPosts([newPostData, ...posts])
    setNewPost('')
    setShowNewPost(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Comunidad</h1>
          <p className="text-muted-foreground">
            Conéctate con otros clientes de Transformación Consciente
          </p>
        </div>
        <Button onClick={() => setShowNewPost(!showNewPost)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Post
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comparte tu progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="¿Qué quieres compartir con la comunidad hoy?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Agregar foto
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setShowNewPost(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Publicar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">127</div>
                <div className="text-xs text-muted-foreground">Miembros activos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">456</div>
                <div className="text-xs text-muted-foreground">Posts esta semana</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">2.3K</div>
                <div className="text-xs text-muted-foreground">Likes totales</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Send className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">1.8K</div>
                <div className="text-xs text-muted-foreground">Comentarios</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {post.author.initials}
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author.name}</span>
                      {post.author.name === 'Lucas Gonzalez' && (
                        <Badge variant="secondary" className="text-xs">
                          Coach
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap mb-4">{post.content}</p>

              {post.image && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.isLiked ? 'text-red-500' : ''}
                >
                  <Heart
                    className={`h-5 w-5 mr-1 ${post.isLiked ? 'fill-current' : ''}`}
                  />
                  {post.likes}
                </Button>

                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  {post.comments}
                </Button>

                <div className="flex-1" />

                <Button variant="ghost" size="sm">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Comments Preview */}
              {post.comments > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Button variant="ghost" className="text-sm" size="sm">
                    Ver {post.comments} comentarios
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Normas de la Comunidad</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Sé respetuoso con todos los miembros de la comunidad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Comparte experiencias reales y auténticas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Apoya y motiva a otros miembros en su viaje</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Respeta la privacidad de otros (no compartas datos personales sin permiso)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Evita comparaciones que puedan afectar negativamente a otros</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Para consultas específicas de entrenamiento, usa el chat con el coach</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
