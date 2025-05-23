using System;

namespace YogaStudioApp.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Instructor { get; set; }
        public string Time { get; set; }
        public string EndTime { get; set; }
        public string Location { get; set; }
        public int AvailableSpots { get; set; }
        public int CurrentStudents { get; set; }
        public string Difficulty { get; set; }
        public string Description { get; set; }
        
        // Propiedad calculada para mostrar el horario completo
        public string FullTimeDisplay => $"{Time} - {EndTime}";
        
        // Método para obtener la clase CSS según la dificultad
        public string GetDifficultyBadgeClass()
        {
            return Difficulty switch
            {
                "Fácil" => "bg-success",
                "Medio" => "bg-warning text-dark",
                "Difícil" => "bg-danger",
                _ => "bg-secondary"
            };
        }
        
        // Método para obtener el icono según la dificultad
        public string GetDifficultyIcon()
        {
            return Difficulty switch
            {
                "Fácil" => "fa-smile",
                "Medio" => "fa-meh",
                "Difícil" => "fa-dizzy",
                _ => "fa-question"
            };
        }
    }
}
