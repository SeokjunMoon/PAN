import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [ notices, setNotices ] = useState([]);
  const [ filter, setFilter ] = useState([]);

  const getNotices = async() => {
    const pnu_res = await axios.get('/proxy/5000/get/data/');
    if (pnu_res.data[0] === undefined) {
      let cover = [];
      setNotices(cover);
      setFilter(cover);
      return;
    }

    const sorted_resource = pnu_res.data.sort((a, b) => {
      if (a.date === b.date) return a.title < b.title;
      return a.date > b.date;
    });
    sorted_resource.reverse();

    setNotices(sorted_resource);
    setFilter(sorted_resource);
  };

  const onInputChange = (event) => {
    let filtered = notices.filter((value) => {
      return value.title.indexOf(event.target.value) !== -1;
    });
    setFilter(filtered);
  };

  const requestRefreshing = async() => {
    const req_res = await axios.get('/proxy/5000/refresh');
    if (req_res.data['message'] === "1") {
      return true;
    }
    else {
      return false;
    }
  };

  const onDataRefreshing = (event) => {
    const is_done = requestRefreshing();
    if (is_done) {
      alert("데이터 새로고침을 완료하였습니다.");
      getNotices();
    }
    else {
      alert("데이터 새로고침 오류");
    }
  };

  useEffect(() => {
    const req_res = requestRefreshing();
    if (req_res) getNotices();
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
          let marking = "";
          if (element.type === 'pnu') marking = "[학교]";
          else if (element.type === 'cse') marking = "[정컴]";
          else if (element.type === 'recruit') marking = "";

          return (
            <a href={element.link} key={idx} target='_blank' className='wrapper'>
              <div className='NoticeTitle' href={element.link}>{marking + element.title}</div>
              <div style={{fontSize: '12px', color: '#9E9E9E'}}>{element.date}</div>
            </a>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;