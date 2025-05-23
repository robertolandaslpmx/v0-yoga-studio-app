"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Download,
  FileText,
  HelpCircle,
  BarChart,
  TrendingUp,
  Clock,
  Award,
  AlertCircle,
  Users,
  Star,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function TeacherPaymentsPage() {
  const [selectedMonth, setSelectedMonth] = useState("mayo")
  const [selectedYear, setSelectedYear] = useState("2023")
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

  // Datos de ejemplo para los pagos
  const paymentSummary = {
    currentMonth: {
      baseSalary: 15000,
      bonuses: 2500,
      deductions: 500,
      totalPayment: 17000,
      classesTaught: 24,
      studentsAttended: 186,
      nextPaymentDate: "31/05/2023",
      status: "pending",
    },
    yearToDate: {
      totalEarned: 85000,
      totalClasses: 120,
      totalStudents: 930,
      averagePerClass: 708.33,
    },
  }

  // Historial de pagos
  const paymentHistory = [
    {
      id: 1,
      month: "Abril 2023",
      baseSalary: 15000,
      bonuses: 2000,
      deductions: 0,
      totalPayment: 17000,
      classesTaught: 22,
      paymentDate: "30/04/2023",
      status: "paid",
      reference: "REF-2023-04",
    },
    {
      id: 2,
      month: "Marzo 2023",
      baseSalary: 15000,
      bonuses: 3000,
      deductions: 500,
      totalPayment: 17500,
      classesTaught: 26,
      paymentDate: "31/03/2023",
      status: "paid",
      reference: "REF-2023-03",
    },
    {
      id: 3,
      month: "Febrero 2023",
      baseSalary: 15000,
      bonuses: 1500,
      deductions: 0,
      totalPayment: 16500,
      classesTaught: 20,
      paymentDate: "28/02/2023",
      status: "paid",
      reference: "REF-2023-02",
    },
    {
      id: 4,
      month: "Enero 2023",
      baseSalary: 15000,
      bonuses: 2000,
      deductions: 1000,
      totalPayment: 16000,
      classesTaught: 22,
      paymentDate: "31/01/2023",
      status: "paid",
      reference: "REF-2023-01",
    },
  ]

  // Datos para el desglose de bonificaciones
  const bonusBreakdown = [
    { type: "Asistencia perfecta", amount: 1000 },
    { type: "Clases adicionales", amount: 1200 },
    { type: "Evaluaciones positivas", amount: 300 },
  ]

  // Datos para el gráfico de tendencia (simplificado)
  const earningsTrend = [
    { month: "Ene", amount: 16000 },
    { month: "Feb", amount: 16500 },
    { month: "Mar", amount: 17500 },
    { month: "Abr", amount: 17000 },
    { month: "May", amount: 17000 },
  ]

  // Función para obtener el color del estado de pago
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Función para obtener el texto del estado de pago
  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagado"
      case "pending":
        return "Pendiente"
      case "processing":
        return "Procesando"
      default:
        return status
    }
  }

  return (
    <div className="md:ml-64 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Mis Pagos</h1>
        <Button
          variant="outline"
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
          onClick={() => setIsHelpModalOpen(true)}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Ayuda con Pagos
        </Button>
      </div>

      {/* Resumen del mes actual */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-purple-600">Resumen del Mes Actual</CardTitle>
              <CardDescription>Mayo 2023</CardDescription>
            </div>
            <Badge className={getStatusColor(paymentSummary.currentMonth.status)}>
              {getStatusText(paymentSummary.currentMonth.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Salario Base</span>
                  <span className="font-medium">${paymentSummary.currentMonth.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bonificaciones</span>
                  <span className="font-medium text-green-600">
                    +${paymentSummary.currentMonth.bonuses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Deducciones</span>
                  <span className="font-medium text-red-600">
                    -${paymentSummary.currentMonth.deductions.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total a Recibir</span>
                    <span className="text-2xl font-bold text-purple-600">
                      ${paymentSummary.currentMonth.totalPayment.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-700">Próxima Fecha de Pago</h4>
                    <p className="text-amber-600">{paymentSummary.currentMonth.nextPaymentDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-purple-600 mb-1">Clases Impartidas</p>
                  <p className="text-2xl font-bold text-purple-700">{paymentSummary.currentMonth.classesTaught}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm text-purple-600 mb-1">Estudiantes Atendidos</p>
                  <p className="text-2xl font-bold text-purple-700">{paymentSummary.currentMonth.studentsAttended}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Desglose de Bonificaciones</h4>
                <div className="space-y-2">
                  {bonusBreakdown.map((bonus, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-700">{bonus.type}</span>
                      <span className="font-medium text-green-700">${bonus.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            <FileText className="mr-2 h-4 w-4" />
            Ver Detalle Completo
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Descargar Recibo
          </Button>
        </CardFooter>
      </Card>

      {/* Pestañas para historial y estadísticas */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="history">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-purple-600">Historial de Pagos</CardTitle>
              <div className="flex gap-4 mt-2">
                <div className="w-1/3">
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un mes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enero">Enero</SelectItem>
                      <SelectItem value="febrero">Febrero</SelectItem>
                      <SelectItem value="marzo">Marzo</SelectItem>
                      <SelectItem value="abril">Abril</SelectItem>
                      <SelectItem value="mayo">Mayo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/3">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un año" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Período</th>
                      <th className="text-left py-3 px-4">Clases</th>
                      <th className="text-left py-3 px-4">Salario Base</th>
                      <th className="text-left py-3 px-4">Bonificaciones</th>
                      <th className="text-left py-3 px-4">Deducciones</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">{payment.month}</td>
                        <td className="py-3 px-4">{payment.classesTaught}</td>
                        <td className="py-3 px-4">${payment.baseSalary.toLocaleString()}</td>
                        <td className="py-3 px-4 text-green-600">+${payment.bonuses.toLocaleString()}</td>
                        <td className="py-3 px-4 text-red-600">-${payment.deductions.toLocaleString()}</td>
                        <td className="py-3 px-4 font-medium">${payment.totalPayment.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(payment.status)}>{getStatusText(payment.status)}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-purple-600 flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Resumen Anual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-sm text-purple-600 mb-1">Total Ganado (2023)</p>
                    <p className="text-2xl font-bold text-purple-700">
                      ${paymentSummary.yearToDate.totalEarned.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-sm text-purple-600 mb-1">Clases Impartidas</p>
                    <p className="text-2xl font-bold text-purple-700">{paymentSummary.yearToDate.totalClasses}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-sm text-purple-600 mb-1">Estudiantes Atendidos</p>
                    <p className="text-2xl font-bold text-purple-700">{paymentSummary.yearToDate.totalStudents}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-sm text-purple-600 mb-1">Promedio por Clase</p>
                    <p className="text-2xl font-bold text-purple-700">
                      ${paymentSummary.yearToDate.averagePerClass.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-purple-500" />
                    Tendencia de Ingresos
                  </h4>
                  <div className="h-48 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                    {earningsTrend.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-purple-500 w-12 rounded-t-md"
                          style={{ height: `${(item.amount / 20000) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-purple-600 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Oportunidades de Bonificación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-700 flex items-center mb-2">
                    <Clock className="mr-2 h-4 w-4" />
                    Bonificación por Asistencia Perfecta
                  </h4>
                  <p className="text-sm text-green-600 mb-2">
                    Recibe $1,000 adicionales por asistir puntualmente a todas tus clases programadas.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">Progreso actual:</span>
                    <span className="text-sm font-medium text-green-700">90%</span>
                  </div>
                  <Progress value={90} className="h-2 mt-1" />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-700 flex items-center mb-2">
                    <Users className="mr-2 h-4 w-4" />
                    Bonificación por Estudiantes
                  </h4>
                  <p className="text-sm text-blue-600 mb-2">
                    Gana $50 adicionales por cada estudiante que supere el mínimo de 8 por clase.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">Promedio actual:</span>
                    <span className="text-sm font-medium text-blue-700">7.8 estudiantes</span>
                  </div>
                  <Progress value={78} className="h-2 mt-1" />
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-amber-700 flex items-center mb-2">
                    <Star className="mr-2 h-4 w-4" />
                    Bonificación por Evaluaciones
                  </h4>
                  <p className="text-sm text-amber-600 mb-2">
                    Recibe hasta $500 adicionales basados en las evaluaciones de tus estudiantes.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-amber-700">Calificación actual:</span>
                    <span className="text-sm font-medium text-amber-700">4.8/5.0</span>
                  </div>
                  <Progress value={96} className="h-2 mt-1" />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver Todas las Oportunidades</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de ayuda */}
      <Dialog open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-600 flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Ayuda con Pagos
            </DialogTitle>
            <DialogDescription>Información sobre el sistema de pagos para instructores</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-700 mb-2">Estructura de Pagos</h4>
              <p className="text-sm text-purple-600">
                Tu compensación mensual se compone de un salario base más bonificaciones por rendimiento, menos
                deducciones aplicables.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Componentes del Pago</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <strong>Salario Base:</strong> Pago fijo mensual basado en tu contrato y nivel de experiencia.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>Bonificaciones:</strong> Pagos adicionales por asistencia perfecta, evaluaciones positivas y
                    clases adicionales.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>Deducciones:</strong> Descuentos por clases canceladas sin previo aviso u otras situaciones
                    específicas.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-700">Fechas Importantes</h4>
                  <ul className="text-sm text-amber-600 mt-2 space-y-1">
                    <li>• Cierre de nómina: Día 25 de cada mes</li>
                    <li>• Fecha de pago: Último día hábil del mes</li>
                    <li>• Plazo para reportar discrepancias: 5 días después de recibir el pago</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Contacto para Dudas</h4>
              <p className="text-sm text-gray-600">
                Si tienes preguntas sobre tu pago, por favor contacta al departamento de nómina:
              </p>
              <p className="text-sm font-medium">
                Email: nomina@estudiodeyoga.com
                <br />
                Teléfono: 555-789-0123
                <br />
                Horario de atención: Lunes a Viernes, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsHelpModalOpen(false)}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
