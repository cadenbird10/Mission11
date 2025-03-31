import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories}:  {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([])
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
    
        loadBooks();
    }, [pageSize, pageNum, sortBy, selectedCategories]);
    
    if (loading) return <p>Loading books...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="">Sort By</option>
                <option value="title">Title</option>
            </select>
            
            {books.map((b) => (
                <div className="card mb-3" style={{ width: "28rem" }} key={b.bookID}>
                    <div className="card-body">
                        <h5 className="card-title">{b.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">by {b.author}</h6>
                        <ul className="list-unstyled">
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> ${b.price}</li>
                        </ul>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => navigate(`/donate/${b.title}/${b.author}/${b.price}/${b.bookID}`)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
            
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1); // Reset to first page when page size changes
                }}
                />

        {/* <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {
            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>{i + 1}</button>
            ))
        }

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button> */}

        
        </>
    );
}

export default BookList;