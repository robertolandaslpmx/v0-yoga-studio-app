import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  // Datos de ejemplo para las próximas clases
  const upcomingClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      instructor: "María González",
      date: "Hoy, 18:00 - 19:30",
      location: "Sala Principal",
    },
    {
      id: 2,
      title: "Meditación Guiada",
      instructor: "Ana López",
      date: "Mañana, 10:00 - 11:00",
      location: "Sala de Meditación",
    },
    {
      id: 3,
      title: "Hatha Yoga",
      instructor: "Carlos Rodríguez",
      date: "Miércoles, 17:00 - 18:30",
      location: "Sala Principal",
    },
  ]

  return (
    <div className="md:ml-64 pb-16">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Bienvenido a tu Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Clases Reservadas</CardTitle>
            <CardDescription>Total de clases programadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Estado de Membresía</CardTitle>
            <CardDescription>Tu plan actual</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-green-600">Activa</p>
            <p className="text-sm text-gray-500">Plan Mensual - Vence en 22 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Clases Asistidas</CardTitle>
            <CardDescription>Este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">8</p>
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
                  <p className="text-gray-500">Instructor: {cls.instructor}</p>
                  <p className="text-gray-500">{cls.date}</p>
                  <p className="text-gray-500">{cls.location}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <Button variant="outline" className="mr-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                    Cancelar
                  </Button>
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
              <Link href="/dashboard/reservations" className="w-full">
                Reservar Nueva Clase
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
              <Link href="/dashboard/payments" className="w-full">
                Ver Estado de Pagos
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
              <h3 className="font-medium text-purple-600">Nuevo Taller de Meditación</h3>
              <p className="text-sm text-gray-600">Este sábado a las 10:00 AM. ¡No te lo pierdas!</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-600">Cambio de Horario</h3>
              <p className="text-sm text-gray-600">Las clases de Hatha Yoga ahora serán de 18:30 a 20:00.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
