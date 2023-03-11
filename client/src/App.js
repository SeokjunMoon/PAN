import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [ notices, setNotices ] = useState([]);

  const getNotices = async() => {
    const res = await axios.get('/proxy/5000/get/data');
    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);
      return setNotices(cover);
    }
    setNotices(res.data);
  };

  // const addAllNotices = () => {
  //   if (notices.length() === 0) return;
    
  //   notices.map((notice, idx) = async(e) => {
  //     e.preventDefault();
  //     await axios('/proxy/5000/add/data', {
  //       method: 'POST',
  //       data: {
  //         'index': notice['index'],
  //         'title': notice['title'],
  //         'link': notice['link'],
  //         'date': notice['date']
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <div className="App">
      {
        notices.length === 0?
        null: notices.map((element, idx) => {
          return (
            <div key={idx} style={{display: 'flex'}}>
              <div style={{marginLeft: '20px'}}>{element.index}</div>
              <div style={{marginLeft: '20px'}}>{element.title}</div>
              <div style={{marginLeft: '20px'}}>{element.link}</div>
              <div style={{marginLeft: '20px'}}>{element.date}</div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
