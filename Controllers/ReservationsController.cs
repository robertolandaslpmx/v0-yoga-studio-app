using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using YogaStudioApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace YogaStudioApp.Controllers
{
    public class ReservationsController : Controller
    {
        public IActionResult Index(string difficulty = null, string timeSlot = null)
        {
            // Verificar que el usuario esté autenticado
            if (HttpContext.Session.GetString("UserEmail") == null)
            {
                return RedirectToAction("Login", "Account");
            }
            
            // Obtener clases disponibles (datos de ejemplo)
            var availableClasses = GetAvailableClasses();
            
            // Aplicar filtros si están seleccionados
            if (!string.IsNullOrEmpty(difficulty))
            {
                availableClasses = availableClasses.Where(c => c.Difficulty == difficulty).ToList();
            }
            
            if (!string.IsNullOrEmpty(timeSlot))
            {
                // Filtrar por franja horaria
                availableClasses = availableClasses.Where(c => {
                    var classHour = int.Parse(c.Time.Split(':')[0]);
                    
                    return timeSlot switch
                    {
                        "morning" => classHour >= 6 && classHour < 12,
                        "afternoon" => classHour >= 12 && classHour < 18,
                        "evening" => classHour >= 18 && classHour < 22,
                        _ => true
                    };
                }).ToList();
            }
            
            var viewModel = new ReservationsViewModel
            {
                AvailableClasses = availableClasses,
                SelectedDate = DateTime.Now,
                SelectedDifficulty = difficulty,
                SelectedTimeSlot = timeSlot
            };
            
            return View(viewModel);
        }
        
        [HttpPost]
        public IActionResult Reserve(int classId)
        {
            // Aquí iría la lógica para reservar la clase
            // Por ahora, simplemente redirigimos con un mensaje de éxito
            TempData["SuccessMessage"] = "Clase reservada con éxito";
            return RedirectToAction("Index");
        }
        
        private List<ClassModel> GetAvailableClasses()
        {
            // Datos de ejemplo para las clases disponibles
            return new List<ClassModel>
            {
                new ClassModel
                {
                    Id = 1,
                    Title = "Yoga para principiantes",
                    Instructor = "María González",
                    Time = "09:00",
                    EndTime = "10:30",
                    Location = "Sala Principal",
                    AvailableSpots = 8,
                    Difficulty = "Fácil",
                    Description = "Clase ideal para personas que se inician en la práctica del yoga."
                },
                new ClassModel
                {
                    Id = 2,
                    Title = "Hatha Yoga",
                    Instructor = "Carlos Rodríguez",
                    Time = "12:00",
                    EndTime = "13:30",
                    Location = "Sala Principal",
                    AvailableSpots = 5,
                    Difficulty = "Medio",
                    Description = "Práctica tradicional de Hatha Yoga con enfoque en posturas y respiración."
                },
                new ClassModel
                {
                    Id = 3,
                    Title = "Meditación Guiada",
                    Instructor = "Ana López",
                    Time = "17:00",
                    EndTime = "18:00",
                    Location = "Sala de Meditación",
                    AvailableSpots = 10,
                    Difficulty = "Fácil",
                    Description = "Sesiones de meditación guiada para reducir el estrés y mejorar la concentración."
                },
                new ClassModel
                {
                    Id = 4,
                    Title = "Yoga Restaurativo",
                    Instructor = "Laura Martínez",
                    Time = "19:00",
                    EndTime = "20:30",
                    Location = "Sala Principal",
                    AvailableSpots = 3,
                    Difficulty = "Fácil",
                    Description = "Práctica suave y reparadora ideal para recuperarse de lesiones o estrés."
                },
                new ClassModel
                {
                    Id = 5,
                    Title = "Ashtanga Yoga",
                    Instructor = "Carlos Rodríguez",
                    Time = "07:30",
                    EndTime = "09:00",
                    Location = "Sala Principal",
                    AvailableSpots = 6,
                    Difficulty = "Difícil",
                    Description = "Serie dinámica y desafiante de posturas sincronizadas con la respiración."
                },
                new ClassModel
                {
                    Id = 6,
                    Title = "Vinyasa Flow",
                    Instructor = "María González",
                    Time = "18:30",
                    EndTime = "20:00",
                    Location = "Sala Principal",
                    AvailableSpots = 7,
                    Difficulty = "Medio",
                    Description = "Secuencia fluida de posturas que conecta movimiento y respiración."
                },
                new ClassModel
                {
                    Id = 7,
                    Title = "Yoga Kundalini",
                    Instructor = "Ana López",
                    Time = "10:30",
                    EndTime = "12:00",
                    Location = "Sala de Meditación",
                    AvailableSpots = 8,
                    Difficulty = "Medio",
                    Description = "Práctica que combina posturas, respiración, meditación y canto de mantras."
                },
                new ClassModel
                {
                    Id = 8,
                    Title = "Power Yoga",
                    Instructor = "Carlos Rodríguez",
                    Time = "20:00",
                    EndTime = "21:30",
                    Location = "Sala Principal",
                    AvailableSpots = 4,
                    Difficulty = "Difícil",
                    Description = "Práctica intensa y vigorosa que desarrolla fuerza, flexibilidad y resistencia."
                }
            };
        }
    }
    
    public class ReservationsViewModel
    {
        public List<ClassModel> AvailableClasses { get; set; }
        public DateTime SelectedDate { get; set; }
        public string SelectedDifficulty { get; set; }
        public string SelectedTimeSlot { get; set; }
    }
}
