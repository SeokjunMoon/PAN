import React from 'react'
import './NoticeArticle.css'

const NoticeArticle = ({type, title, link, date}) => {
    return (
        <a href={link} target='_blank' className='container'>
            <div className='notice_title'>{type + title}</div>
            <div className='notice_date'>{date}</div>
        </a>
    )
}

export default NoticeArticle