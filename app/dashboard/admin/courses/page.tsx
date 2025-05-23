"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash, Plus } from "lucide-react"

export default function AdminCoursesPage() {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  // Datos de ejemplo para los cursos
  const courses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      instructor: "María González",
      schedule: "Lunes y Miércoles, 9:00 - 10:30",
      capacity: 15,
      description: "Clase ideal para personas que se inician en la práctica del yoga.",
      status: "active",
    },
    {
      id: 2,
      title: "Hatha Yoga",
      instructor: "Carlos Rodríguez",
      schedule: "Martes y Jueves, 18:00 - 19:30",
      capacity: 12,
      description: "Práctica tradicional de Hatha Yoga con enfoque en posturas y respiración.",
      status: "active",
    },
    {
      id: 3,
      title: "Meditación Guiada",
      instructor: "Ana López",
      schedule: "Viernes, 17:00 - 18:00",
      capacity: 20,
      description: "Sesiones de meditación guiada para reducir el estrés y mejorar la concentración.",
      status: "active",
    },
    {
      id: 4,
      title: "Yoga Restaurativo",
      instructor: "Laura Martínez",
      schedule: "Sábados, 10:00 - 11:30",
      capacity: 10,
      description: "Práctica suave y reparadora ideal para recuperarse de lesiones o estrés.",
      status: "inactive",
    },
  ]

  // Datos de ejemplo para los instructores
  const instructors = [
    { id: 1, name: "María González" },
    { id: 2, name: "Carlos Rodríguez" },
    { id: 3, name: "Ana López" },
    { id: 4, name: "Laura Martínez" },
  ]

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para agregar un curso
    alert("Curso agregado con éxito")
    setIsAddCourseOpen(false)
  }

  const handleEditCourse = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para editar un curso
    alert(`Curso ${selectedCourse} editado con éxito`)
    setIsEditCourseOpen(false)
    setSelectedCourse(null)
  }

  const handleDeleteCourse = (courseId: number) => {
    // Aquí iría la lógica para eliminar un curso
    if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      alert(`Curso ${courseId} eliminado con éxito`)
    }
  }

  return (
    <div className="md:ml-64 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Gestión de Cursos</h1>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAddCourseOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Curso
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active">Cursos Activos</TabsTrigger>
          <TabsTrigger value="inactive">Cursos Inactivos</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-4">
            {courses
              .filter((course) => course.status === "active")
              .map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-purple-600">{course.title}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                          <p className="text-sm text-gray-500">Horario: {course.schedule}</p>
                          <p className="text-sm text-gray-500">Capacidad: {course.capacity} personas</p>
                          <p className="text-sm text-gray-500">Descripción: {course.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => {
                            setSelectedCourse(course.id)
                            setIsEditCourseOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive">
          <div className="space-y-4">
            {courses
              .filter((course) => course.status === "inactive")
              .map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-500">{course.title}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                          <p className="text-sm text-gray-500">Horario: {course.schedule}</p>
                          <p className="text-sm text-gray-500">Capacidad: {course.capacity} personas</p>
                          <p className="text-sm text-gray-500">Descripción: {course.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                          Activar
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para agregar curso */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Agregar Nuevo Curso</DialogTitle>
            <DialogDescription>Completa el formulario para crear un nuevo curso.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCourse}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Curso</Label>
                <Input id="title" placeholder="Ej. Yoga para principiantes" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.name}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Horario</Label>
                <Input id="schedule" placeholder="Ej. Lunes y Miércoles, 9:00 - 10:30" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input id="capacity" type="number" min="1" placeholder="Ej. 15" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe el curso..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Guardar Curso
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar curso */}
      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Editar Curso</DialogTitle>
            <DialogDescription>Modifica la información del curso.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCourse}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título del Curso</Label>
                <Input
                  id="edit-title"
                  defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.title : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-instructor">Instructor</Label>
                <Select defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.instructor : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.name}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-schedule">Horario</Label>
                <Input
                  id="edit-schedule"
                  defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.schedule : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacidad</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  min="1"
                  defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.capacity : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.description : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select defaultValue={selectedCourse ? courses.find((c) => c.id === selectedCourse)?.status : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditCourseOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Guardar Cambios
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
