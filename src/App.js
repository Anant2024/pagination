//import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products?limit=100');
      setData(res.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const pageHandler = (index) => {
    if(index>0 && index<=data.length/10)
    setPages(index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {data.length > 0 && (
        <div>
          {data.slice(pages * 10 - 10, pages * 10).map((item) => (
            <span
              key={item.id}
              style={{
                display: 'block',
                border: '1px solid black',
                margin: '10px',
                padding: '10px',
              }}
            >
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          ))}
        </div>
      )}

      {data.length > 0 && (
        <div>
          <span onClick={()=>pageHandler(pages-1)}>◀️</span>
          {[...Array(Math.ceil(data.length / 10))].map((_, index) => (
            <span key={index} onClick={() => pageHandler(index + 1)}>
              {index + 1}
            </span>
          ))}
          <span onClick={()=>pageHandler(pages+1)}>▶️</span>
        </div>
      )}
    </div>
  );
}

export default App;
