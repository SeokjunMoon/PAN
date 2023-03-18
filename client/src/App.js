import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css';
import './components/NoticeArticle/NoticeArticle'
import NoticeArticle from './components/NoticeArticle/NoticeArticle';



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

    setNotices(pnu_res.data);
    setFilter(pnu_res.data);
  };

  const onInputChange = (event) => {
    let filtered = notices.filter((value) => {
      return value.title.indexOf(event.target.value) !== -1;
    });
    setFilter(filtered);
  };

  const requestRefreshing = async() => {
    const req_res = await axios.get('/proxy/5000/refresh');
    if (req_res.data['message'] === "1") return true;
    else return false;
  };

  const onDataRefreshing = (event) => {
    const is_done = requestRefreshing();
    if (is_done) {
      alert("데이터 새로고침을 완료하였습니다.");
      getNotices();
      document.getElementById('search_input').value = "";
    }
    else {
      alert("데이터 새로고침 오류");
    }
  };

  const convertType = (type) => {
    if (type === 'pnu') return "[학교] ";
    else if (type === 'cse') return "[정컴] ";
    else if (type === 'recruit') return "";
  }

  useEffect(() => {
    const req_res = requestRefreshing();
    if (req_res) getNotices();
  }, []);



  return (
    <div className="App">
      <div className='header'>
        <p className='app_title'>PAN</p>
      </div>
      <div className='toolbar'>
        <button className='refresh' onClick={event => onDataRefreshing(event)}>데이터<br/>새로고침</button>
        <input type='text' placeholder='search.....' className='SearchInput' id='search_input' onChange={event => onInputChange(event)}></input>
      </div>
      <div className='NoticeList'>
      {
        filter.length === 0?
        null: filter.map((element, idx) => {
          return (
            <NoticeArticle type={convertType(element.type)} title={element.title} link={element.link} date={element.date} key={idx}/>
          )
        })
      }
      </div>
      <div style={{height: '1000px'}}></div>
    </div>
  );
}

export default App;