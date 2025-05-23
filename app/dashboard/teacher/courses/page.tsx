"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export default function TeacherCoursesPage() {
  // Datos de ejemplo para los cursos
  const activeCourses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      schedule: "Lunes y Miércoles, 9:00 - 10:30",
      location: "Sala Principal",
      students: 12,
      maxCapacity: 15,
    },
    {
      id: 2,
      title: "Hatha Yoga",
      schedule: "Martes y Jueves, 18:00 - 19:30",
      location: "Sala Principal",
      students: 10,
      maxCapacity: 12,
    },
    {
      id: 3,
      title: "Meditación Guiada",
      schedule: "Viernes, 17:00 - 18:00",
      location: "Sala de Meditación",
      students: 15,
      maxCapacity: 20,
    },
  ]

  const pastCourses = [
    {
      id: 4,
      title: "Yoga Restaurativo",
      schedule: "Enero - Marzo 2023",
      location: "Sala Principal",
      students: 8,
      maxCapacity: 10,
    },
    {
      id: 5,
      title: "Introducción al Yoga",
      schedule: "Octubre - Diciembre 2022",
      location: "Sala Principal",
      students: 15,
      maxCapacity: 15,
    },
  ]

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  return (
    <div className="md:ml-64 pb-20 md:pb-0">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Mis Cursos</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active">Cursos Activos</TabsTrigger>
          <TabsTrigger value="past">Cursos Pasados</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {activeCourses.map((course) => (
              <Card
                key={course.id}
                className={`${
                  selectedCourse === course.id ? "border-purple-500 ring-2 ring-purple-200" : ""
                } cursor-pointer hover:border-purple-300 transition-all`}
                onClick={() => setSelectedCourse(course.id === selectedCourse ? null : course.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-purple-600">{course.title}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-2 h-4 w-4" />
                          {course.schedule}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-2 h-4 w-4" />
                          {course.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-2 h-4 w-4" />
                          {course.students} / {course.maxCapacity} estudiantes
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <Badge
                        className={`${
                          course.students === course.maxCapacity
                            ? "bg-orange-100 text-orange-800 border-orange-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        {course.students === course.maxCapacity ? "Completo" : "Disponible"}
                      </Badge>
                    </div>
                  </div>

                  {selectedCourse === course.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button className="bg-purple-600 hover:bg-purple-700">Ver Lista de Estudiantes</Button>
                        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                          Enviar Mensaje a la Clase
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {pastCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-600">{course.title}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2 h-4 w-4" />
                          {course.schedule}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-2 h-4 w-4" />
                          {course.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-2 h-4 w-4" />
                          {course.students} / {course.maxCapacity} estudiantes
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                        Ver Historial
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
