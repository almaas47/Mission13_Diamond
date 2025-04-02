import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useCart } from "../context/CartContext";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList ({selectedCategories} : {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { addToCart } = useCart();
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, selectedCategories);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNumber, selectedCategories]);

    if (loading) return <p>Loading Books...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedBooks = [...books].sort((a, b) => {
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    const handleAddToCart = (book: Book) => {
        const cartItem = {
            bookId: book.bookID,
            title: book.title,
            price: parseFloat(book.price.toFixed(2)),
            quantity: 1 // Add a quantity field
        };
    
        addToCart(cartItem);
        setShowToast(true); // Show toast
        setTimeout(() => setShowToast(false), 3000); // Toast timeout
    };

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={toggleSortOrder}>
                Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <br />

            {sortedBooks.map((p) => 
                <div id="bookCard" className="card mb-3" key={p.bookID}>
                    <h3 className="card-title">{p.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {p.author}</li>
                            <li><strong>Publisher:</strong> {p.publisher}</li>
                            <li><strong>ISBN:</strong> {p.isbn}</li>
                            <li><strong>Classification/Category:</strong> {p.classification}/{p.category}</li>
                            <li><strong>Number of Pages:</strong> {p.pageCount}</li>
                            <li><strong>Price:</strong> ${p.price}.00</li>
                        </ul>
                        <button 
                            className="btn btn-success" 
                            onClick={() => handleAddToCart(p)}
                            // onClick={() => navigate(`/donate/${p.author}/${p.bookID}`)}
                            >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            <div className={`toast ${showToast ? "show" : "hide"}`} style={{
                position: "fixed", bottom: "20px", right: "20px", background: "#28a745",
                color: "white", padding: "10px 15px", borderRadius: "8px"
            }}>
                📚 Added to Cart!
            </div>

            <br />
            
            <Pagination 
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNumber(1);
                }}/>
        </>
    );
}

export default BookList;