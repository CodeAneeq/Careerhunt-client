import React from "react";
import styles from "../searchBar/search-bar.module.scss";
import searchIcon from '../../assets/imgs/searchIcon.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      navigate(`/search-result?title=${encodeURIComponent(trimmed)}`)
    }
  }
  return (
    <div className={`${styles.global_search_container} d-flex`}>
      <input
        className="form-control me-2"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="What are you looking for?"
        aria-label="Search"
      />
      {/* <img src={searchIcon} alt="search Icon" /> */}
      <img onClick={handleSearch} src={searchIcon} alt="search Icon" />
    </div>
  );
};

export default GlobalSearch;
