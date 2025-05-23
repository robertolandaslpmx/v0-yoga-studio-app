"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download } from "lucide-react"

export default function AdminPaymentReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("mayo")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Datos de ejemplo para los reportes
  const monthlyRevenue = [
    { name: "Ene", amount: 15000 },
    { name: "Feb", amount: 18000 },
    { name: "Mar", amount: 20000 },
    { name: "Abr", amount: 22000 },
    { name: "May", amount: 25000 },
    { name: "Jun", amount: 23000 },
  ]

  const revenueByPlan = [
    { name: "Plan Mensual", value: 15000 },
    { name: "Plan Trimestral", value: 7000 },
    { name: "Plan Anual", value: 3000 },
    { name: "Paquetes", value: 2000 },
  ]

  const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]

  const paymentTransactions = [
    {
      id: 1,
      date: "01/05/2023",
      student: "Ana García",
      description: "Plan Mensual",
      amount: "$800",
      status: "Completado",
    },
    {
      id: 2,
      date: "02/05/2023",
      student: "Carlos López",
      description: "Paquete de 10 Clases",
      amount: "$900",
      status: "Completado",
    },
    {
      id: 3,
      date: "05/05/2023",
      student: "María Rodríguez",
      description: "Plan Trimestral",
      amount: "$2,100",
      status: "Completado",
    },
    {
      id: 4,
      date: "10/05/2023",
      student: "Juan Pérez",
      description: "Clase Individual",
      amount: "$120",
      status: "Completado",
    },
    {
      id: 5,
      date: "15/05/2023",
      student: "Laura Martínez",
      description: "Plan Mensual",
      amount: "$800",
      status: "Completado",
    },
  ]

  const handleExportReport = () => {
    // Aquí iría la lógica para exportar el reporte
    alert("Exportando reporte...")
  }

  return (
    <div className="md:ml-64 pb-20 md:pb-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">Informes de Pagos</h1>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" /> Exportar Reporte
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">$25,000</p>
            <p className="text-sm text-gray-500">Mayo 2023</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Nuevas Membresías</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">18</p>
            <p className="text-sm text-gray-500">Mayo 2023</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Renovaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">32</p>
            <p className="text-sm text-gray-500">Mayo 2023</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/4">
          <Label htmlFor="month" className="mb-2 block">
            Mes
          </Label>
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
              <SelectItem value="junio">Junio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/4">
          <Label htmlFor="year" className="mb-2 block">
            Año
          </Label>
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="plans">Planes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-600">Ingresos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyRevenue}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" name="Ingresos ($)" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-600">Ingresos por Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByPlan}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueByPlan.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-600">Transacciones de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Fecha</th>
                      <th className="text-left py-3 px-4">Estudiante</th>
                      <th className="text-left py-3 px-4">Descripción</th>
                      <th className="text-left py-3 px-4">Monto</th>
                      <th className="text-left py-3 px-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-3 px-4">{transaction.date}</td>
                        <td className="py-3 px-4">{transaction.student}</td>
                        <td className="py-3 px-4">{transaction.description}</td>
                        <td className="py-3 px-4">{transaction.amount}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-600">Rendimiento de Planes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Plan</th>
                      <th className="text-left py-3 px-4">Ventas</th>
                      <th className="text-left py-3 px-4">Ingresos</th>
                      <th className="text-left py-3 px-4">% del Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Plan Mensual</td>
                      <td className="py-3 px-4">20</td>
                      <td className="py-3 px-4">$16,000</td>
                      <td className="py-3 px-4">55.6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Plan Trimestral</td>
                      <td className="py-3 px-4">5</td>
                      <td className="py-3 px-4">$10,500</td>
                      <td className="py-3 px-4">36.5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Paquete de 10 Clases</td>
                      <td className="py-3 px-4">3</td>
                      <td className="py-3 px-4">$2,700</td>
                      <td className="py-3 px-4">9.4%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Clase Individual</td>
                      <td className="py-3 px-4">5</td>
                      <td className="py-3 px-4">$600</td>
                      <td className="py-3 px-4">2.1%</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-purple-50">
                      <td className="py-3 px-4 font-bold">Total</td>
                      <td className="py-3 px-4 font-bold">33</td>
                      <td className="py-3 px-4 font-bold">$28,800</td>
                      <td className="py-3 px-4 font-bold">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
