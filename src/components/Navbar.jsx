import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import './Navbar.css';

const Navbar = ({ setPage, limit, setLimit }) => {
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
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <span className="text-white mr-4">Images per load:</span>
                            <select
                                className="limit-select"
                                value={limit}
                                onChange={handleLimitChange}
                            >
                                <option value="30">30 images</option>
                                <option value="45">45 images</option>
                                <option value="60">60 images</option>
                            </select>
                        </div>

                        <button
                            className="home-btn"
                            onClick={() => {
                                setPage(1);
                                setIsMenuOpen(false);
                            }}
                            title="Back to top"
                        >
                            <FaHome className="icon" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;