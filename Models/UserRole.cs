using System.ComponentModel.DataAnnotations;

namespace YogaStudioApp.Models
{
    public enum UserRole
    {
        [Display(Name = "Alumno")]
        Student = 1,
        
        [Display(Name = "Docente")]
        Teacher = 2,
        
        [Display(Name = "Administrador")]
        Admin = 3
    }
    
    public static class UserRoleExtensions
    {
        public static string GetDisplayName(this UserRole role)
        {
            return role switch
            {
                UserRole.Student => "Alumno",
                UserRole.Teacher => "Docente",
                UserRole.Admin => "Administrador",
                _ => role.ToString()
            };
        }
        
        public static string GetDashboardRoute(this UserRole role)
        {
            return role switch
            {
                UserRole.Admin => "/Admin/Dashboard",
                UserRole.Teacher => "/Teacher/Dashboard",
                UserRole.Student => "/Dashboard",
                _ => "/Dashboard"
            };
        }
    }
}
