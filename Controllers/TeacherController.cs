using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using YogaStudioApp.Models;

namespace YogaStudioApp.Controllers
{
    public class TeacherController : Controller
    {
        public IActionResult Index()
        {
            // Verificar que el usuario esté autenticado y sea docente
            if (!IsUserInRole("Teacher"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            var userName = HttpContext.Session.GetString("UserName");
            var viewModel = new TeacherDashboardViewModel
            {
                TeacherName = userName,
                ScheduledClasses = 8,
                TotalStudents = 45,
                HoursThisMonth = 32,
                UpcomingClasses = GetUpcomingClasses()
            };
            
            return View(viewModel);
        }
        
        public IActionResult Courses()
        {
            if (!IsUserInRole("Teacher"))
            {
                return RedirectToAction("Login", "Account");
            }
            
            return View();
        }
        
        public IActionResult Schedule()
        {
            if (!IsUserInRole("Teacher"))
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
        
        private List<ClassModel> GetUpcomingClasses()
        {
            return new List<ClassModel>
            {
                new ClassModel
                {
                    Id = 1,
                    Title = "Yoga para principiantes",
                    Time = "Hoy, 18:00 - 19:30",
                    Location = "Sala Principal",
                    CurrentStudents = 12
                },
                new ClassModel
                {
                    Id = 2,
                    Title = "Meditación Guiada",
                    Time = "Mañana, 10:00 - 11:00",
                    Location = "Sala de Meditación",
                    CurrentStudents = 8
                },
                new ClassModel
                {
                    Id = 3,
                    Title = "Hatha Yoga",
                    Time = "Miércoles, 17:00 - 18:30",
                    Location = "Sala Principal",
                    CurrentStudents = 15
                }
            };
        }
    }
    
    public class TeacherDashboardViewModel
    {
        public string TeacherName { get; set; }
        public int ScheduledClasses { get; set; }
        public int TotalStudents { get; set; }
        public int HoursThisMonth { get; set; }
        public List<ClassModel> UpcomingClasses { get; set; }
    }
}
