import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeacherDashboard() {
  // Datos de ejemplo para las próximas clases
  const upcomingClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      date: "Hoy, 18:00 - 19:30",
      location: "Sala Principal",
      students: 12,
    },
    {
      id: 2,
      title: "Meditación Guiada",
      date: "Mañana, 10:00 - 11:00",
      location: "Sala de Meditación",
      students: 8,
    },
    {
      id: 3,
      title: "Hatha Yoga",
      date: "Miércoles, 17:00 - 18:30",
      location: "Sala Principal",
      students: 15,
    },
  ]

  return (
    <div className="md:ml-64 pb-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Bienvenido, Maestro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Clases Programadas</CardTitle>
            <CardDescription>Total de clases esta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Estudiantes</CardTitle>
            <CardDescription>Total de estudiantes en tus clases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Horas Impartidas</CardTitle>
            <CardDescription>Este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">32</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold text-purple-600 mb-4">Tus Próximas Clases</h2>

      <div className="space-y-4 mb-8">
        {upcomingClasses.map((cls) => (
          <Card key={cls.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium text-purple-600">{cls.title}</h3>
                  <p className="text-gray-500">{cls.date}</p>
                  <p className="text-gray-500">{cls.location}</p>
                  <p className="text-gray-500">Estudiantes: {cls.students}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">Ver Detalles</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-600">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/dashboard/teacher/courses" className="w-full">
                Ver Mis Cursos
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
              <Link href="/dashboard/teacher/schedule" className="w-full">
                Ver Mi Horario
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
              <Link href="/dashboard/profile" className="w-full">
                Actualizar Perfil
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-600">Anuncios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-600">Reunión de Maestros</h3>
              <p className="text-sm text-gray-600">Este viernes a las 17:00. Asistencia obligatoria.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-600">Nuevo Protocolo de Clases</h3>
              <p className="text-sm text-gray-600">Se ha actualizado el protocolo de seguridad. Revisa tu email.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
