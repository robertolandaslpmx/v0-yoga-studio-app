using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using YogaStudioApp.Models;

namespace YogaStudioApp.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            // Verificar que el usuario esté autenticado y sea administrador
            if (!IsUserInRole("Admin"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            var viewModel = new AdminDashboardViewModel
            {
                TotalStudents = 45,
                TotalTeachers = 8,
                TotalClasses = 12,
                MonthlyRevenue = 25000,
                ActiveMemberships = 38,
                PendingPayments = 3
            };
            
            return View(viewModel);
        }
        
        public IActionResult Courses()
        {
            if (!IsUserInRole("Admin"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            return View();
        }
        
        public IActionResult Teachers()
        {
            if (!IsUserInRole("Admin"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            return View();
        }
        
        public IActionResult PaymentReports()
        {
            if (!IsUserInRole("Admin"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            return View();
        }
        
        private bool IsUserInRole(string role)
        {
            var userRole = HttpContext.Session.GetString("UserRole");
            return userRole == role;
        }
    }
    
    public class AdminDashboardViewModel
    {
        public int TotalStudents { get; set; }
        public int TotalTeachers { get; set; }
        public int TotalClasses { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public int ActiveMemberships { get; set; }
        public int PendingPayments { get; set; }
    }
}
