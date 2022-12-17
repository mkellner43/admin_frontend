import {useLocation} from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Comment from './Comment';
import '../styles/ShowBlog.css';

const ShowBlog = () => {
  let {state} = useLocation();
  const navigate = useNavigate()
  const [publishStatus, setPublishStatus] = useState(state.published)

  const handlePublish = (e) => {
    e.preventDefault()
    const authData = JSON.parse(sessionStorage.getItem('token'))
    if(!authData) return navigate('/login')
    const status = e.target.value
    fetch(`http://localhost:3000/blog/${state._id}/${status}`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + authData.token
      }
    })
    .then(response => response.json())
    .then(data => data.msg === 'post published' ? setPublishStatus('published') : setPublishStatus('not-published'))
  }

  return (
    <section className='container mt-1'>
      <h1 className='mt-1'>Admin Blog Access</h1>
      <div className='blog_post mt-1'>
        <div className='author-container'>
          <NavLink to={`/blog/edit/${state._id}`} state={state}>
            <button className='btn edit'>Edit</button>
          </NavLink> 
          <p>{state.author.username}</p>
          <p>{format(parseISO(state.date), "LLL dd, yyyy", "UTC")}</p>
        </div>
        <h2 className='mt-1'>{state.title}</h2>
        <p className='mt-2'>{state.blog_post}</p>
        <div className={publishStatus === 'not-published' ? 'error mt-1 center' : 'success mt-1 center'}>
          <p>{publishStatus}</p>
          {publishStatus === 'not-published' ?
            <button className='btn mt-1' id='success-btn' type='submit' onClick={handlePublish} value='publish'>Publish</button> :
            <button className='btn mt-1' id='error-btn' type='submit' onClick={handlePublish} value='unpublish'>Un-publish</button>
          }
        </div>
      </div>
      <div className='mt-1'>
        <h2 className='center'>Comments</h2>
        <Comment blog={state._id}/>
      </div>
    </section>
  )
}

export default ShowBlog;