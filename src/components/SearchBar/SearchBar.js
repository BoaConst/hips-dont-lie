import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = () => {
	let element = document.getElementById("query");

	console.log("Value: %s", element.value)
};

  return (
    
      <div className="search-bar" 
	  >
        <input 
		style={{ 
			height:"50px", 
			width:"85%", 
			marginTop: "3%",
			marginBottom: "3%",
			marginLeft:"8%", 
			backgroundColor:"#5A5A5A"}}
			id="query"
          type="text"
          placeholder="Search..."
        />
        <button type="submit"
		onClick={handleChange}>
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
    
  );
}

export default SearchBar;
