"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckSquare,
  Music,
  FileText,
  QrCode,
  List,
  CheckCircle,
  XCircle,
  Search,
  Download,
  Share2,
  Printer,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

export default function TeacherAssignedPage() {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(70)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de ejemplo para las clases
  const currentClass = {
    id: 1,
    title: "Hatha Yoga Intermedio",
    time: "Ahora - 10:30 AM a 12:00 PM",
    location: "Sala Principal",
    address: "Av. Principal #123, Piso 2",
    enrolled: 12,
    capacity: 15,
    attendees: 10,
    status: "in-progress",
    description: "Clase de Hatha Yoga con enfoque en alineación y respiración consciente.",
    notes: "Enfatizar la alineación correcta en Trikonasana y Virabhadrasana II. Incluir variantes para principiantes.",
    playlist: "Hatha Flow Suave",
    materials: [
      { name: "Guión de clase", type: "pdf" },
      { name: "Secuencia de posturas", type: "image" },
      { name: "Música recomendada", type: "playlist" },
    ],
    students: [
      { id: 1, name: "Ana García", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 2, name: "Carlos López", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 3, name: "María Rodríguez", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 4, name: "Juan Pérez", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 5, name: "Laura Martínez", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 6, name: "Pedro Sánchez", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 7, name: "Sofía Gutiérrez", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 8, name: "Diego Hernández", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 9, name: "Valentina Torres", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 10, name: "Javier Flores", avatar: "/placeholder.svg?height=40&width=40", attendance: "present" },
      { id: 11, name: "Camila Díaz", avatar: "/placeholder.svg?height=40&width=40", attendance: "absent" },
      { id: 12, name: "Mateo Ruiz", avatar: "/placeholder.svg?height=40&width=40", attendance: "absent" },
    ],
  }

  const upcomingClasses = [
    {
      id: 2,
      title: "Vinyasa Flow",
      time: "Hoy - 17:00 PM a 18:30 PM",
      location: "Sala Principal",
      enrolled: 14,
      capacity: 15,
      status: "upcoming",
      description: "Secuencia fluida que conecta movimiento y respiración para todos los niveles.",
      notes: "Preparar secuencia dinámica con enfoque en transiciones fluidas. Incluir opciones para avanzados.",
      playlist: "Vinyasa Energético",
    },
    {
      id: 3,
      title: "Meditación Guiada",
      time: "Mañana - 09:00 AM a 10:00 AM",
      location: "Sala de Meditación",
      enrolled: 8,
      capacity: 12,
      status: "upcoming",
      description: "Sesión de meditación guiada para reducir el estrés y mejorar la concentración.",
      notes: "Preparar visualización para relajación profunda. Llevar cuenco tibetano y esencias.",
      playlist: "Meditación Mindfulness",
    },
  ]

  const pastClasses = [
    {
      id: 4,
      title: "Yoga para Principiantes",
      time: "Ayer - 18:00 PM a 19:30 PM",
      location: "Sala Principal",
      enrolled: 10,
      capacity: 15,
      attendees: 9,
      status: "completed",
      description: "Introducción a las posturas básicas de yoga para principiantes.",
      notes: "Enfoque en respiración y posturas básicas. Explicar modificaciones para cada postura.",
      playlist: "Yoga Suave",
    },
    {
      id: 5,
      title: "Yoga Restaurativo",
      time: "Lunes - 20:00 PM a 21:30 PM",
      location: "Sala de Meditación",
      enrolled: 8,
      capacity: 10,
      attendees: 8,
      status: "completed",
      description: "Práctica suave y reparadora ideal para recuperarse de lesiones o estrés.",
      notes: "Usar muchos props. Mantener ambiente tranquilo y temperatura agradable.",
      playlist: "Restaurativo Profundo",
    },
  ]

  // Datos de ejemplo para la playlist de Spotify
  const spotifyPlaylists = [
    {
      id: 1,
      name: "Hatha Flow Suave",
      tracks: [
        { title: "Morning Meditation", artist: "Yoga Sounds", duration: "5:23" },
        { title: "Gentle Flow", artist: "Zen Masters", duration: "4:45" },
        { title: "Peaceful Warrior", artist: "Yoga Beats", duration: "6:12" },
        { title: "Breath of Life", artist: "Mindful Music", duration: "5:58" },
        { title: "Sacred Space", artist: "Yoga Sounds", duration: "7:21" },
      ],
      image: "/placeholder.svg?height=120&width=120&text=Hatha+Flow",
    },
    {
      id: 2,
      name: "Vinyasa Energético",
      tracks: [
        { title: "Dynamic Flow", artist: "Yoga Beats", duration: "4:32" },
        { title: "Power Vinyasa", artist: "Flow Masters", duration: "5:15" },
        { title: "Rhythmic Breath", artist: "Yoga Sounds", duration: "6:03" },
        { title: "Sun Salutation", artist: "Mindful Music", duration: "4:48" },
        { title: "Energetic Release", artist: "Flow Masters", duration: "5:37" },
      ],
      image: "/placeholder.svg?height=120&width=120&text=Vinyasa",
    },
    {
      id: 3,
      name: "Meditación Mindfulness",
      tracks: [
        { title: "Present Moment", artist: "Zen Masters", duration: "8:12" },
        { title: "Deep Awareness", artist: "Mindful Music", duration: "10:05" },
        { title: "Conscious Breathing", artist: "Meditation Sounds", duration: "7:45" },
        { title: "Inner Peace", artist: "Zen Masters", duration: "9:33" },
        { title: "Mindful Journey", artist: "Meditation Sounds", duration: "11:21" },
      ],
      image: "/placeholder.svg?height=120&width=120&text=Meditación",
    },
  ]

  const currentPlaylist = spotifyPlaylists.find((playlist) => playlist.name === currentClass.playlist)

  // Función para manejar la toma de asistencia
  const handleAttendance = (classData: any) => {
    setSelectedClass(classData)
    setIsAttendanceModalOpen(true)
  }

  // Función para mostrar el código QR
  const showQrCode = () => {
    setIsQrModalOpen(true)
  }

  // Función para abrir el reproductor de Spotify
  const openSpotifyPlayer = (classData: any) => {
    setSelectedClass(classData)
    setIsSpotifyModalOpen(true)
  }

  // Función para filtrar estudiantes por búsqueda
  const filteredStudents = currentClass.students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Función para manejar la reproducción de música
  const togglePlayMusic = () => {
    setIsPlayingMusic(!isPlayingMusic)
  }

  // Función para cambiar el estado de asistencia de un estudiante
  const toggleAttendance = (studentId: number) => {
    // En una aplicación real, esto actualizaría el estado en la base de datos
    console.log(`Cambiando asistencia del estudiante ${studentId}`)
  }

  return (
    <div className="md:ml-64 pb-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Clases Asignadas</h1>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="current">Clase Actual</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="past">Anteriores</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {currentClass ? (
            <div className="space-y-6">
              {/* Tarjeta principal de la clase actual */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-purple-600">{currentClass.title}</CardTitle>
                      <CardDescription className="text-lg">{currentClass.time}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">En progreso</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información de la clase */}
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                        <span>{currentClass.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2 text-purple-500" />
                        <span>
                          {currentClass.attendees} asistentes de {currentClass.enrolled} inscritos (capacidad:{" "}
                          {currentClass.capacity})
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Music className="h-5 w-5 mr-2 text-purple-500" />
                        <span>Playlist: {currentClass.playlist}</span>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Descripción:</h3>
                        <p className="text-gray-600">{currentClass.description}</p>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Notas para el instructor:</h3>
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-700 text-sm">{currentClass.notes}</div>
                      </div>
                    </div>

                    {/* Progreso y acciones */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Progreso de la clase</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 flex items-center"
                          onClick={() => handleAttendance(currentClass)}
                        >
                          <CheckSquare className="mr-2 h-5 w-5" />
                          Tomar Asistencia
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center"
                          onClick={showQrCode}
                        >
                          <QrCode className="mr-2 h-5 w-5" />
                          Código QR
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center"
                          onClick={() => openSpotifyPlayer(currentClass)}
                        >
                          <Music className="mr-2 h-5 w-5" />
                          Reproducir Música
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex items-center"
                        >
                          <FileText className="mr-2 h-5 w-5" />
                          Ver Guión
                        </Button>
                      </div>

                      {/* Materiales de clase */}
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-3">Materiales de clase:</h3>
                        <div className="space-y-2">
                          {currentClass.materials.map((material, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center">
                                {material.type === "pdf" && (
                                  <div className="bg-red-100 p-2 rounded text-red-600 mr-3">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                )}
                                {material.type === "image" && (
                                  <div className="bg-blue-100 p-2 rounded text-blue-600 mr-3">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                )}
                                {material.type === "playlist" && (
                                  <div className="bg-green-100 p-2 rounded text-green-600 mr-3">
                                    <Music className="h-5 w-5" />
                                  </div>
                                )}
                                <span className="font-medium">{material.name}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lista de estudiantes */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-700">Estudiantes ({currentClass.enrolled})</h3>
                      <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Buscar estudiante..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                        <div className="col-span-6 font-medium">Nombre</div>
                        <div className="col-span-3 font-medium">Estado</div>
                        <div className="col-span-3 font-medium text-right">Acciones</div>
                      </div>
                      <div className="divide-y max-h-80 overflow-y-auto">
                        {filteredStudents.map((student) => (
                          <div key={student.id} className="grid grid-cols-12 p-3 items-center">
                            <div className="col-span-6 flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback className="bg-purple-200 text-purple-700 text-xs">
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                            <div className="col-span-3">
                              {student.attendance === "present" ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">Presente</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 border-red-200">Ausente</Badge>
                              )}
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleAttendance(student.id)}
                              >
                                {student.attendance === "present" ? (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <User className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir Lista
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir Notas
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No tienes clases en curso en este momento.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Ver Próximas Clases</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{cls.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>
                            {cls.enrolled} / {cls.capacity} estudiantes
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{cls.description}</p>
                      <div className="mt-3 bg-purple-50 p-2 rounded-lg text-purple-700 text-sm">
                        <span className="font-medium">Notas:</span> {cls.notes}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end justify-between">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">Próxima</Badge>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => openSpotifyPlayer(cls)}
                        >
                          <Music className="mr-2 h-4 w-4" />
                          Ver Playlist
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <FileText className="mr-2 h-4 w-4" />
                          Preparar Clase
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {pastClasses.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{cls.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>
                            Asistencia: {cls.attendees} / {cls.enrolled} estudiantes
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{cls.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end justify-between">
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200 mb-4">Completada</Badge>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                          <List className="mr-2 h-4 w-4" />
                          Ver Asistencia
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <FileText className="mr-2 h-4 w-4" />
                          Ver Notas
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Asistencia */}
      <Dialog open={isAttendanceModalOpen} onOpenChange={setIsAttendanceModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Tomar Asistencia</DialogTitle>
            <DialogDescription>
              {selectedClass?.title} - {selectedClass?.time}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar estudiante..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                <div className="col-span-1"></div>
                <div className="col-span-7 font-medium">Nombre</div>
                <div className="col-span-4 font-medium text-center">Asistencia</div>
              </div>
              <div className="divide-y max-h-80 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="grid grid-cols-12 p-3 items-center">
                    <div className="col-span-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-purple-200 text-purple-700 text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="col-span-7">
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <div className="col-span-4 flex justify-center space-x-2">
                      <Button
                        variant={student.attendance === "present" ? "default" : "outline"}
                        size="sm"
                        className={
                          student.attendance === "present"
                            ? "bg-green-600 hover:bg-green-700"
                            : "border-green-200 text-green-600 hover:bg-green-50"
                        }
                        onClick={() => toggleAttendance(student.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Presente
                      </Button>
                      <Button
                        variant={student.attendance === "absent" ? "default" : "outline"}
                        size="sm"
                        className={
                          student.attendance === "absent"
                            ? "bg-red-600 hover:bg-red-700"
                            : "border-red-200 text-red-600 hover:bg-red-50"
                        }
                        onClick={() => toggleAttendance(student.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Ausente
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAttendanceModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAttendanceModalOpen(false)}>
              Guardar Asistencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Código QR */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Código QR para Asistencia</DialogTitle>
            <DialogDescription>
              Los estudiantes pueden escanear este código para registrar su asistencia automáticamente
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <img
                src="/placeholder.svg?height=200&width=200&text=QR+Code"
                alt="Código QR"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">
              Este código es válido por 10 minutos. Actualiza para generar uno nuevo.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar Código QR
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Spotify */}
      <Dialog open={isSpotifyModalOpen} onOpenChange={setIsSpotifyModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600 flex items-center">
              <Music className="mr-2 h-5 w-5" />
              Reproductor de Música
            </DialogTitle>
            <DialogDescription>
              {currentPlaylist ? `Playlist: ${currentPlaylist.name}` : "Selecciona una playlist"}
            </DialogDescription>
          </DialogHeader>

          {currentPlaylist && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={currentPlaylist.image || "/placeholder.svg"}
                  alt={currentPlaylist.name}
                  className="w-24 h-24 rounded-lg shadow-md"
                />
                <div>
                  <h3 className="font-medium text-gray-700">{currentPlaylist.name}</h3>
                  <p className="text-sm text-gray-500">{currentPlaylist.tracks.length} canciones</p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant={isPlayingMusic ? "default" : "outline"}
                      size="sm"
                      className={
                        isPlayingMusic
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }
                      onClick={togglePlayMusic}
                    >
                      {isPlayingMusic ? "Pausar" : "Reproducir"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Volumen</span>
                  <span className="text-sm">{currentVolume}%</span>
                </div>
                <Slider
                  value={[currentVolume]}
                  onValueChange={(value) => setCurrentVolume(value[0])}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Lista de Reproducción</h4>
                <div className="bg-gray-50 rounded-lg border overflow-hidden">
                  <div className="divide-y max-h-60 overflow-y-auto">
                    {currentPlaylist.tracks.map((track, index) => (
                      <div
                        key={index}
                        className={`p-3 flex justify-between items-center ${
                          index === 0 && isPlayingMusic ? "bg-purple-50" : ""
                        }`}
                      >
                        <div>
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        </div>
                        <span className="text-sm text-gray-500">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSpotifyModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
