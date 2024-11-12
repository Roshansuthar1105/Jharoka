import React from "react";
import "./Card.css";
import { FaDownload } from "react-icons/fa6";
function Card(props) {
  const { download_url, url, id } = props.item;
  return (
    <li className="slide-wrapper" key={id}>
      <div className="relative">
        <img className="photo" src={download_url} alt={`Image ${id}`} />
        <div className="absolute bottom-2 right-2 p-3 border-2 border-white text-white rounded-md">
          <a href={url} target="_blank" rel="noopener noreferrer"><FaDownload /></a>
        </div>
      </div>
    </li>
  );
}

export default Card;
