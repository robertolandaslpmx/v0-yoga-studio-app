"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, RefreshCw } from "lucide-react"

export default function RelaxPage() {
  const [message, setMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Colección de mensajes inspiradores y consejos
  const messages = [
    {
      text: "Respira profundamente. Inhala paz, exhala tensión. Cada respiración es una oportunidad para comenzar de nuevo.",
      type: "meditation",
    },
    {
      text: "El yoga no es sobre tocarse los dedos de los pies, es sobre lo que aprendes en el camino hacia abajo.",
      type: "inspiration",
    },
    {
      text: "Consejo: Dedica 5 minutos cada mañana a la meditación. Siéntate en silencio, observa tu respiración y deja que tus pensamientos pasen sin juzgarlos.",
      type: "tip",
    },
    {
      text: "La paz viene de adentro. No la busques afuera. Encuentra tu centro y todo lo demás caerá en su lugar.",
      type: "inspiration",
    },
    {
      text: "Dato: La meditación regular puede reducir los niveles de cortisol, la hormona del estrés, y mejorar la calidad del sueño.",
      type: "fact",
    },
    {
      text: "Practica la gratitud. Cada día, piensa en tres cosas por las que estás agradecido. Esto cambiará tu perspectiva y abrirá tu corazón.",
      type: "tip",
    },
    {
      text: "El yoga es el viaje del ser, a través del ser, hacia el ser. - Bhagavad Gita",
      type: "quote",
    },
    {
      text: "Consejo: Prueba la técnica 4-7-8 para relajarte. Inhala por 4 segundos, mantén por 7 segundos, exhala por 8 segundos.",
      type: "tip",
    },
    {
      text: "Dato: El yoga tiene más de 5,000 años de antigüedad y se originó en la India como una práctica para unir cuerpo, mente y espíritu.",
      type: "fact",
    },
    {
      text: "La mente es como el agua. Cuando está agitada, es difícil ver. Cuando está tranquila, todo se aclara.",
      type: "meditation",
    },
    {
      text: "No puedes detener las olas, pero puedes aprender a surfear. - Jon Kabat-Zinn",
      type: "quote",
    },
    {
      text: "Consejo: Practica la postura del árbol (Vrikshasana) para mejorar tu equilibrio y concentración. Comienza con 30 segundos en cada pie.",
      type: "tip",
    },
  ]

  // Colección de imágenes de fondo
  const backgrounds = [
    "url('/placeholder.svg?height=1080&width=1920&text=Paisaje+montañoso+sereno')",
    "url('/placeholder.svg?height=1080&width=1920&text=Playa+al+atardecer')",
    "url('/placeholder.svg?height=1080&width=1920&text=Bosque+tranquilo')",
    "url('/placeholder.svg?height=1080&width=1920&text=Lago+en+calma')",
    "url('/placeholder.svg?height=1080&width=1920&text=Jardín+zen')",
  ]

  // Función para obtener un mensaje aleatorio
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex]
  }

  // Función para cambiar el fondo
  const changeBackground = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
  }

  // Inicializar con un mensaje aleatorio y configurar el audio
  useEffect(() => {
    setMessage(getRandomMessage().text)

    // Crear elemento de audio
    audioRef.current = new Audio("/ambient-sound.mp3") // Este archivo debería existir en la carpeta public
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    return () => {
      // Limpiar el audio al desmontar el componente
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Manejar la reproducción de audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Función para refrescar el mensaje
  const refreshMessage = () => {
    setMessage(getRandomMessage().text)
  }

  // Obtener el tipo de mensaje para aplicar estilos específicos
  const getMessageType = () => {
    const currentMessage = messages.find((m) => m.text === message)
    return currentMessage ? currentMessage.type : "inspiration"
  }

  // Obtener el ícono según el tipo de mensaje
  const getMessageIcon = () => {
    const type = getMessageType()
    switch (type) {
      case "meditation":
        return "🧘‍♀️"
      case "inspiration":
        return "✨"
      case "tip":
        return "💡"
      case "fact":
        return "📚"
      case "quote":
        return "💬"
      default:
        return "🌿"
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
      style={{
        backgroundImage: backgrounds[backgroundIndex],
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Tarjeta de mensaje */}
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-start mb-6">
              <span className="text-4xl mr-4">{getMessageIcon()}</span>
              <h1 className="text-3xl font-bold text-purple-600">Espacio Relax</h1>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-6 shadow-inner min-h-[150px] flex items-center justify-center">
              <p className="text-xl text-center text-gray-700 font-medium leading-relaxed">{message}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                onClick={refreshMessage}
              >
                <RefreshCw className="h-5 w-5" />
                Nuevo mensaje
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className={`border-purple-200 ${isPlaying ? "bg-purple-100 text-purple-700" : "text-purple-600 hover:bg-purple-50"}`}
                  onClick={toggleAudio}
                >
                  {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  {isPlaying ? "Sonido On" : "Sonido Off"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={changeBackground}
                >
                  🖼️ Cambiar fondo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de práctica diaria */}
        <Card className="mt-6 bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-purple-600 mb-4">Práctica diaria sugerida</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2 flex items-center">
                  <span className="mr-2">🌅</span> Mañana
                </h3>
                <p className="text-sm text-blue-600">
                  5 minutos de meditación seguidos de 10 minutos de estiramientos suaves para despertar el cuerpo.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-bold text-amber-700 mb-2 flex items-center">
                  <span className="mr-2">☀️</span> Mediodía
                </h3>
                <p className="text-sm text-amber-600">
                  Pausa de 2 minutos para respiración consciente. Inhala por la nariz, exhala por la boca.
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-bold text-indigo-700 mb-2 flex items-center">
                  <span className="mr-2">🌙</span> Noche
                </h3>
                <p className="text-sm text-indigo-600">
                  15 minutos de yoga restaurativo antes de dormir para liberar tensiones y preparar el cuerpo para el
                  descanso.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nota de bienvenida */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <p className="text-sm text-purple-700 font-medium">Bienvenido a tu espacio de paz y tranquilidad 🙏</p>
        </div>
      </div>

      {/* Audio placeholder - el audio real se maneja con JavaScript */}
      <audio id="ambient-sound" loop>
        <source src="/ambient-sound.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  )
}
