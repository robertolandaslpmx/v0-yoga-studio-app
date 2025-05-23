"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  BookOpen,
  CreditCard,
  User,
  Menu,
  X,
  LogOut,
  Heart,
  LayoutDashboard,
  Users,
  CheckSquare,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Determinar el rol del usuario basado en la ruta
  let userRole = "student" // Por defecto es estudiante
  if (pathname.includes("/admin")) {
    userRole = "admin"
  } else if (pathname.includes("/teacher")) {
    userRole = "teacher"
  }

  // Redirigir a la página principal según el rol si estamos en /dashboard
  useEffect(() => {
    if (pathname === "/dashboard") {
      if (userRole === "admin") {
        router.push("/dashboard/admin")
      } else if (userRole === "teacher") {
        router.push("/dashboard/teacher/relax")
      } else {
        router.push("/dashboard/relax")
      }
    }
  }, [pathname, router, userRole])

  // Navegación basada en el rol
  const getNavigation = () => {
    if (userRole === "admin") {
      return [
        { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Gestión de Cursos", href: "/dashboard/admin/courses", icon: BookOpen },
        { name: "Gestión de Maestros", href: "/dashboard/admin/teachers", icon: User },
        { name: "Informes de Pagos", href: "/dashboard/admin/payment-reports", icon: CreditCard },
        { name: "Perfil", href: "/dashboard/profile", icon: User },
      ]
    }

    if (userRole === "teacher") {
      return [
        { name: "Relax", href: "/dashboard/teacher/relax", icon: Heart },
        { name: "Asignadas", href: "/dashboard/teacher/assigned", icon: CheckSquare },
        { name: "Alumnos", href: "/dashboard/teacher/students", icon: Users },
        { name: "Pagos", href: "/dashboard/teacher/payments", icon: CreditCard },
        { name: "Perfil", href: "/dashboard/profile", icon: User },
      ]
    }

    // Navegación completa para estudiantes
    return [
      { name: "Relax", href: "/dashboard/relax", icon: Heart },
      { name: "Reservaciones", href: "/dashboard/reservations", icon: Calendar },
      { name: "Mis Clases", href: "/dashboard/my-classes", icon: BookOpen },
      { name: "Pagos", href: "/dashboard/payments", icon: CreditCard },
      { name: "Perfil", href: "/dashboard/profile", icon: User },
    ]
  }

  const navigation = getNavigation()

  // Filtrar para el menú del footer (excluir los marcados como sidebarOnly)
  const footerNavigation = navigation.filter((item) => !item.sidebarOnly).slice(0, 5)

  return (
    <div className="min-h-screen bg-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              href={
                userRole === "admin"
                  ? "/dashboard/admin"
                  : userRole === "teacher"
                    ? "/dashboard/teacher/relax"
                    : "/dashboard/relax"
              }
              className="text-xl font-bold text-purple-600"
            >
              Estudio de Yoga
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback className="bg-purple-200 text-purple-700">US</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Usuario</p>
                  <p className="text-xs text-gray-500">
                    {userRole === "admin" ? "Administrador" : userRole === "teacher" ? "Maestro" : "Alumno"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b fixed top-16 left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Cerrar Sesión
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={pathname.includes("/relax") ? "" : "container mx-auto px-4 py-8 mt-16"}>{children}</main>

      {/* Desktop sidebar - Auto-hide con corrección */}
      <div className="hidden md:block fixed top-20 left-0 bottom-20 z-10 group">
        {/* Área de activación invisible */}
        <div className="absolute left-0 top-0 w-11 h-full bg-transparent z-10"></div>

        {/* Sidebar que se desliza */}
        <div
          className="absolute top-0 h-full w-64 bg-white rounded-r-lg shadow-md overflow-y-auto transform -translate-x-[calc(100%-4px)] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
          style={{ left: "0px" }}
        >
          <div className="p-4">
            {/* Indicador visual cuando está oculto */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50 group-hover:opacity-0 transition-opacity duration-300">
              <div className="w-1 h-16 bg-purple-300 rounded-full"></div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t">
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">Cerrar Sesión</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer navigation - visible on all screens */}
      <footer
        className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30 ${pathname.includes("/relax") ? "bg-opacity-80 backdrop-blur-sm" : ""}`}
      >
        <div className="grid grid-cols-5 h-16">
          {footerNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              } transition-colors duration-200`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
