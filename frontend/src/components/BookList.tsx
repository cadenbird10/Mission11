import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({selectedCategories}:  {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([])
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories
            .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
            .join('&');

            const url = `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}` +
                        (sortBy ? `&sortBy=${sortBy}` : '');
    
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };
    
        fetchBooks();
    }, [pageSize, pageNum, sortBy, selectedCategories]);
    

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

        {/* <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {
            [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>{i + 1}</button>
            ))
        }

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button> */}

        <div className="btn-group" role="group" aria-label="Pagination">
            <button className="btn btn-outline-primary" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
                Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button 
                    key={i + 1} 
                    className={`btn ${pageNum === i + 1 ? "btn-primary" : "btn-outline-primary"}`} 
                    onClick={() => setPageNum(i + 1)} 
                    disabled={pageNum === (i + 1)}>
                    {i + 1}
                </button>
            ))}
            <button className="btn btn-outline-primary" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
                Next
            </button>
        </div>

        <br />
        <label>
            Results per page:
            <select value={pageSize} 
            onChange={(p) => {setPageSize(Number(p.target.value))
                setPageNum(1);
            }}
            >

                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>

        </>
    );
}

export default BookList;