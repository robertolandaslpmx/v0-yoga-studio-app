import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  // Clases populares de ejemplo
  const popularClasses = [
    {
      id: 1,
      title: "Yoga para principiantes",
      instructor: "María González",
      time: "Lunes y Miércoles, 9:00 AM",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Hatha Yoga Avanzado",
      instructor: "Carlos Rodríguez",
      time: "Martes y Jueves, 18:00 PM",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Meditación y Mindfulness",
      instructor: "Ana López",
      time: "Viernes, 17:00 PM",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu equilibrio interior</h1>
              <p className="text-xl mb-8">
                Descubre la paz y armonía a través de nuestras clases de yoga personalizadas para todos los niveles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-purple-600 hover:bg-purple-100">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-purple-700">
                  <Link href="/register">Registrarse</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/placeholder.svg?height=400&width=500" alt="Yoga practice" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Clases Populares */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">Nuestras Clases Más Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularClasses.map((yogaClass) => (
              <Card key={yogaClass.id} className="border border-purple-100 hover:shadow-md transition-shadow">
                <img
                  src={yogaClass.image || "/placeholder.svg"}
                  alt={yogaClass.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-purple-600">{yogaClass.title}</CardTitle>
                  <CardDescription>Instructor: {yogaClass.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{yogaClass.time}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/login" className="w-full">
                      Reservar Ahora
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">Beneficios de Nuestro Estudio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Horarios Flexibles</h3>
              <p className="text-gray-600">Ofrecemos clases en diferentes horarios para adaptarnos a tu agenda.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Instructores Expertos</h3>
              <p className="text-gray-600">Nuestros maestros están certificados y tienen años de experiencia.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Ambiente Tranquilo</h3>
              <p className="text-gray-600">Un espacio diseñado para promover la paz y la concentración.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Estudio de Yoga</h2>
              <p>Encuentra tu equilibrio interior</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="hover:text-purple-200">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="hover:text-purple-200">
                Registrarse
              </Link>
              <Link href="#" className="hover:text-purple-200">
                Contacto
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Estudio de Yoga. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
