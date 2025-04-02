using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Mission11_Diamond.Data;

namespace Mission11_Diamond.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private BookstoreDbContext _bookContext;
        
        public BookStoreController(BookstoreDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNumber = 0, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();
            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.Category));
            }
            
            string? favoriteBook = Request.Cookies["FavoriteBook"];
            Console.WriteLine("==========COOKIE==========");
            
            HttpContext.Response.Cookies.Append("FavoriteBook", "Les Miserables", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });
            
            var totalNumBooks = query.Count();
            
            var something = query
                .Skip((pageNumber - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var theObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(theObject);
        }

        [HttpGet("BookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
        
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook){
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook){
            var existingBook = _bookContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID) {
            var book = _bookContext.Books.Find(bookID);

            if (book == null){
                return NotFound(new {message = "Book Not Found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}