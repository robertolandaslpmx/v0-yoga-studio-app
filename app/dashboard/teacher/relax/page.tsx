"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, VolumeX, RefreshCw, Lightbulb, BookOpen, Users, Smile } from "lucide-react"

export default function TeacherRelaxPage() {
  const [message, setMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState("all")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Colección de mensajes inspiradores y consejos para maestros
  const messages = [
    {
      text: "Recuerda que cada alumno tiene su propio ritmo. Adapta tus instrucciones para que todos se sientan incluidos y respetados en su proceso.",
      type: "teaching",
      style: "all",
    },
    {
      text: "Antes de cada clase, tómate unos minutos para centrarte. Tu energía establece el tono para toda la experiencia de tus alumnos.",
      type: "preparation",
      style: "all",
    },
    {
      text: "Consejo: Utiliza un lenguaje inclusivo y accesible. Evita términos demasiado técnicos que puedan confundir a los principiantes.",
      type: "tip",
      style: "hatha",
    },
    {
      text: "La mejor enseñanza viene del corazón. Comparte tu pasión genuina por el yoga y conectarás profundamente con tus estudiantes.",
      type: "inspiration",
      style: "all",
    },
    {
      text: "Dato: Los estudios muestran que los estudiantes retienen mejor las posturas cuando se les explica tanto el beneficio físico como el mental de cada una.",
      type: "fact",
      style: "all",
    },
    {
      text: "Para clases de Vinyasa: Enfócate en la sincronización de la respiración con el movimiento. Guía a tus estudiantes a través de transiciones fluidas y conscientes.",
      type: "tip",
      style: "vinyasa",
    },
    {
      text: "El yoga no es sobre ser perfecto, es sobre estar presente. Recuérdalo a tus estudiantes constantemente.",
      type: "quote",
      style: "all",
    },
    {
      text: "Para clases de Yin Yoga: Crea un ambiente tranquilo y utiliza un tono de voz suave. Enfatiza la importancia de rendirse a la postura y observar las sensaciones.",
      type: "tip",
      style: "yin",
    },
    {
      text: "Dato: La música a 60-80 BPM es ideal para mantener un ritmo constante en clases de yoga dinámico.",
      type: "fact",
      style: "vinyasa",
    },
    {
      text: "Para clases de Hatha: Dedica tiempo a alinear correctamente a tus estudiantes. Una buena alineación previene lesiones y maximiza los beneficios de cada postura.",
      type: "tip",
      style: "hatha",
    },
    {
      text: "Enseña lo que necesitas aprender. Tus desafíos personales pueden convertirse en tus enseñanzas más poderosas.",
      type: "quote",
      style: "all",
    },
    {
      text: "Para clases de meditación: Comienza con meditaciones guiadas cortas e incrementa gradualmente la duración. Utiliza imágenes vívidas para mantener la atención de los principiantes.",
      type: "tip",
      style: "meditation",
    },
    {
      text: "Observa el lenguaje corporal de tus estudiantes. A menudo te dirá más que sus palabras sobre cómo se sienten en la práctica.",
      type: "teaching",
      style: "all",
    },
    {
      text: "Para clases de Restaurativo: Asegúrate de tener suficientes props disponibles. La comodidad es esencial para que los estudiantes puedan relajarse completamente.",
      type: "tip",
      style: "restorative",
    },
    {
      text: "Recuerda que eres un guía, no un gurú. Empodera a tus estudiantes para que encuentren su propio camino en el yoga.",
      type: "teaching",
      style: "all",
    },
  ]

  // Colección de imágenes de fondo
  const backgrounds = [
    "url('/placeholder.svg?height=1080&width=1920&text=Estudio+de+yoga+tranquilo')",
    "url('/placeholder.svg?height=1080&width=1920&text=Maestro+guiando+clase')",
    "url('/placeholder.svg?height=1080&width=1920&text=Meditación+grupal')",
    "url('/placeholder.svg?height=1080&width=1920&text=Práctica+al+amanecer')",
    "url('/placeholder.svg?height=1080&width=1920&text=Espacio+zen')",
  ]

  // Estilos de yoga para filtrar consejos
  const yogaStyles = [
    { id: "all", name: "Todos los estilos", icon: "🧘" },
    { id: "hatha", name: "Hatha Yoga", icon: "🌞" },
    { id: "vinyasa", name: "Vinyasa Flow", icon: "🌊" },
    { id: "yin", name: "Yin Yoga", icon: "🌙" },
    { id: "restorative", name: "Restaurativo", icon: "🛌" },
    { id: "meditation", name: "Meditación", icon: "🧠" },
  ]

  // Función para obtener un mensaje aleatorio según el estilo seleccionado
  const getRandomMessage = () => {
    const filteredMessages = messages.filter((m) =>
      selectedStyle === "all" ? true : m.style === "all" || m.style === selectedStyle,
    )
    const randomIndex = Math.floor(Math.random() * filteredMessages.length)
    return filteredMessages[randomIndex]
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

  // Actualizar mensaje cuando cambia el estilo seleccionado
  useEffect(() => {
    setMessage(getRandomMessage().text)
  }, [selectedStyle])

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
    return currentMessage ? currentMessage.type : "teaching"
  }

  // Obtener el ícono según el tipo de mensaje
  const getMessageIcon = () => {
    const type = getMessageType()
    switch (type) {
      case "teaching":
        return "👨‍🏫"
      case "preparation":
        return "🧘‍♂️"
      case "tip":
        return "💡"
      case "fact":
        return "📚"
      case "quote":
        return "💬"
      case "inspiration":
        return "✨"
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

      <div className="relative z-10 max-w-4xl w-full">
        {/* Tarjeta de mensaje */}
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-start">
              <span className="text-4xl mr-4">{getMessageIcon()}</span>
              <div>
                <CardTitle className="text-3xl font-bold text-purple-600">Espacio Relax para Maestros</CardTitle>
                <p className="text-gray-600 mt-1">Inspiración y consejos para mejorar tus clases</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Selector de estilo de yoga */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Filtrar consejos por estilo de yoga:
              </h3>
              <div className="flex flex-wrap gap-2">
                {yogaStyles.map((style) => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "default" : "outline"}
                    className={`${
                      selectedStyle === style.id
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50"
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <span className="mr-2">{style.icon}</span>
                    {style.name}
                  </Button>
                ))}
              </div>
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
                Nuevo consejo
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

        {/* Tarjeta de recursos para maestros */}
        <Card className="mt-6 bg-white bg-opacity-90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="teaching">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="teaching" className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Consejos Didácticos
                </TabsTrigger>
                <TabsTrigger value="sequences" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Secuencias
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Manejo de Grupo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teaching">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-700 mb-2 flex items-center">
                      <span className="mr-2">🎯</span> Estructura de Clase
                    </h3>
                    <ul className="text-sm text-blue-600 space-y-2">
                      <li>• Comienza con una intención clara y centrada</li>
                      <li>• Incluye calentamiento, parte principal y relajación</li>
                      <li>• Reserva 5-10 minutos para Savasana al final</li>
                      <li>• Adapta la intensidad según el nivel del grupo</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-bold text-amber-700 mb-2 flex items-center">
                      <span className="mr-2">🗣️</span> Comunicación Efectiva
                    </h3>
                    <ul className="text-sm text-amber-600 space-y-2">
                      <li>• Usa un tono de voz claro y calmado</li>
                      <li>• Ofrece tanto instrucciones verbales como visuales</li>
                      <li>• Describe sensaciones, no solo posiciones</li>
                      <li>• Usa metáforas para explicar conceptos complejos</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-700 mb-2 flex items-center">
                      <span className="mr-2">👐</span> Ajustes y Asistencia
                    </h3>
                    <ul className="text-sm text-green-600 space-y-2">
                      <li>• Pide permiso antes de tocar a un estudiante</li>
                      <li>• Ofrece ajustes verbales como primera opción</li>
                      <li>• Usa un toque firme pero suave para ajustes físicos</li>
                      <li>• Muestra variantes para diferentes niveles</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-bold text-indigo-700 mb-2 flex items-center">
                      <span className="mr-2">🧠</span> Desarrollo Profesional
                    </h3>
                    <ul className="text-sm text-indigo-600 space-y-2">
                      <li>• Mantén tu práctica personal activa</li>
                      <li>• Asiste a talleres y formaciones continuamente</li>
                      <li>• Pide retroalimentación a tus estudiantes</li>
                      <li>• Colabora con otros maestros para intercambiar ideas</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sequences">
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-purple-700 mb-2 flex items-center">
                      <span className="mr-2">🌅</span> Secuencia para Despertar (30 min)
                    </h3>
                    <ol className="text-sm text-purple-600 space-y-1 list-decimal list-inside">
                      <li>Meditación sentada (3 min)</li>
                      <li>Respiración consciente (2 min)</li>
                      <li>Estiramientos suaves en posición supina (5 min)</li>
                      <li>Saludo al sol A - 3 rondas (5 min)</li>
                      <li>Posturas de pie básicas (10 min)</li>
                      <li>Torsiones sentadas (3 min)</li>
                      <li>Savasana (2 min)</li>
                    </ol>
                    <Button variant="link" className="text-purple-600 p-0 h-auto mt-2">
                      Ver secuencia completa →
                    </Button>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-bold text-teal-700 mb-2 flex items-center">
                      <span className="mr-2">🌙</span> Secuencia Restaurativa (45 min)
                    </h3>
                    <ol className="text-sm text-teal-600 space-y-1 list-decimal list-inside">
                      <li>Meditación guiada (5 min)</li>
                      <li>Respiración profunda (3 min)</li>
                      <li>Postura del niño con soporte (5 min)</li>
                      <li>Flexión hacia adelante sentada con soporte (5 min)</li>
                      <li>Torsión reclinada (5 min cada lado)</li>
                      <li>Piernas en la pared (8 min)</li>
                      <li>Savasana con bolsters (10 min)</li>
                    </ol>
                    <Button variant="link" className="text-teal-600 p-0 h-auto mt-2">
                      Ver secuencia completa →
                    </Button>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-lg">
                    <h3 className="font-bold text-rose-700 mb-2 flex items-center">
                      <span className="mr-2">🔥</span> Secuencia Energizante (60 min)
                    </h3>
                    <ol className="text-sm text-rose-600 space-y-1 list-decimal list-inside">
                      <li>Respiración Kapalabhati (3 min)</li>
                      <li>Saludo al sol B - 5 rondas (10 min)</li>
                      <li>Serie de guerreros (10 min)</li>
                      <li>Equilibrios de pie (8 min)</li>
                      <li>Secuencia de core (10 min)</li>
                      <li>Flexiones hacia adelante (8 min)</li>
                      <li>Inversiones suaves (5 min)</li>
                      <li>Savasana (6 min)</li>
                    </ol>
                    <Button variant="link" className="text-rose-600 p-0 h-auto mt-2">
                      Ver secuencia completa →
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="font-bold text-emerald-700 mb-2 flex items-center">
                      <span className="mr-2">🤝</span> Creando Comunidad
                    </h3>
                    <ul className="text-sm text-emerald-600 space-y-2">
                      <li>• Aprende y usa los nombres de tus estudiantes</li>
                      <li>• Llega temprano para conectar antes de clase</li>
                      <li>• Organiza eventos especiales ocasionalmente</li>
                      <li>• Crea un espacio seguro para compartir experiencias</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-orange-700 mb-2 flex items-center">
                      <span className="mr-2">⚠️</span> Manejo de Situaciones Difíciles
                    </h3>
                    <ul className="text-sm text-orange-600 space-y-2">
                      <li>• Estudiante dominante: Redirige con amabilidad</li>
                      <li>• Estudiante con lesión: Ofrece modificaciones</li>
                      <li>• Estudiante distraído: Usa indicaciones específicas</li>
                      <li>• Grupo heterogéneo: Proporciona opciones multinivel</li>
                    </ul>
                  </div>

                  <div className="bg-sky-50 p-4 rounded-lg">
                    <h3 className="font-bold text-sky-700 mb-2 flex items-center">
                      <span className="mr-2">🔄</span> Adaptación a Diferentes Niveles
                    </h3>
                    <ul className="text-sm text-sky-600 space-y-2">
                      <li>• Ofrece tres variantes para cada postura</li>
                      <li>• Usa lenguaje inclusivo para todos los niveles</li>
                      <li>• Demuestra la versión básica primero</li>
                      <li>• Reconoce el esfuerzo, no solo el logro</li>
                    </ul>
                  </div>

                  <div className="bg-fuchsia-50 p-4 rounded-lg">
                    <h3 className="font-bold text-fuchsia-700 mb-2 flex items-center">
                      <span className="mr-2">💌</span> Retroalimentación y Crecimiento
                    </h3>
                    <ul className="text-sm text-fuchsia-600 space-y-2">
                      <li>• Solicita comentarios regularmente</li>
                      <li>• Implementa sugerencias constructivas</li>
                      <li>• Realiza encuestas anónimas periódicamente</li>
                      <li>• Celebra el progreso de tus estudiantes</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Nota de bienvenida */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <p className="text-sm text-purple-700 font-medium flex items-center">
            <Smile className="h-4 w-4 mr-2" />
            Bienvenido a tu espacio de inspiración docente 🙏
          </p>
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
