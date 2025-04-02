import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = "https://bookstorediamondbackend.azurewebsites.net/api/BookStore"

// Common fetch options for all API calls
const fetchOptions: RequestInit = {
    mode: 'cors' as RequestMode,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    }
};

export const fetchBooks = async (
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
        const response = await fetch(
            `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`,
            fetchOptions
        );

        if (!response.ok) {
            throw new Error('Failed to fetch projects')
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const addBooks = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify(newBook)
        });
        if (!response.ok) {
            throw new Error('Failed to add book')
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding book', error)
        throw error;
    }
};

export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating project", error);
        throw error;
    }
};

export const deleteBook = async (bookID: number) : Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
            ...fetchOptions,
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};
