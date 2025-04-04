using System.ComponentModel.DataAnnotations;
namespace Mission11_Diamond.Data
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Author { get; set; }
        public string? Publisher { get; set; }
        public string? ISBN { get; set; }
        public string? Classification { get; set; }
        public string? Category { get; set; }
        public int? PageCount { get; set; }
        public int? Price { get; set; }
    }
}