import { useEffect, useState } from "react";
import './CategoryFilter.css';

function categoryFilter ({
    selectedCategories, 
    setSelectedCategories,
} : {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://mission13diamond1.azurewebsites.net/api/BookStore/BookTypes');
                const data = await response.json();
                console.log('Fetched Categories', data);
                setCategories(data);
            } catch (error) {
                console.error("Error Fetching Categories", error);
                throw error
            }
        };

        fetchCategories();
    }, []);

    // This updates the checkboxes to filter
    function handleCheckboxChange ({target} : {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];
    
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter">
            <h5>These are the book categories:</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input 
                        type="checkbox" 
                        id = {c} 
                        value = {c} 
                        className="category-checkbox"
                        onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default categoryFilter;