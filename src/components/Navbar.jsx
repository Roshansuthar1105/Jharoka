import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import './Navbar.css';

const Navbar = ({ page, setPage, limit, setLimit }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-top">
                    <div className="navbar-brand">
                        <a className="logo">Jharoka झरोखा</a>
                    </div>
                    <button className="menu-btn" onClick={toggleMenu}>
                        {isMenuOpen ? <RiCloseLine className="icon" /> : <RiMenuLine className="icon" />}
                    </button>
                </div>
                
                <div className={`navbar-controls ${isMenuOpen ? 'show' : ''}`}>
                    <div className="pagination-controls">
                        <button
                            className="nav-btn"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            <GrLinkPrevious className="icon" />
                        </button>
                        
                        <span className="page-indicator">
                            Page {page}
                        </span>
                        
                        <button
                            className="nav-btn"
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            <GrLinkNext className="icon" />
                        </button>
                    </div>

                    <div className="input-controls">
                        <input
                            type="number"
                            className="page-input"
                            placeholder="Go to page"
                            min="1"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    const value = Number(e.target.value);
                                    if (value > 0) {
                                        setPage(value);
                                        setIsMenuOpen(false);
                                    }
                                }
                            }}
                        />
                        
                        <select
                            className="limit-select"
                            value={limit}
                            onChange={handleLimitChange}
                        >
                            <option value="30">30 per page</option>
                            <option value="45">45 per page</option>
                            <option value="60">60 per page</option>
                        </select>
                    </div>

                    <button
                        className="home-btn"
                        onClick={() => {
                            setPage(1);
                            setIsMenuOpen(false);
                        }}
                    >
                        <FaHome className="icon" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;