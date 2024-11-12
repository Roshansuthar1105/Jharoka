import { useState } from 'react';
import './App.css'
import CardBody from './components/CardBody'
import Navbar from './components/Navbar'

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  return (
    <>
    <Navbar page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
    <CardBody page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
    </>
  )
}

export default App
