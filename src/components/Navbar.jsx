import React from 'react';
import { FaHome } from "react-icons/fa";
import { GrLinkPrevious , GrLinkNext } from "react-icons/gr";
const Navbar = ({ page, setPage, limit, setLimit }) => {
    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
    };

    return (
        <nav className="font-mono navbar navbar-expand-lg fixed top-0 left-0 w-full navbar-dark bg-dark w-100 mb-4 nav1 bg-gray-800 z-50">
            <div className="container-fluid flex gap-2 flex-wrap">
                <a className="font-bold text-[1.5rem] text-white cursor-pointer mr-auto">Jharoka झरोखा </a>
                <button
                    className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    <GrLinkPrevious/>
                </button>
                <span className="text-gray-400 font-medium text-lg me-2">
                    Page: {page}
                </span>
                <button
                    className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    <GrLinkNext/>
                </button>
                <input
                    type="number"
                    className="form-control me-2 bg-gray-700 text-gray-300 font-medium py-2 px-4 w-24 rounded"
                    placeholder="Go to page"
                    min="1"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setPage(Number(e.target.value));
                        }
                    }}
                />
                {/* Limit Selection */}
                <select
                    className="form-select bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded"
                    value={limit}
                    onChange={handleLimitChange}
                >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                </select>
                {/* New Stuff */}
                <div className="ms-auto">
                    <button
                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setPage(1)}
                    >
                        <FaHome/>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
