import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBook from "../components/WelcomeBook";
import { Link } from "react-router-dom";

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <WelcomeBook />
            <Link to="/adminbooks" className="btn btn-primary">
              <i className="bi bi-plus-circle"></i> Add New Book
            </Link>
          </div>
          <div className='row'>
              <div className='col-md-3'>
                <CategoryFilter 
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  />
              </div>
              <div className='col-md-9'>
                <BookList selectedCategories={selectedCategories}/>
              </div>
          </div>
        </div>
    );
}

export default BooksPage;