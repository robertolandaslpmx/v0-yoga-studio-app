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
  Search,
  Filter,
  User,
  Star,
  Calendar,
  Clock,
  ArrowUpRight,
  FileText,
  BarChart,
  MessageSquare,
  Download,
  Mail,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Datos de ejemplo para los estudiantes
  const students = [
    {
      id: 1,
      name: "Ana García",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "ana.garcia@ejemplo.com",
      phone: "555-123-4567",
      level: "Intermedio",
      joinDate: "15/01/2023",
      attendance: 92,
      classes: 24,
      lastClass: "Hatha Yoga - 20/05/2023",
      nextClass: "Vinyasa Flow - 25/05/2023",
      progress: [
        { skill: "Flexibilidad", level: 75 },
        { skill: "Fuerza", level: 60 },
        { skill: "Equilibrio", level: 80 },
        { skill: "Respiración", level: 85 },
      ],
      notes:
        "Excelente progreso en posturas de equilibrio. Necesita trabajar en la fuerza de brazos para posturas invertidas.",
      preferredClasses: ["Hatha Yoga", "Vinyasa Flow"],
      medicalInfo: "Lesión leve en rodilla derecha. Evitar presión excesiva.",
    },
    {
      id: 2,
      name: "Carlos López",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "carlos.lopez@ejemplo.com",
      phone: "555-234-5678",
      level: "Principiante",
      joinDate: "03/03/2023",
      attendance: 85,
      classes: 12,
      lastClass: "Yoga para Principiantes - 19/05/2023",
      nextClass: "Hatha Yoga - 24/05/2023",
      progress: [
        { skill: "Flexibilidad", level: 40 },
        { skill: "Fuerza", level: 55 },
        { skill: "Equilibrio", level: 35 },
        { skill: "Respiración", level: 60 },
      ],
      notes: "Progresando bien para ser principiante. Muestra interés en aprender técnicas de respiración avanzadas.",
      preferredClasses: ["Yoga para Principiantes", "Meditación"],
      medicalInfo: "Sin condiciones médicas relevantes.",
    },
    {
      id: 3,
      name: "María Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "maria.rodriguez@ejemplo.com",
      phone: "555-345-6789",
      level: "Avanzado",
      joinDate: "10/10/2022",
      attendance: 98,
      classes: 45,
      lastClass: "Ashtanga Yoga - 21/05/2023",
      nextClass: "Power Yoga - 23/05/2023",
      progress: [
        { skill: "Flexibilidad", level: 90 },
        { skill: "Fuerza", level: 85 },
        { skill: "Equilibrio", level: 95 },
        { skill: "Respiración", level: 90 },
      ],
      notes: "Nivel excepcional en todas las áreas. Considerar invitarla al programa de formación de instructores.",
      preferredClasses: ["Ashtanga Yoga", "Power Yoga", "Vinyasa Flow"],
      medicalInfo: "Sin condiciones médicas relevantes.",
    },
    {
      id: 4,
      name: "Juan Pérez",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "juan.perez@ejemplo.com",
      phone: "555-456-7890",
      level: "Intermedio",
      joinDate: "05/12/2022",
      attendance: 78,
      classes: 18,
      lastClass: "Vinyasa Flow - 18/05/2023",
      nextClass: "Hatha Yoga - 26/05/2023",
      progress: [
        { skill: "Flexibilidad", level: 65 },
        { skill: "Fuerza", level: 75 },
        { skill: "Equilibrio", level: 60 },
        { skill: "Respiración", level: 70 },
      ],
      notes: "Buena fuerza pero necesita mejorar flexibilidad. Recomendar práctica adicional de estiramientos.",
      preferredClasses: ["Vinyasa Flow", "Power Yoga"],
      medicalInfo: "Tensión baja ocasional. Vigilar en posturas invertidas.",
    },
    {
      id: 5,
      name: "Laura Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "laura.martinez@ejemplo.com",
      phone: "555-567-8901",
      level: "Principiante",
      joinDate: "20/04/2023",
      attendance: 90,
      classes: 8,
      lastClass: "Yoga Restaurativo - 20/05/2023",
      nextClass: "Yoga para Principiantes - 24/05/2023",
      progress: [
        { skill: "Flexibilidad", level: 50 },
        { skill: "Fuerza", level: 30 },
        { skill: "Equilibrio", level: 45 },
        { skill: "Respiración", level: 65 },
      ],
      notes: "Muy comprometida con su práctica. Excelente actitud y disposición para aprender.",
      preferredClasses: ["Yoga Restaurativo", "Yoga para Principiantes", "Meditación"],
      medicalInfo: "Embarazo de 4 meses. Adaptar posturas según sea necesario.",
    },
  ]

  // Filtrar estudiantes según los criterios seleccionados
  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const levelMatch = selectedLevel === "all" || student.level === selectedLevel
    return nameMatch && levelMatch
  })

  // Función para ver detalles del estudiante
  const viewStudentDetails = (student: any) => {
    setSelectedStudent(student)
  }

  // Función para obtener el color del nivel
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Principiante":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermedio":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Avanzado":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="md:ml-64 pb-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Mis Alumnos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de filtros y lista de estudiantes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-purple-600 flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar alumno..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nivel</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Clase</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar clase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las clases</SelectItem>
                    <SelectItem value="hatha">Hatha Yoga</SelectItem>
                    <SelectItem value="vinyasa">Vinyasa Flow</SelectItem>
                    <SelectItem value="principiantes">Yoga para Principiantes</SelectItem>
                    <SelectItem value="restaurativo">Yoga Restaurativo</SelectItem>
                    <SelectItem value="meditacion">Meditación</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedLevel("all")
                  setSelectedClass("all")
                }}
              >
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>

          {/* Lista de estudiantes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-purple-600 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Alumnos ({filteredStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedStudent?.id === student.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
                      }`}
                      onClick={() => viewStudentDetails(student)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className="bg-purple-200 text-purple-700">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{student.name}</h3>
                            <Badge className={getLevelColor(student.level)}>{student.level}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            Asistencia: {student.attendance}% ({student.classes} clases)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <User className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No se encontraron alumnos con los filtros seleccionados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de detalles del estudiante */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} alt={selectedStudent.name} />
                      <AvatarFallback className="bg-purple-200 text-purple-700">
                        {selectedStudent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl font-bold text-purple-600">{selectedStudent.name}</CardTitle>
                      <CardDescription>
                        Alumno desde {selectedStudent.joinDate} • {selectedStudent.classes} clases
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getLevelColor(selectedStudent.level)}>{selectedStudent.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="progress">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="progress">Progreso</TabsTrigger>
                    <TabsTrigger value="attendance">Asistencia</TabsTrigger>
                    <TabsTrigger value="notes">Notas</TabsTrigger>
                    <TabsTrigger value="info">Información</TabsTrigger>
                  </TabsList>

                  <TabsContent value="progress">
                    <div className="space-y-6">
                      {/* Gráfico de progreso */}
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                          Progreso por Habilidades
                        </h3>
                        <div className="space-y-4">
                          {selectedStudent.progress.map((skill) => (
                            <div key={skill.skill} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{skill.skill}</span>
                                <span className="font-medium">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Clases preferidas */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <Star className="h-5 w-5 mr-2 text-purple-500" />
                          Clases Preferidas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.preferredClasses.map((cls) => (
                            <Badge key={cls} variant="outline" className="bg-purple-50">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Próxima y última clase */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <h4 className="font-medium text-green-700 flex items-center mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            Próxima Clase
                          </h4>
                          <p className="text-green-600">{selectedStudent.nextClass}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-blue-700 flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            Última Clase
                          </h4>
                          <p className="text-blue-600">{selectedStudent.lastClass}</p>
                        </div>
                      </div>

                      {/* Recomendaciones */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <h3 className="font-medium text-purple-700 flex items-center mb-2">
                          <ArrowUpRight className="h-5 w-5 mr-2" />
                          Recomendaciones para Avanzar
                        </h3>
                        <ul className="space-y-2 text-sm text-purple-600">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              {selectedStudent.level === "Principiante"
                                ? "Enfocarse en la alineación básica y respiración consciente"
                                : selectedStudent.level === "Intermedio"
                                  ? "Trabajar en posturas más desafiantes y secuencias fluidas"
                                  : "Profundizar en técnicas avanzadas y considerar formación como instructor"}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              {selectedStudent.progress.find((p) => p.skill === "Flexibilidad")?.level < 60
                                ? "Aumentar práctica de estiramientos para mejorar flexibilidad"
                                : "Mantener rutina de flexibilidad"}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              {selectedStudent.progress.find((p) => p.skill === "Fuerza")?.level < 60
                                ? "Incorporar ejercicios de fortalecimiento para mejorar estabilidad"
                                : "Continuar con práctica de fortalecimiento"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="attendance">
                    <div className="space-y-6">
                      {/* Estadísticas de asistencia */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                          <h4 className="text-sm text-gray-500 mb-1">Porcentaje de Asistencia</h4>
                          <p className="text-3xl font-bold text-purple-600">{selectedStudent.attendance}%</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                          <h4 className="text-sm text-gray-500 mb-1">Clases Asistidas</h4>
                          <p className="text-3xl font-bold text-purple-600">{selectedStudent.classes}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                          <h4 className="text-sm text-gray-500 mb-1">Clases Perdidas</h4>
                          <p className="text-3xl font-bold text-purple-600">
                            {Math.round(selectedStudent.classes * (1 - selectedStudent.attendance / 100))}
                          </p>
                        </div>
                      </div>

                      {/* Historial de asistencia */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700">Historial de Asistencia Reciente</h3>
                        <div className="bg-white rounded-lg border overflow-hidden">
                          <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                            <div className="col-span-5 font-medium">Clase</div>
                            <div className="col-span-3 font-medium">Fecha</div>
                            <div className="col-span-2 font-medium">Hora</div>
                            <div className="col-span-2 font-medium text-right">Estado</div>
                          </div>
                          <div className="divide-y max-h-60 overflow-y-auto">
                            {/* Ejemplos de asistencia */}
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Hatha Yoga</div>
                              <div className="col-span-3 text-sm">20/05/2023</div>
                              <div className="col-span-2 text-sm">10:30 AM</div>
                              <div className="col-span-2 text-right">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Asistió</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Vinyasa Flow</div>
                              <div className="col-span-3 text-sm">18/05/2023</div>
                              <div className="col-span-2 text-sm">18:00 PM</div>
                              <div className="col-span-2 text-right">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Asistió</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Yoga Restaurativo</div>
                              <div className="col-span-3 text-sm">15/05/2023</div>
                              <div className="col-span-2 text-sm">19:00 PM</div>
                              <div className="col-span-2 text-right">
                                <Badge className="bg-red-100 text-red-800 border-red-200">Faltó</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Hatha Yoga</div>
                              <div className="col-span-3 text-sm">13/05/2023</div>
                              <div className="col-span-2 text-sm">10:30 AM</div>
                              <div className="col-span-2 text-right">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Asistió</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Meditación</div>
                              <div className="col-span-3 text-sm">10/05/2023</div>
                              <div className="col-span-2 text-sm">17:00 PM</div>
                              <div className="col-span-2 text-right">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Asistió</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="bg-purple-600 hover:bg-purple-700 flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar Reporte Completo
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex-1"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Recordatorio
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes">
                    <div className="space-y-6">
                      {/* Notas del instructor */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-500" />
                          Notas del Instructor
                        </h3>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-purple-700">{selectedStudent.notes}</p>
                        </div>
                      </div>

                      {/* Información médica */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700">Información Médica Relevante</h3>
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <p className="text-amber-700">{selectedStudent.medicalInfo}</p>
                        </div>
                      </div>

                      {/* Formulario para agregar notas */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700">Agregar Nueva Nota</h3>
                        <div className="space-y-3">
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows={4}
                            placeholder="Escribe una nueva nota sobre el progreso del alumno..."
                          ></textarea>
                          <Button className="bg-purple-600 hover:bg-purple-700">Guardar Nota</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="info">
                    <div className="space-y-6">
                      {/* Información de contacto */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700">Información de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedStudent.email}</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <p className="font-medium">{selectedStudent.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Historial de clases en otras disciplinas */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700">Historial en Otras Disciplinas</h3>
                        <div className="bg-white rounded-lg border overflow-hidden">
                          <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                            <div className="col-span-5 font-medium">Disciplina</div>
                            <div className="col-span-3 font-medium">Instructor</div>
                            <div className="col-span-2 font-medium">Nivel</div>
                            <div className="col-span-2 font-medium text-right">Clases</div>
                          </div>
                          <div className="divide-y">
                            {/* Ejemplos de otras disciplinas */}
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Pilates</div>
                              <div className="col-span-3">Laura Sánchez</div>
                              <div className="col-span-2">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Intermedio</Badge>
                              </div>
                              <div className="col-span-2 text-right font-medium">8</div>
                            </div>
                            <div className="grid grid-cols-12 p-3 items-center">
                              <div className="col-span-5">Meditación</div>
                              <div className="col-span-3">Carlos Mendoza</div>
                              <div className="col-span-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200">Principiante</Badge>
                              </div>
                              <div className="col-span-2 text-right font-medium">5</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="bg-purple-600 hover:bg-purple-700 flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Enviar Mensaje
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex-1"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Exportar Perfil
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Ver Historial Completo
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Actualizar Progreso</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Selecciona un alumno</h3>
                <p className="text-gray-500 mb-6">
                  Selecciona un alumno de la lista para ver su información detallada, progreso y asistencia.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">Ver Todos los Alumnos</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
