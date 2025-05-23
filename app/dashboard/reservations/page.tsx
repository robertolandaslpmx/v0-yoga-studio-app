"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock, MapPin, User, Filter, Search, RotateCcw, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Luego, actualicemos el componente principal para incluir los nuevos estados
export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("all")
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [classToReserve, setClassToReserve] = useState<any>(null)

  // Nuevos estados para las funcionalidades solicitadas
  const [addToCalendar, setAddToCalendar] = useState(false)
  const [classMode, setClassMode] = useState("presencial")
  const [selectedCalendar, setSelectedCalendar] = useState("google")

  // Datos de ejemplo para las clases disponibles con diferentes dificultades y horarios
  const allClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      instructor: "María González",
      time: "09:00",
      endTime: "10:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 8,
      difficulty: "Fácil",
      description: "Clase ideal para personas que se inician en la práctica del yoga.",
      timeSlot: "morning",
      availableModes: ["presencial", "online"],
    },
    {
      id: 2,
      title: "Hatha Yoga Intermedio",
      instructor: "Carlos Rodríguez",
      time: "12:00",
      endTime: "13:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 5,
      difficulty: "Medio",
      description: "Práctica tradicional de Hatha Yoga con enfoque en posturas y respiración.",
      timeSlot: "afternoon",
      availableModes: ["presencial"],
    },
    {
      id: 3,
      title: "Meditación Guiada",
      instructor: "Ana López",
      time: "17:00",
      endTime: "18:00",
      location: "Sala de Meditación",
      address: "Av. Principal #123, Piso 1",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 10,
      difficulty: "Fácil",
      description: "Sesiones de meditación guiada para reducir el estrés y mejorar la concentración.",
      timeSlot: "evening",
      availableModes: ["presencial", "online"],
    },
    {
      id: 4,
      title: "Yoga Restaurativo",
      instructor: "Laura Martínez",
      time: "19:00",
      endTime: "20:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 3,
      difficulty: "Fácil",
      description: "Práctica suave y reparadora ideal para recuperarse de lesiones o estrés.",
      timeSlot: "evening",
      availableModes: ["presencial", "online"],
    },
    {
      id: 5,
      title: "Ashtanga Yoga",
      instructor: "Carlos Rodríguez",
      time: "07:30",
      endTime: "09:00",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 6,
      difficulty: "Difícil",
      description: "Serie dinámica y desafiante de posturas sincronizadas con la respiración.",
      timeSlot: "morning",
      availableModes: ["presencial"],
    },
    {
      id: 6,
      title: "Vinyasa Flow",
      instructor: "María González",
      time: "18:30",
      endTime: "20:00",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 7,
      difficulty: "Medio",
      description: "Secuencia fluida de posturas que conecta movimiento y respiración.",
      timeSlot: "evening",
      availableModes: ["presencial", "online"],
    },
    {
      id: 7,
      title: "Yoga Kundalini",
      instructor: "Ana López",
      time: "10:30",
      endTime: "12:00",
      location: "Sala de Meditación",
      address: "Av. Principal #123, Piso 1",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 8,
      difficulty: "Medio",
      description: "Práctica que combina posturas, respiración, meditación y canto de mantras.",
      timeSlot: "morning",
      availableModes: ["presencial", "online"],
    },
    {
      id: 8,
      title: "Power Yoga",
      instructor: "Carlos Rodríguez",
      time: "20:00",
      endTime: "21:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 4,
      difficulty: "Difícil",
      description: "Práctica intensa y vigorosa que desarrolla fuerza, flexibilidad y resistencia.",
      timeSlot: "evening",
      availableModes: ["presencial"],
    },
    {
      id: 9,
      title: "Yin Yoga",
      instructor: "Laura Martínez",
      time: "14:00",
      endTime: "15:30",
      location: "Sala de Meditación",
      address: "Av. Principal #123, Piso 1",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 12,
      difficulty: "Fácil",
      description: "Práctica pasiva que mantiene posturas por períodos prolongados.",
      timeSlot: "afternoon",
      availableModes: ["presencial", "online"],
    },
    {
      id: 10,
      title: "Hot Yoga",
      instructor: "Carlos Rodríguez",
      time: "16:00",
      endTime: "17:30",
      location: "Sala Climatizada",
      address: "Av. Principal #123, Piso 3",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      spots: 2,
      difficulty: "Difícil",
      description: "Yoga practicado en una sala con temperatura elevada para mayor desafío.",
      timeSlot: "afternoon",
      availableModes: ["presencial"],
    },
  ]

  // Filtrar clases según los criterios seleccionados
  const filteredClasses = allClasses.filter((cls) => {
    const difficultyMatch = selectedDifficulty === "all" || cls.difficulty === selectedDifficulty
    const timeSlotMatch = selectedTimeSlot === "all" || cls.timeSlot === selectedTimeSlot
    return difficultyMatch && timeSlotMatch
  })

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Difícil":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "😊"
      case "Medio":
        return "😐"
      case "Difícil":
        return "😵"
      default:
        return "❓"
    }
  }

  const getTimeSlotIcon = (timeSlot: string) => {
    switch (timeSlot) {
      case "morning":
        return "🌅"
      case "afternoon":
        return "☀️"
      case "evening":
        return "🌙"
      default:
        return "🕐"
    }
  }

  const handleReserve = (cls: any) => {
    setClassToReserve(cls)
    // Establecer el modo por defecto según las opciones disponibles
    if (cls.availableModes.includes("presencial")) {
      setClassMode("presencial")
    } else {
      setClassMode("online")
    }
    setIsConfirmModalOpen(true)
  }

  const confirmReservation = () => {
    // Aquí iría la lógica para reservar la clase
    let message = `Clase "${classToReserve?.title}" reservada con éxito para el ${date?.toLocaleDateString()}`
    message += `\nModalidad: ${classMode === "presencial" ? "Presencial" : "Online"}`

    if (addToCalendar) {
      message += `\nSe ha agregado un recordatorio a tu calendario de ${selectedCalendar.toUpperCase()}`
    }

    alert(message)
    setIsConfirmModalOpen(false)
    setClassToReserve(null)
    setAddToCalendar(false)
  }

  const clearFilters = () => {
    setSelectedDifficulty("all")
    setSelectedTimeSlot("all")
  }

  return (
    <div className="md:ml-64 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Reserva tu Clase</h1>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-green-600" />
          <Badge className="bg-green-100 text-green-800 border-green-200">Alumno</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Filtros y Calendario */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-600 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtros y Fecha
            </CardTitle>
            <CardDescription>Personaliza tu búsqueda de clases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filtro de Dificultad */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <span className="mr-2">🎯</span>
                Nivel de Dificultad
              </Label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="Fácil">😊 Fácil - Principiante</SelectItem>
                  <SelectItem value="Medio">😐 Medio - Intermedio</SelectItem>
                  <SelectItem value="Difícil">😵 Difícil - Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de Horario */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Horario del Día
              </Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona horario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los horarios</SelectItem>
                  <SelectItem value="morning">🌅 Mañana (6:00 - 12:00)</SelectItem>
                  <SelectItem value="afternoon">☀️ Tarde (12:00 - 18:00)</SelectItem>
                  <SelectItem value="evening">🌙 Noche (18:00 - 22:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botón para limpiar filtros */}
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Limpiar Filtros
            </Button>

            {/* Calendario */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Selecciona una Fecha
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today
                }}
              />
              {date && (
                <div className="text-center p-3 bg-purple-50 rounded-md">
                  <p className="text-sm text-purple-600 font-medium">Fecha seleccionada:</p>
                  <p className="text-purple-800 font-bold">
                    {date.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Clases Disponibles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-purple-600 flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Clases Disponibles
              </CardTitle>
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                {filteredClasses.length} clases encontradas
              </Badge>
            </div>
            <CardDescription>
              {date ? (
                <>
                  Clases para el {date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                </>
              ) : (
                "Selecciona una fecha para ver las clases disponibles"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {date ? (
              filteredClasses.length > 0 ? (
                <div className="space-y-4">
                  {filteredClasses.map((cls) => (
                    <Card
                      key={cls.id}
                      className={`border transition-all cursor-pointer hover:shadow-md ${
                        selectedClass === cls.id ? "border-purple-500 ring-2 ring-purple-200" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedClass(cls.id === selectedClass ? null : cls.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                              <Badge className={getDifficultyBadgeColor(cls.difficulty)}>
                                {getDifficultyIcon(cls.difficulty)} {cls.difficulty}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span>{cls.instructor}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>
                                  {cls.time} - {cls.endTime}
                                </span>
                                <span className="ml-2">{getTimeSlotIcon(cls.timeSlot)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>{cls.location}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-2">👥</span>
                                <span className={cls.spots < 3 ? "text-red-600 font-bold" : ""}>
                                  {cls.spots} lugares disponibles
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <span className="mr-2">🔄</span>
                                <span>
                                  Modalidades: {cls.availableModes.includes("presencial") ? "Presencial" : ""}{" "}
                                  {cls.availableModes.includes("presencial") && cls.availableModes.includes("online")
                                    ? "y "
                                    : ""}
                                  {cls.availableModes.includes("online") ? "Online" : ""}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{cls.description}</p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                            <Button
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReserve(cls)
                              }}
                              disabled={cls.spots === 0}
                            >
                              {cls.spots === 0 ? "Completo" : "Reservar"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases disponibles</h3>
                  <p className="text-gray-500 mb-4">
                    No se encontraron clases con los filtros seleccionados para esta fecha.
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Limpiar Filtros
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona una fecha</h3>
                <p className="text-gray-500">Elige una fecha en el calendario para ver las clases disponibles.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Confirmación Mejorado */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Confirmar Reserva</DialogTitle>
            <DialogDescription>Revisa los detalles y confirma tu reserva</DialogDescription>
          </DialogHeader>

          {classToReserve && (
            <div className="space-y-6">
              {/* Detalles de la clase */}
              <div className="p-4 bg-purple-50 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Clase:</span>
                  <span className="font-bold text-purple-700">{classToReserve.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Instructor:</span>
                  <span>{classToReserve.instructor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Horario:</span>
                  <span>
                    {classToReserve.time} - {classToReserve.endTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ubicación:</span>
                  <span>{classToReserve.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Fecha:</span>
                  <span>{date?.toLocaleDateString("es-ES")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dificultad:</span>
                  <Badge className={getDifficultyBadgeColor(classToReserve.difficulty)}>
                    {getDifficultyIcon(classToReserve.difficulty)} {classToReserve.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Selector de modalidad (presencial/online) */}
              <div className="space-y-3">
                <Label className="font-medium">Selecciona la modalidad:</Label>
                <RadioGroup value={classMode} onValueChange={setClassMode} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="presencial"
                      id="presencial"
                      disabled={!classToReserve.availableModes.includes("presencial")}
                    />
                    <Label htmlFor="presencial" className="flex items-center cursor-pointer">
                      <MapPin className="mr-2 h-4 w-4" />
                      Presencial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="online"
                      id="online"
                      disabled={!classToReserve.availableModes.includes("online")}
                    />
                    <Label htmlFor="online" className="flex items-center cursor-pointer">
                      <Video className="mr-2 h-4 w-4" />
                      Online
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Switch para agregar recordatorio al calendario */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Agregar recordatorio al calendario</Label>
                  <p className="text-sm text-gray-500">Recibirás una notificación antes de la clase</p>
                </div>
                <Switch checked={addToCalendar} onCheckedChange={setAddToCalendar} />
              </div>

              {/* Selector de calendario si el switch está activado */}
              {addToCalendar && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="font-medium">Selecciona tu calendario:</Label>
                  <Tabs
                    defaultValue="google"
                    value={selectedCalendar}
                    onValueChange={setSelectedCalendar}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="google" className="flex items-center justify-center">
                        <span className="mr-2">🔵</span> Google
                      </TabsTrigger>
                      <TabsTrigger value="teams" className="flex items-center justify-center">
                        <span className="mr-2">🟣</span> Teams
                      </TabsTrigger>
                      <TabsTrigger value="ical" className="flex items-center justify-center">
                        <span className="mr-2">🟠</span> iCal
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}

              {/* Mapa para clases presenciales */}
              {classMode === "presencial" && (
                <div className="space-y-3">
                  <Label className="font-medium">Ubicación de la clase:</Label>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 p-2 text-sm">
                      <strong>Dirección:</strong> {classToReserve.address}
                    </div>
                    <div className="h-[200px] relative">
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${classToReserve.coordinates.lat},${classToReserve.coordinates.lng}&zoom=15&size=600x200&markers=color:red%7C${classToReserve.coordinates.lat},${classToReserve.coordinates.lng}&key=YOUR_API_KEY`}
                        alt="Mapa de ubicación"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
                        <div className="text-center p-4 bg-white rounded-lg shadow-md">
                          <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <p className="font-medium text-purple-700">{classToReserve.location}</p>
                          <p className="text-sm text-gray-600">{classToReserve.address}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${classToReserve.coordinates.lat},${classToReserve.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              Ver en Google Maps
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Información para clases online */}
              {classMode === "online" && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <Video className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-700">Información para clase online</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Recibirás un enlace de acceso por email 30 minutos antes de la clase.
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Asegúrate de tener una buena conexión a internet y un espacio tranquilo para tu práctica.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={confirmReservation}>
              Confirmar Reserva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
