"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, MapPin, User, Clock, Video, Users, Star, AlertTriangle } from "lucide-react"

export default function MyClassesPage() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [classToCancel, setClassToCancel] = useState<any>(null)
  const [cancelReason, setCancelReason] = useState("")
  const [cancelCategory, setCancelCategory] = useState("")
  const [additionalComments, setAdditionalComments] = useState("")

  // Datos de ejemplo para las clases con información completa
  const upcomingClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      instructor: {
        name: "María González",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.8,
        specialties: ["Hatha Yoga", "Yoga para principiantes"],
      },
      date: "Hoy, 18:00 - 19:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      status: "confirmed",
      difficulty: "Fácil",
      mode: "presencial",
      availableModes: ["presencial", "online"],
      spots: 15,
      enrolled: 12,
      description: "Clase ideal para personas que se inician en la práctica del yoga.",
      equipment: ["Mat de yoga", "Bloque de yoga", "Correa"],
      duration: "90 minutos",
    },
    {
      id: 2,
      title: "Meditación Guiada",
      instructor: {
        name: "Ana López",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.9,
        specialties: ["Meditación", "Mindfulness", "Yoga Nidra"],
      },
      date: "Mañana, 10:00 - 11:00",
      location: "Online",
      address: "Sesión virtual",
      coordinates: null,
      status: "confirmed",
      difficulty: "Fácil",
      mode: "online",
      availableModes: ["online"],
      spots: 20,
      enrolled: 15,
      description: "Sesiones de meditación guiada para reducir el estrés y mejorar la concentración.",
      equipment: ["Cojín de meditación (opcional)", "Manta"],
      duration: "60 minutos",
    },
    {
      id: 3,
      title: "Hatha Yoga Intermedio",
      instructor: {
        name: "Carlos Rodríguez",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.7,
        specialties: ["Hatha Yoga", "Ashtanga Yoga", "Power Yoga"],
      },
      date: "Miércoles, 17:00 - 18:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      status: "confirmed",
      difficulty: "Medio",
      mode: "presencial",
      availableModes: ["presencial", "online"],
      spots: 12,
      enrolled: 10,
      description: "Práctica tradicional de Hatha Yoga con enfoque en posturas y respiración.",
      equipment: ["Mat de yoga", "Bloque de yoga", "Correa", "Manta"],
      duration: "90 minutos",
    },
  ]

  const pastClasses = [
    {
      id: 4,
      title: "Yoga Restaurativo",
      instructor: {
        name: "Laura Martínez",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.6,
        specialties: ["Yoga Restaurativo", "Yin Yoga", "Terapia de Yoga"],
      },
      date: "Lunes, 19:00 - 20:30",
      location: "Sala de Meditación",
      address: "Av. Principal #123, Piso 1",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      status: "completed",
      difficulty: "Fácil",
      mode: "presencial",
      availableModes: ["presencial"],
      spots: 10,
      enrolled: 8,
      description: "Práctica suave y reparadora ideal para recuperarse de lesiones o estrés.",
      equipment: ["Mat de yoga", "Bolster", "Manta", "Bloques"],
      duration: "90 minutos",
      feedback: {
        rating: 5,
        comment: "Excelente clase, muy relajante",
      },
    },
    {
      id: 5,
      title: "Meditación Guiada",
      instructor: {
        name: "Ana López",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.9,
        specialties: ["Meditación", "Mindfulness", "Yoga Nidra"],
      },
      date: "Viernes, 10:00 - 11:00",
      location: "Online",
      address: "Sesión virtual",
      coordinates: null,
      status: "completed",
      difficulty: "Fácil",
      mode: "online",
      availableModes: ["online"],
      spots: 20,
      enrolled: 15,
      description: "Sesiones de meditación guiada para reducir el estrés y mejorar la concentración.",
      equipment: ["Cojín de meditación (opcional)", "Manta"],
      duration: "60 minutos",
      feedback: {
        rating: 4,
        comment: "Muy buena sesión de meditación",
      },
    },
    {
      id: 6,
      title: "Yoga para principiantes",
      instructor: {
        name: "María González",
        photo: "/placeholder.svg?height=60&width=60",
        rating: 4.8,
        specialties: ["Hatha Yoga", "Yoga para principiantes"],
      },
      date: "Jueves, 09:00 - 10:30",
      location: "Sala Principal",
      address: "Av. Principal #123, Piso 2",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      status: "missed",
      difficulty: "Fácil",
      mode: "presencial",
      availableModes: ["presencial", "online"],
      spots: 15,
      enrolled: 12,
      description: "Clase ideal para personas que se inician en la práctica del yoga.",
      equipment: ["Mat de yoga", "Bloque de yoga", "Correa"],
      duration: "90 minutos",
    },
  ]

  const cancelReasons = [
    { value: "emergency", label: "Emergencia personal" },
    { value: "illness", label: "Enfermedad" },
    { value: "work", label: "Compromiso laboral" },
    { value: "family", label: "Asunto familiar" },
    { value: "schedule", label: "Cambio de horario" },
    { value: "other", label: "Otro motivo" },
  ]

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

  const handleCancelClass = (cls: any) => {
    setClassToCancel(cls)
    setIsCancelModalOpen(true)
  }

  const confirmCancellation = () => {
    if (!cancelCategory) {
      alert("Por favor selecciona un motivo de cancelación")
      return
    }

    // Aquí iría la lógica para cancelar la clase
    let message = `Clase "${classToCancel?.title}" cancelada con éxito.`
    message += `\nMotivo: ${cancelReasons.find((r) => r.value === cancelCategory)?.label}`
    if (additionalComments) {
      message += `\nComentarios: ${additionalComments}`
    }

    alert(message)

    // Limpiar el formulario
    setCancelCategory("")
    setAdditionalComments("")
    setIsCancelModalOpen(false)
    setClassToCancel(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const ClassCard = ({ cls, isPast = false }: { cls: any; isPast?: boolean }) => (
    <Card
      className={`border transition-all cursor-pointer hover:shadow-md ${
        selectedClass === cls.id ? "border-purple-500 ring-2 ring-purple-200" : "border-gray-200"
      }`}
      onClick={() => setSelectedClass(cls.id === selectedClass ? null : cls.id)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header con título y badges */}
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                <div className="flex gap-2">
                  <Badge className={getDifficultyBadgeColor(cls.difficulty)}>
                    {getDifficultyIcon(cls.difficulty)} {cls.difficulty}
                  </Badge>
                  {isPast && (
                    <Badge
                      className={`${
                        cls.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {cls.status === "completed" ? "Completada" : "No asistida"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Información del instructor */}
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={cls.instructor.photo || "/placeholder.svg"} alt={cls.instructor.name} />
              <AvatarFallback className="bg-purple-200 text-purple-700">
                {cls.instructor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-purple-700">{cls.instructor.name}</h4>
                <div className="flex items-center space-x-1">
                  {renderStars(cls.instructor.rating)}
                  <span className="text-sm text-gray-600">({cls.instructor.rating})</span>
                </div>
              </div>
              <p className="text-sm text-purple-600">{cls.instructor.specialties.join(", ")}</p>
            </div>
          </div>

          {/* Información de la clase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{cls.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2 h-4 w-4" />
                <span>{cls.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                {cls.mode === "online" ? <Video className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                <span>{cls.location}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {cls.mode === "online" ? "Online" : "Presencial"}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                <span>
                  {cls.enrolled} / {cls.spots} participantes
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Equipamiento:</span>
                <p className="text-gray-600">{cls.equipment.join(", ")}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Modalidades:</span>
                <p className="text-gray-600">
                  {cls.availableModes.includes("presencial") ? "Presencial" : ""}{" "}
                  {cls.availableModes.includes("presencial") && cls.availableModes.includes("online") ? "y " : ""}
                  {cls.availableModes.includes("online") ? "Online" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{cls.description}</div>

          {/* Mapa para clases presenciales */}
          {cls.mode === "presencial" && cls.coordinates && (
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">Ubicación:</h5>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-100 p-2 text-sm">
                  <strong>Dirección:</strong> {cls.address}
                </div>
                <div className="h-[150px] relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center p-4 bg-white rounded-lg shadow-md">
                      <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium text-purple-700">{cls.location}</p>
                      <p className="text-sm text-gray-600">{cls.address}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${cls.coordinates.lat},${cls.coordinates.lng}`}
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

          {/* Feedback para clases pasadas */}
          {isPast && cls.feedback && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-700 mb-2">Tu valoración:</h5>
              <div className="flex items-center space-x-2 mb-1">
                {renderStars(cls.feedback.rating)}
                <span className="text-sm text-blue-600">({cls.feedback.rating}/5)</span>
              </div>
              <p className="text-sm text-blue-600">"{cls.feedback.comment}"</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end pt-2">
            {!isPast ? (
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancelClass(cls)
                }}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Cancelar Clase
              </Button>
            ) : cls.status === "completed" && !cls.feedback ? (
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={(e) => {
                  e.stopPropagation()
                  // Aquí iría la lógica para valorar la clase
                  alert("Función de valoración próximamente")
                }}
              >
                <Star className="mr-2 h-4 w-4" />
                Valorar Clase
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="md:ml-64 pb-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Mis Clases</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Próximas Clases</TabsTrigger>
          <TabsTrigger value="past">Clases Pasadas</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingClasses.length > 0 ? (
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No tienes clases próximas programadas.</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Reservar una Clase</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastClasses.length > 0 ? (
            <div className="space-y-4">
              {pastClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} isPast={true} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No tienes historial de clases pasadas.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal de Cancelación */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
              Cancelar Clase
            </DialogTitle>
            <DialogDescription>
              Lamentamos que no puedas asistir. Por favor, ayúdanos a entender el motivo de tu cancelación.
            </DialogDescription>
          </DialogHeader>

          {classToCancel && (
            <div className="space-y-6">
              {/* Información de la clase a cancelar */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-700 mb-2">Clase a cancelar:</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Título:</strong> {classToCancel.title}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {classToCancel.instructor.name}
                  </p>
                  <p>
                    <strong>Fecha y hora:</strong> {classToCancel.date}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {classToCancel.location}
                  </p>
                </div>
              </div>

              {/* Selector de motivo */}
              <div className="space-y-3">
                <Label className="font-medium">Motivo de la cancelación *</Label>
                <RadioGroup value={cancelCategory} onValueChange={setCancelCategory}>
                  {cancelReasons.map((reason) => (
                    <div key={reason.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={reason.value} id={reason.value} />
                      <Label htmlFor={reason.value} className="cursor-pointer">
                        {reason.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Comentarios adicionales */}
              <div className="space-y-3">
                <Label htmlFor="comments" className="font-medium">
                  Comentarios adicionales (opcional)
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Si seleccionaste 'Otro motivo' o quieres agregar más detalles, escríbelos aquí..."
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Información sobre políticas */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-700 mb-2">Política de cancelación:</h5>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Cancelaciones con más de 24h: Sin penalización</li>
                  <li>• Cancelaciones con menos de 24h: Se aplicará cargo del 50%</li>
                  <li>• Cancelaciones por emergencia médica: Sin cargo (requiere justificante)</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setIsCancelModalOpen(false)
                setCancelCategory("")
                setAdditionalComments("")
              }}
            >
              Mantener Reserva
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={confirmCancellation} disabled={!cancelCategory}>
              Confirmar Cancelación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
