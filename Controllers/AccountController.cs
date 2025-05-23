using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using YogaStudioApp.Models;
using System.Threading.Tasks;

namespace YogaStudioApp.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            // Si ya está autenticado, redirigir al dashboard correspondiente
            if (HttpContext.Session.GetString("UserEmail") != null)
            {
                var userRole = HttpContext.Session.GetString("UserRole");
                return RedirectToRoleDashboard(userRole);
            }
            
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // Validar credenciales usando las credenciales de prueba
            var user = TestCredentials.ValidateCredentials(model.Email, model.Password);
            
            if (user != null)
            {
                // Establecer sesión del usuario
                HttpContext.Session.SetString("UserEmail", user.Email);
                HttpContext.Session.SetString("UserName", user.Name);
                HttpContext.Session.SetString("UserRole", user.Role.ToString());
                HttpContext.Session.SetString("UserPhone", user.Phone);
                
                // Redirigir según el rol
                return RedirectToRoleDashboard(user.Role.ToString());
            }
            else
            {
                ModelState.AddModelError("", "Credenciales inválidas. Por favor, verifica tu email y contraseña.");
                return View(model);
            }
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // Aquí iría la lógica para registrar al usuario
            // Por ahora, establecemos una sesión temporal como alumno
            HttpContext.Session.SetString("UserEmail", model.Email);
            HttpContext.Session.SetString("UserName", model.Name);
            HttpContext.Session.SetString("UserRole", UserRole.Student.ToString());
            HttpContext.Session.SetString("UserPhone", model.Phone);
            
            return RedirectToAction("Index", "Dashboard");
        }

        public IActionResult Logout()
        {
            // Limpiar la sesión
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        
        private IActionResult RedirectToRoleDashboard(string role)
        {
            return role switch
            {
                "Admin" => RedirectToAction("Index", "Admin"),
                "Teacher" => RedirectToAction("Index", "Teacher"),
                "Student" => RedirectToAction("Index", "Dashboard"),
                _ => RedirectToAction("Index", "Dashboard")
            };
        }
    }
}
