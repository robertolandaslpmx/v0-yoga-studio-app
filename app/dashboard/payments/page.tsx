"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Users, Building, Package, Star, AlertCircle, Zap, Shield, Crown, User } from "lucide-react"

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [planType, setPlanType] = useState("individual")
  const [groupSize, setGroupSize] = useState("2")
  const [billingCycle, setBillingCycle] = useState("monthly")

  // Estado actual del usuario
  const currentMembership = {
    type: "Plan Mensual Individual",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    daysRemaining: 8,
    autoRenew: true,
    price: 800,
  }

  const currentPackages = [
    {
      id: 1,
      name: "Paquete de 10 Clases",
      totalClasses: 10,
      usedClasses: 3,
      remainingClasses: 7,
      purchaseDate: "2024-01-15",
      expiryDate: "2024-04-15",
      price: 900,
    },
    {
      id: 2,
      name: "Paquete de 5 Clases Premium",
      totalClasses: 5,
      usedClasses: 5,
      remainingClasses: 0,
      purchaseDate: "2023-12-01",
      expiryDate: "2024-03-01",
      price: 600,
      expired: true,
    },
  ]

  // Planes de membresía con opciones individuales, familiares y corporativas
  const membershipPlans = [
    // Planes Individuales
    {
      id: "monthly-individual",
      category: "individual",
      name: "Plan Mensual",
      subtitle: "Perfecto para comenzar",
      price: { monthly: 800, quarterly: 2100, yearly: 7200 },
      description: "Acceso ilimitado a todas las clases durante un mes",
      features: [
        "Acceso ilimitado a clases",
        "Reserva con 48 horas de anticipación",
        "Acceso a eventos especiales",
        "App móvil incluida",
        "Soporte 24/7",
      ],
      popular: true,
      icon: "⭐",
      color: "purple",
    },
    {
      id: "quarterly-individual",
      category: "individual",
      name: "Plan Trimestral",
      subtitle: "Mejor valor",
      price: { monthly: 700, quarterly: 2100, yearly: 6300 },
      description: "Acceso ilimitado a todas las clases durante tres meses",
      features: [
        "Todo del plan mensual",
        "Reserva con 72 horas de anticipación",
        "1 clase privada al mes",
        "Descuento del 12.5%",
        "Nutricionista incluido",
      ],
      popular: false,
      icon: "🎯",
      color: "blue",
      savings: "Ahorra $300 al año",
    },
    {
      id: "yearly-individual",
      category: "individual",
      name: "Plan Anual",
      subtitle: "Máximo ahorro",
      price: { monthly: 600, quarterly: 1800, yearly: 7200 },
      description: "Acceso ilimitado a todas las clases durante un año",
      features: [
        "Todo del plan trimestral",
        "Reserva con 1 semana de anticipación",
        "2 clases privadas al mes",
        "Descuento del 25%",
        "Acceso VIP a talleres",
        "Kit de yoga incluido",
      ],
      popular: false,
      icon: "👑",
      color: "gold",
      savings: "Ahorra $2,400 al año",
    },

    // Planes Familiares
    {
      id: "family-2",
      category: "family",
      name: "Plan Familiar (2 personas)",
      subtitle: "Para parejas",
      price: { monthly: 1400, quarterly: 3780, yearly: 12960 },
      description: "Acceso ilimitado para 2 miembros de la familia",
      features: [
        "Acceso para 2 personas",
        "Todas las ventajas del plan individual",
        "Clases familiares especiales",
        "Descuento del 12.5%",
        "Horarios flexibles compartidos",
      ],
      popular: true,
      icon: "👫",
      color: "pink",
      savings: "Ahorra $200 por persona",
    },
    {
      id: "family-4",
      category: "family",
      name: "Plan Familiar (4 personas)",
      subtitle: "Para toda la familia",
      price: { monthly: 2400, quarterly: 6480, yearly: 22320 },
      description: "Acceso ilimitado para hasta 4 miembros de la familia",
      features: [
        "Acceso para hasta 4 personas",
        "Clases para niños incluidas",
        "Talleres familiares",
        "Descuento del 25%",
        "Coordinador familiar asignado",
        "Eventos familiares exclusivos",
      ],
      popular: false,
      icon: "👨‍👩‍👧‍👦",
      color: "green",
      savings: "Ahorra $400 por persona",
    },

    // Planes Corporativos
    {
      id: "corporate-small",
      category: "corporate",
      name: "Plan Corporativo Pequeño",
      subtitle: "5-15 empleados",
      price: { monthly: 4000, quarterly: 10800, yearly: 37200 },
      description: "Bienestar corporativo para equipos pequeños",
      features: [
        "Acceso para 5-15 empleados",
        "Clases en horarios corporativos",
        "Instructor dedicado",
        "Reportes de bienestar",
        "Descuento del 30%",
        "Clases en oficina disponibles",
      ],
      popular: false,
      icon: "🏢",
      color: "blue",
      savings: "Ahorra $200 por empleado",
    },
    {
      id: "corporate-medium",
      category: "corporate",
      name: "Plan Corporativo Mediano",
      subtitle: "16-50 empleados",
      price: { monthly: 10000, quarterly: 27000, yearly: 93000 },
      description: "Programa integral de bienestar empresarial",
      features: [
        "Acceso para 16-50 empleados",
        "Programa de bienestar personalizado",
        "2 instructores dedicados",
        "Talleres de mindfulness",
        "Descuento del 35%",
        "Métricas de productividad",
        "Clases virtuales ilimitadas",
      ],
      popular: true,
      icon: "🏬",
      color: "purple",
      savings: "Ahorra $300 por empleado",
    },
    {
      id: "corporate-large",
      category: "corporate",
      name: "Plan Corporativo Grande",
      subtitle: "50+ empleados",
      price: { monthly: 20000, quarterly: 54000, yearly: 186000 },
      description: "Solución empresarial completa de bienestar",
      features: [
        "Acceso ilimitado para empleados",
        "Programa ejecutivo de bienestar",
        "Equipo de instructores dedicado",
        "Consultoría en bienestar",
        "Descuento del 40%",
        "Plataforma corporativa personalizada",
        "Eventos de team building",
        "Soporte premium 24/7",
      ],
      popular: false,
      icon: "🏭",
      color: "gold",
      savings: "Ahorra $400 por empleado",
    },
  ]

  // Paquetes de clases
  const classPackages = [
    {
      id: "package-5",
      name: "Paquete de 5 Clases",
      price: 500,
      description: "5 clases para usar en un periodo de 2 meses",
      features: ["Válido por 2 meses", "Reserva con 24 horas de anticipación", "Transferible"],
      icon: "📦",
      popular: false,
    },
    {
      id: "package-10",
      name: "Paquete de 10 Clases",
      price: 900,
      description: "10 clases para usar en un periodo de 3 meses",
      features: ["Válido por 3 meses", "Reserva con 48 horas de anticipación", "Transferible", "1 clase gratis"],
      icon: "📦",
      popular: true,
      savings: "Ahorra $100",
    },
    {
      id: "package-20",
      name: "Paquete de 20 Clases Premium",
      price: 1600,
      description: "20 clases premium para usar en un periodo de 6 meses",
      features: [
        "Válido por 6 meses",
        "Reserva con 72 horas de anticipación",
        "Acceso a clases premium",
        "Transferible",
        "4 clases gratis",
      ],
      icon: "🎁",
      popular: false,
      savings: "Ahorra $400",
    },
    {
      id: "single-class",
      name: "Clase Individual",
      price: 120,
      description: "Una clase individual",
      features: ["Reserva con 24 horas de anticipación", "Válida por 1 mes"],
      icon: "🎫",
      popular: false,
    },
  ]

  // Historial de pagos
  const paymentHistory = [
    {
      id: 1,
      date: "01/01/2024",
      description: "Plan Mensual Individual",
      amount: "$800",
      status: "Pagado",
      method: "Tarjeta de crédito",
      invoice: "INV-2024-001",
    },
    {
      id: 2,
      date: "15/01/2024",
      description: "Paquete de 10 Clases",
      amount: "$900",
      status: "Pagado",
      method: "Stripe",
      invoice: "INV-2024-002",
    },
    {
      id: 3,
      date: "01/12/2023",
      description: "Paquete de 5 Clases Premium",
      amount: "$600",
      status: "Pagado",
      method: "Efectivo",
      invoice: "INV-2023-045",
    },
  ]

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan)
    setIsPaymentModalOpen(true)
  }

  const handleBuyPackage = (pkg: any) => {
    setSelectedPlan(pkg)
    setIsPaymentModalOpen(true)
  }

  const processPayment = () => {
    // Aquí iría la lógica de procesamiento de pago
    let message = `Pago procesado exitosamente para ${selectedPlan?.name}`
    message += `\nMétodo de pago: ${paymentMethod === "stripe" ? "Tarjeta de crédito (Stripe)" : "Efectivo"}`

    if (selectedPlan?.category) {
      message += `\nTipo de plan: ${planType === "individual" ? "Individual" : planType === "family" ? "Familiar" : "Corporativo"}`
      if (planType !== "individual") {
        message += `\nCiclo de facturación: ${billingCycle === "monthly" ? "Mensual" : billingCycle === "quarterly" ? "Trimestral" : "Anual"}`
      }
    }

    alert(message)
    setIsPaymentModalOpen(false)
    setSelectedPlan(null)
  }

  const getPlanPrice = (plan: any) => {
    if (!plan.price) return plan.price || 0

    const multiplier =
      planType === "family" ? Number.parseInt(groupSize) : planType === "corporate" ? Number.parseInt(groupSize) : 1
    const basePrice = plan.price[billingCycle] || plan.price.monthly

    return basePrice * (planType === "individual" ? 1 : multiplier)
  }

  const getFilteredPlans = () => {
    return membershipPlans.filter((plan) => plan.category === planType)
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="md:ml-64 pb-20">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Pagos y Membresías</h1>

      {/* Estado actual de membresía */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-600 flex items-center">
            <Crown className="mr-2 h-5 w-5" />
            Estado de tu Membresía
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{currentMembership.type}</h3>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {currentMembership.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Inicio:</strong> {new Date(currentMembership.startDate).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Vencimiento:</strong> {new Date(currentMembership.endDate).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Renovación automática:</strong> {currentMembership.autoRenew ? "Activada" : "Desactivada"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Días restantes</span>
                <span className="text-2xl font-bold text-purple-600">{currentMembership.daysRemaining}</span>
              </div>
              <Progress value={(currentMembership.daysRemaining / 31) * 100} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">
                {currentMembership.daysRemaining > 7
                  ? `Tu membresía está activa por ${currentMembership.daysRemaining} días más`
                  : `⚠️ Tu membresía vence pronto. Renueva para continuar disfrutando.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado de paquetes de clases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-600 flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Mis Paquetes de Clases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 rounded-lg border ${pkg.expired ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className={`font-medium ${pkg.expired ? "text-gray-600" : "text-blue-700"}`}>{pkg.name}</h4>
                    <p className="text-sm text-gray-500">
                      Comprado: {new Date(pkg.purchaseDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <Badge
                    className={
                      pkg.expired
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }
                  >
                    {pkg.expired ? "Expirado" : "Activo"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Clases utilizadas</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {pkg.usedClasses} / {pkg.totalClasses}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Clases restantes</p>
                    <p className={`text-2xl font-bold ${pkg.remainingClasses > 0 ? "text-green-600" : "text-red-600"}`}>
                      {pkg.remainingClasses}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Progreso</p>
                    <Progress value={(pkg.usedClasses / pkg.totalClasses) * 100} className="h-2 mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Vence: {new Date(pkg.expiryDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="memberships" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="memberships">Membresías</TabsTrigger>
          <TabsTrigger value="packages">Paquetes</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="memberships">
          {/* Selector de tipo de plan */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-600">Tipo de Plan</CardTitle>
              <CardDescription>Selecciona el tipo de membresía que mejor se adapte a tus necesidades</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={planType}
                onValueChange={setPlanType}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    <div>
                      <p className="font-medium">Individual</p>
                      <p className="text-sm text-gray-500">Para una persona</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family" className="cursor-pointer flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    <div>
                      <p className="font-medium">Familiar</p>
                      <p className="text-sm text-gray-500">Para 2-4 personas</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                  <RadioGroupItem value="corporate" id="corporate" />
                  <Label htmlFor="corporate" className="cursor-pointer flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    <div>
                      <p className="font-medium">Corporativo</p>
                      <p className="text-sm text-gray-500">Para empresas</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Selector de tamaño de grupo para planes familiares y corporativos */}
              {planType !== "individual" && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">
                    {planType === "family" ? "Número de miembros familiares" : "Número de empleados"}
                  </Label>
                  <Select value={groupSize} onValueChange={setGroupSize}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {planType === "family" ? (
                        <>
                          <SelectItem value="2">2 personas</SelectItem>
                          <SelectItem value="3">3 personas</SelectItem>
                          <SelectItem value="4">4 personas</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="5">5-15 empleados</SelectItem>
                          <SelectItem value="25">16-50 empleados</SelectItem>
                          <SelectItem value="75">50+ empleados</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Selector de ciclo de facturación */}
              <div className="mt-4">
                <Label className="text-sm font-medium">Ciclo de facturación</Label>
                <RadioGroup value={billingCycle} onValueChange={setBillingCycle} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Mensual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly">Trimestral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Anual</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Planes de membresía */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredPlans().map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-purple-400 ring-1 ring-purple-200" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
                    <Star className="inline mr-1 h-4 w-4" />
                    Más Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{plan.icon}</span>
                    {plan.savings && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-purple-600">{plan.name}</CardTitle>
                  <CardDescription>{plan.subtitle}</CardDescription>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">${getPlanPrice(plan).toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">
                      /{billingCycle === "monthly" ? "mes" : billingCycle === "quarterly" ? "trimestre" : "año"}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"}`}
                    onClick={() => handleSubscribe(plan)}
                  >
                    Suscribirse
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classPackages.map((pkg) => (
              <Card key={pkg.id} className={pkg.popular ? "border-purple-400 ring-1 ring-purple-200" : ""}>
                {pkg.popular && (
                  <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
                    <Zap className="inline mr-1 h-4 w-4" />
                    Mejor Valor
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{pkg.icon}</span>
                    {pkg.savings && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {pkg.savings}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-purple-600">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">${pkg.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => handleBuyPackage(pkg)}>
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-600">Historial de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Fecha</th>
                      <th className="text-left py-3 px-4">Descripción</th>
                      <th className="text-left py-3 px-4">Monto</th>
                      <th className="text-left py-3 px-4">Método</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Factura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">{payment.description}</td>
                        <td className="py-3 px-4 font-medium">{payment.amount}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {payment.method === "Stripe" || payment.method === "Tarjeta de crédito" ? (
                              <CreditCard className="h-4 w-4 mr-2" />
                            ) : (
                              <span className="mr-2">💵</span>
                            )}
                            {payment.method}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 border-green-200">{payment.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            {payment.invoice}
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
      </Tabs>

      {/* Modal de Pago */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
            <DialogDescription>Completa tu compra de forma segura</DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-6">
              {/* Resumen del plan/paquete */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-700 mb-2">Resumen de compra:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Producto:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  {selectedPlan.category && (
                    <>
                      <div className="flex justify-between">
                        <span>Tipo:</span>
                        <span>
                          {planType === "individual"
                            ? "Individual"
                            : planType === "family"
                              ? "Familiar"
                              : "Corporativo"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ciclo:</span>
                        <span>
                          {billingCycle === "monthly"
                            ? "Mensual"
                            : billingCycle === "quarterly"
                              ? "Trimestral"
                              : "Anual"}
                        </span>
                      </div>
                      {planType !== "individual" && (
                        <div className="flex justify-between">
                          <span>{planType === "family" ? "Miembros:" : "Empleados:"}</span>
                          <span>{groupSize}</span>
                        </div>
                      )}
                    </>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-purple-600">
                      ${(selectedPlan.price ? getPlanPrice(selectedPlan) : selectedPlan.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="space-y-4">
                <Label className="font-medium">Método de pago</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="cursor-pointer flex items-center flex-1">
                      <CreditCard className="mr-3 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Tarjeta de crédito/débito</p>
                        <p className="text-sm text-gray-500">Procesado de forma segura con Stripe</p>
                      </div>
                      <div className="ml-auto flex space-x-1">
                        <img src="/placeholder.svg?height=20&width=30&text=VISA" alt="Visa" className="h-5" />
                        <img src="/placeholder.svg?height=20&width=30&text=MC" alt="Mastercard" className="h-5" />
                        <img
                          src="/placeholder.svg?height=20&width=30&text=AMEX"
                          alt="American Express"
                          className="h-5"
                        />
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer flex items-center flex-1">
                      <span className="mr-3 text-xl">💵</span>
                      <div>
                        <p className="font-medium">Pago en efectivo</p>
                        <p className="text-sm text-gray-500">Paga directamente en el estudio</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Formulario de tarjeta si se selecciona Stripe */}
              {paymentMethod === "stripe" && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <h5 className="font-medium flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    Información de la tarjeta
                  </h5>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Vencimiento</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input id="cardName" placeholder="Juan Pérez" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    <span>Tu información está protegida con encriptación SSL de 256 bits</span>
                  </div>
                </div>
              )}

              {/* Información para pago en efectivo */}
              {paymentMethod === "cash" && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-amber-700">Instrucciones para pago en efectivo</h5>
                      <ul className="text-sm text-amber-600 mt-2 space-y-1">
                        <li>• Dirígete a nuestro estudio en Av. Principal #123</li>
                        <li>• Horario de atención: Lunes a Viernes 8:00 AM - 8:00 PM</li>
                        <li>• Presenta este comprobante de reserva</li>
                        <li>• El pago debe realizarse dentro de 24 horas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Términos y condiciones */}
              <div className="text-xs text-gray-500">
                <p>
                  Al proceder con el pago, aceptas nuestros términos y condiciones. Los pagos son procesados de forma
                  segura. Para cancelaciones, consulta nuestra política de reembolsos.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={processPayment}>
              {paymentMethod === "stripe" ? "Pagar Ahora" : "Confirmar Reserva"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
