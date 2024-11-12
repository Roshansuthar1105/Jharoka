import React, { useEffect, useState } from 'react';
import './Card.css';
import Card from './Card';
// cRdWb8ToorbMOp4k00fe5eSAH4PorgA0L3yulDJj7MdfFr1asQOB3xze
const CardBody = ({page,setPage , limit ,setLimit}) => {
    const [cards, setCards] = useState([]);
    // Fetch data when page or limit changes
    useEffect(() => {
        async function getdata() {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
            const data = await fetch(url);
            const json = await data.json();
            setCards(json);
            console.log(json.length);
        }
        getdata();
    }, [page, limit]);

    return (
        <div className="flex items-center flex-wrap pt-20 bg-slate-900 ">
            <div className='cards' >
            {cards.map((item) => {
                return <Card key={item.id} item={item} />;
            })}
            </div>
        </div>
    );
};
export default CardBody;