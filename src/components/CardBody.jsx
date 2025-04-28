import React, { useEffect, useState, useRef } from 'react';
import './Card.css';
import Card from './Card';
import Masonry from 'react-masonry-css';
import LoadingSpinner from './LoadingSpinner';

const CardBody = ({page, setPage, limit}) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const lastCardElementRef = useRef();

    // Use useEffect instead of useCallback to avoid dependency issues
    useEffect(() => {
        // Skip if already loading
        if (isLoading) return;

        // Define the function inside useEffect to avoid dependency issues
        async function loadMoreItems() {
            setIsLoading(true);
            try {
                const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
                const data = await fetch(url);
                const json = await data.json();

                if (json.length === 0) {
                    setHasMore(false);
                    return;
                }

                const processedData = json.map((item, index) => ({
                    ...item,
                    sizeClass: getSizeClass(index)
                }));

                setCards(prevCards => {
                    // If it's the first page, replace cards but remove first 10 images
                    if (page === 1) {
                        return processedData.slice(10);
                    } else {
                        return [...prevCards, ...processedData];
                    }
                });

            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        }

        // Only load more items if we have more to load
        if (hasMore) {
            loadMoreItems();
        }
    }, [page, limit]);

    // Setup intersection observer for infinite scrolling
    useEffect(() => {
        // Create a ref to the current loading and hasMore state to use in the callback
        const isCurrentlyLoading = isLoading;
        const hasMoreItems = hasMore;

        const options = {
            root: null,
            rootMargin: '100px', // Load a bit earlier before reaching the bottom
            threshold: 0.1
        };

        // Create the observer with a callback that uses the current state values
        const handleObserver = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !isCurrentlyLoading && hasMoreItems) {
                setPage(prevPage => prevPage + 1);
            }
        };

        const currentObserver = new IntersectionObserver(handleObserver, options);
        observer.current = currentObserver;

        // Get the current element
        const currentElement = lastCardElementRef.current;
        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        // Cleanup function
        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [cards.length, isLoading, hasMore]);

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
                {cards.map((item, index) => {
                    // Add ref to the last element for infinite scrolling detection
                    if (cards.length === index + 1) {
                        return (
                            <div ref={lastCardElementRef} key={item.id}>
                                <Card item={item} sizeClass={item.sizeClass} />
                            </div>
                        );
                    } else {
                        return <Card key={item.id} item={item} sizeClass={item.sizeClass} />;
                    }
                })}
            </Masonry>

            {/* Loading spinner at the bottom */}
            {isLoading && <LoadingSpinner />}

            {/* Message when no more images */}
            {!hasMore && !isLoading && cards.length > 0 && (
                <div className="text-center text-white py-8">
                    No more images to load
                </div>
            )}
        </div>
    );
};

export default CardBody;