import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

// const API_URL = 'https://localhost:5000/Book';
    const API_URL = 'https://mission13-bird-backend.azurewebsites.net/Book';

export const fetchBooks = async (   
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try{
    // const [sortBy, setSortBy] = useState('');
    const categoryParams = selectedCategories
    .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
    .join('&');

    const url = `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`// +
                // (sortBy ? `&sortBy=${sortBy}` : '');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const addBook = async (book: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook?`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) { 
        console.error("Error adding book:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch (`${API_URL}/DeleteBook/${bookID}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:,', error);
        throw error;
    }
}