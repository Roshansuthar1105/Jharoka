import React, { useState } from "react";
import "./Card.css";
import { FaDownload } from "react-icons/fa6";

function Card(props) {
  const { download_url, url, id, sizeClass } = props.item;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className={`slide-wrapper ${sizeClass}`}>
      <div className="relative w-full h-full overflow-hidden">
        {isLoading && (
          <div className="loading-skeleton absolute inset-0 animate-pulse">
            <div className="h-full w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700"></div>
          </div>
        )}
        
        {hasError && (
          <div className="error-placeholder absolute inset-0 flex items-center justify-center bg-slate-800">
            <span className="text-slate-400">Failed to load image</span>
          </div>
        )}

        <img 
          className={`photo ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          src={download_url} 
          alt={`Image ${id}`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
        
        {!isLoading && !hasError && (
          <div className="download-btn">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaDownload size={20} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;