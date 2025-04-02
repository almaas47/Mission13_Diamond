import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList () {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`http://localhost:4000/api/BookStore?pageHowMany=${pageSize}&pageNumber=${pageNumber}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
        fetchBooks();
    }, [pageSize, pageNumber, totalItems]);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedBooks = [...books].sort((a, b) => {
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    return (
        <>
            <h1>BookStore</h1>
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
                    </div>
                </div>
            )}

            <br />

            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>

            {
                [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNumber(i + 1)} disabled={pageNumber === (i + 1)}>
                    {i + 1}
                </button>
                ))}

            <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</button>

            <br />

            <label htmlFor="">
                Results Per Page: 
                <select 
                value={pageSize} 
                onChange={
                    (p) => {
                        setPageSize(Number(p.target.value));
                        setPageNumber(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;