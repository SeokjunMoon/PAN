import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [ notices, setNotices ] = useState([]);
  const [ filter, setFilter ] = useState([]);

  const getNotices = async() => {
    const res = await axios.get('/proxy/5000/get/data');
    if (res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);
      setNotices(cover);
      setFilter(cover);
      return;
    }
    res.data.reverse();
    setNotices(res.data);
    setFilter(res.data);
  };

  const onInputChange = (event) => {
    let filtered = notices.filter((value) => {
      return value.title.indexOf(event.target.value) !== -1;
    });
    setFilter(filtered);
  };

  const onDataRefreshing = (event) => {
    // 파이썬으로 홈페이지 재검사
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <h1>PAN</h1>
        <p style={{fontSize: '12px'}}>부산대학교 및 정보컴퓨터공학부<br/>공지사항 알리미</p>
      </div>
      <div className='toolbar'>
        <button className='refresh' onClick={event => onDataRefreshing(event)}>데이터<br/>새로고침</button>
        <input type='text' placeholder='search.....' className='SearchInput' onChange={event => onInputChange(event)}></input>
      </div>
      <div>
      {
        filter.length === 0?
        null: filter.map((element, idx) => {
          return (
            <a href={element.link} key={idx} className='wrapper'>
              <div className='NoticeTitle' href={element.link}>{element.title}</div>
              <div style={{fontSize: '12px', color: '#9E9E9E'}}>{element.date.replaceAll(".", "-")}</div>
            </a>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
