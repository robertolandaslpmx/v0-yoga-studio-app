"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash, Plus, User } from "lucide-react"

export default function AdminTeachersPage() {
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null)

  // Datos de ejemplo para los maestros
  const teachers = [
    {
      id: 1,
      name: "María González",
      email: "maria@ejemplo.com",
      phone: "555-123-4567",
      specialties: "Yoga para principiantes, Hatha Yoga",
      bio: "María es instructora certificada con más de 10 años de experiencia en yoga.",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos@ejemplo.com",
      phone: "555-234-5678",
      specialties: "Hatha Yoga, Yoga Avanzado",
      bio: "Carlos se especializa en técnicas avanzadas de yoga y ha enseñado en varios estudios reconocidos.",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Ana López",
      email: "ana@ejemplo.com",
      phone: "555-345-6789",
      specialties: "Meditación, Mindfulness",
      bio: "Ana es experta en técnicas de meditación y mindfulness, con formación en India y Nepal.",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Laura Martínez",
      email: "laura@ejemplo.com",
      phone: "555-456-7890",
      specialties: "Yoga Restaurativo, Yoga Terapéutico",
      bio: "Laura se especializa en yoga terapéutico y restaurativo, ideal para personas en recuperación.",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para agregar un maestro
    alert("Maestro agregado con éxito")
    setIsAddTeacherOpen(false)
  }

  const handleEditTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para editar un maestro
    alert(`Maestro ${selectedTeacher} editado con éxito`)
    setIsEditTeacherOpen(false)
    setSelectedTeacher(null)
  }

  const handleDeleteTeacher = (teacherId: number) => {
    // Aquí iría la lógica para eliminar un maestro
    if (confirm("¿Estás seguro de que deseas eliminar este maestro?")) {
      alert(`Maestro ${teacherId} eliminado con éxito`)
    }
  }

  return (
    <div className="md:ml-64 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Gestión de Maestros</h1>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAddTeacherOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Maestro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                  <AvatarFallback className="bg-purple-200 text-purple-700">
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-purple-600">{teacher.name}</h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-500">Email: {teacher.email}</p>
                    <p className="text-sm text-gray-500">Teléfono: {teacher.phone}</p>
                    <p className="text-sm text-gray-500">Especialidades: {teacher.specialties}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">Bio: {teacher.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => {
                      setSelectedTeacher(teacher.id)
                      setIsEditTeacherOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diálogo para agregar maestro */}
      <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Agregar Nuevo Maestro</DialogTitle>
            <DialogDescription>Completa el formulario para agregar un nuevo maestro.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTeacher}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" placeholder="Nombre del maestro" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="Número de teléfono" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties">Especialidades</Label>
                <Input id="specialties" placeholder="Ej. Hatha Yoga, Meditación" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea id="bio" placeholder="Breve biografía del maestro..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Foto de Perfil</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Guardar Maestro
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar maestro */}
      <Dialog open={isEditTeacherOpen} onOpenChange={setIsEditTeacherOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600">Editar Maestro</DialogTitle>
            <DialogDescription>Modifica la información del maestro.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditTeacher}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre Completo</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedTeacher ? teachers.find((t) => t.id === selectedTeacher)?.name : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Correo Electrónico</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedTeacher ? teachers.find((t) => t.id === selectedTeacher)?.email : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Teléfono</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedTeacher ? teachers.find((t) => t.id === selectedTeacher)?.phone : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-specialties">Especialidades</Label>
                <Input
                  id="edit-specialties"
                  defaultValue={selectedTeacher ? teachers.find((t) => t.id === selectedTeacher)?.specialties : ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bio">Biografía</Label>
                <Textarea
                  id="edit-bio"
                  defaultValue={selectedTeacher ? teachers.find((t) => t.id === selectedTeacher)?.bio : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Foto de Perfil</Label>
                <Input id="edit-image" type="file" accept="image/*" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditTeacherOpen(false)}>
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
