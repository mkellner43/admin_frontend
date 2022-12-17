import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const EditBlog = () => {
  const navigate = useNavigate();
  let {state} = useLocation();
  const [title, setTitle] = useState(state.title)
  const [blog_post, setBlog_post] = useState(state.blog_post)
  const [published, setPublished] = useState(state.published)
  const [id] = useState(state._id)
  const handleClick = (e) => {
    e.preventDefault()
    const blog = JSON.stringify({
      title: title,
      blog_post: blog_post,
      published: published,
    })
    const authData = JSON.parse(sessionStorage.getItem('token'))
    fetch(`http://localhost:3000/blog/${id}/update`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + authData.token
      },
       body: blog
    })
    .then(response => response.json())
    .then(data => {
      if(data.msg === 'blog post updated (:') {
        navigate(`/`, {state: {msg: "Successfully updated!"}})
      }
    })
    .catch(err => console.error(err))
  }

  const handleChange = (e) => {
    if(e.target.name === "title"){
      setTitle(e.target.value)
    } else if(e.target.name === "blog_post"){
      setBlog_post(e.target.value)
    } else {
      setPublished(e.target.value)
    }
  }

  return (
    <form>
      <h1 className='title'>New Blog</h1>
      <label className='mt-1' htmlFor='title'>title</label>
      <input name="title" value={title} onChange={handleChange} required/>
      <label className='mt-1' htmlFor="blog_post" >blog post </label>
      <textarea name="blog_post" value={blog_post} onChange={handleChange} cols={50} rows={10} required></textarea>
      <select className='mt-1' onChange={handleChange} name='published' value={published}>
        <option value={''}>select publish status</option>
        <option value={'not-published'}>don't publish</option>
        <option value={'published'}>publish</option>
      </select>
      <button type='submit' className='btn mt-1' onClick={handleClick}>Submit</button>
    </form>
  )
}

export default EditBlog;