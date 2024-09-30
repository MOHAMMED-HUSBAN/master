import React from 'react';

const newsData = [
  {
    title: "General League Championship...",
    date: "15 Jan 2021",
    imageUrl: "https://iconape.com/wp-content/files/tb/323002/png/323002.png",
  },
  {
    title: "Monaco Immersion Program",
    date: "15 Jan 2021",
    imageUrl: "https://iconape.com/wp-content/files/tb/323002/png/323002.png",
  },
  {
    title: "The First Edition of the...",
    date: "15 Jan 2021",
    imageUrl: "https://iconape.com/wp-content/files/tb/323002/png/323002.png",
  },
  {
    title: "General League Championship...",
    date: "15 Jan 2021",
    imageUrl: "https://iconape.com/wp-content/files/tb/323002/png/323002.png",
  },
  {
    title: "Talents Training English...",
    date: "15 Jan 2021",
    imageUrl: "https://iconape.com/wp-content/files/tb/323002/png/323002.png",
  },
];

const NewsComponent = () => {
  return (
    
    <div style={{ padding: '20px', backgroundColor: '#f7f7f7' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Our News</h1>
      
      {newsData.map((news, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img src={news.imageUrl} alt={`News ${index + 1}`} style={{ width: '200px', height: 'auto' }} />
          <div style={{ padding: '10px', flex: 1 }}>
            <h2 style={{ fontSize: '18px', margin: '0' }}>{news.title}</h2>
            <p style={{ color: '#888', margin: '5px 0' }}>{news.date}</p>
            <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}>
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;