import React, { useEffect, useState } from 'react';
import './Card.css';
import Card from './Card';
import Masonry from 'react-masonry-css';

const CardBody = ({page, setPage, limit, setLimit}) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function getdata() {
            const limit = 30;
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${page === 1 ? limit + 10 : limit}`;
            const data = await fetch(url);
            const json = await data.json();
            let processedJson = json;
            
            if(page === 1) {
                processedJson = json.slice(10); // Remove first 10 images for page 1
            }
            
            const processedData = processedJson.map((item, index) => ({
                ...item,
                sizeClass: getSizeClass(index)
            }));
            setCards(processedData);
        }
        getdata();
    }, [page]);

    const getSizeClass = (index) => {
        // Create a repeating pattern for every 8 images
        const pattern = index % 8;
        switch (pattern) {
            case 0: // First image in pattern
                return 'large';
            case 1: // Second image
            case 2:
                return 'medium';
            case 3: // Third image
                return 'wide';
            case 4: // Fourth image
            case 5:
                return 'small';
            default:
                return 'medium';
        }
    };

    const breakpointColumns = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <div className="pt-20 bg-slate-900 min-h-screen">
            <Masonry
                breakpointCols={breakpointColumns}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {cards.map((item) => (
                    <Card key={item.id} item={item} sizeClass={item.sizeClass} />
                ))}
            </Masonry>
        </div>
    );
};

export default CardBody;