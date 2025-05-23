"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Clock } from "lucide-react"

export default function TeacherSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Datos de ejemplo para las clases programadas
  const scheduledClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      time: "09:00 - 10:30",
      location: "Sala Principal",
      students: 12,
      maxCapacity: 15,
    },
    {
      id: 2,
      title: "Hatha Yoga",
      time: "12:00 - 13:30",
      location: "Sala Principal",
      students: 10,
      maxCapacity: 12,
    },
    {
      id: 3,
      title: "Meditación Guiada",
      time: "17:00 - 18:00",
      location: "Sala de Meditación",
      students: 15,
      maxCapacity: 20,
    },
  ]

  // Función para formatear la fecha seleccionada
  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="md:ml-64 pb-20 md:pb-0">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Mi Horario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-600">Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" initialFocus />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-600">
              Clases para {date ? formatDate(date) : "Hoy"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledClasses.length > 0 ? (
              <div className="space-y-4">
                {scheduledClasses.map((cls) => (
                  <Card key={cls.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-2 h-4 w-4" />
                              {cls.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="mr-2 h-4 w-4" />
                              {cls.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="mr-2 h-4 w-4" />
                              {cls.students} / {cls.maxCapacity} estudiantes
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                          <Badge
                            className={`${
                              cls.students === cls.maxCapacity
                                ? "bg-orange-100 text-orange-800 border-orange-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }`}
                          >
                            {cls.students === cls.maxCapacity ? "Completo" : "Disponible"}
                          </Badge>
                          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Ver Detalles</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-600">No hay clases programadas para este día</h3>
                <p className="text-sm text-gray-500 mt-2">Selecciona otra fecha o programa una nueva clase</p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Solicitar Horario</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-600">Resumen Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Día</th>
                  <th className="text-left py-3 px-4">Clases</th>
                  <th className="text-left py-3 px-4">Horas</th>
                  <th className="text-left py-3 px-4">Estudiantes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Lunes</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">25</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Martes</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1.5</td>
                  <td className="py-3 px-4">12</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Miércoles</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">22</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Jueves</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1.5</td>
                  <td className="py-3 px-4">10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Viernes</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">18</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-purple-50">
                  <td className="py-3 px-4 font-bold">Total</td>
                  <td className="py-3 px-4 font-bold">8</td>
                  <td className="py-3 px-4 font-bold">11</td>
                  <td className="py-3 px-4 font-bold">87</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
