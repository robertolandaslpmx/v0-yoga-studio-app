using System.Collections.Generic;

namespace YogaStudioApp.Models
{
    public static class TestCredentials
    {
        public static readonly List<TestUser> Users = new List<TestUser>
        {
            // Administrador
            new TestUser
            {
                Email = "admin@yogastudio.com",
                Password = "Admin123!",
                Name = "Carlos Administrador",
                Role = UserRole.Admin,
                Phone = "555-0001",
                Description = "Acceso completo al sistema"
            },
            
            // Docentes
            new TestUser
            {
                Email = "maria.gonzalez@yogastudio.com",
                Password = "Docente123!",
                Name = "María González",
                Role = UserRole.Teacher,
                Phone = "555-0002",
                Description = "Instructora de Yoga para principiantes y Hatha Yoga"
            },
            new TestUser
            {
                Email = "carlos.rodriguez@yogastudio.com",
                Password = "Docente123!",
                Name = "Carlos Rodríguez",
                Role = UserRole.Teacher,
                Phone = "555-0003",
                Description = "Instructor de Hatha Yoga Avanzado"
            },
            new TestUser
            {
                Email = "ana.lopez@yogastudio.com",
                Password = "Docente123!",
                Name = "Ana López",
                Role = UserRole.Teacher,
                Phone = "555-0004",
                Description = "Instructora de Meditación y Mindfulness"
            },
            
            // Alumnos
            new TestUser
            {
                Email = "juan.perez@email.com",
                Password = "Alumno123!",
                Name = "Juan Pérez",
                Role = UserRole.Student,
                Phone = "555-0005",
                Description = "Alumno regular - Plan Mensual"
            },
            new TestUser
            {
                Email = "laura.martinez@email.com",
                Password = "Alumno123!",
                Name = "Laura Martínez",
                Role = UserRole.Student,
                Phone = "555-0006",
                Description = "Alumna nueva - Plan Trimestral"
            },
            new TestUser
            {
                Email = "sofia.garcia@email.com",
                Password = "Alumno123!",
                Name = "Sofía García",
                Role = UserRole.Student,
                Phone = "555-0007",
                Description = "Alumna avanzada - Plan Anual"
            }
        };
        
        public static TestUser ValidateCredentials(string email, string password)
        {
            return Users.FirstOrDefault(u => 
                u.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && 
                u.Password == password);
        }
    }
    
    public class TestUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public UserRole Role { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
    }
}
