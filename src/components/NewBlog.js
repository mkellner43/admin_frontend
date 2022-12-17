import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [blog_post, setBlog_post] = useState('')
  const [published, setPublished] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    if(e.target.name === 'title'){
      setTitle(e.target.value)
    } else if (e.target.name === 'blog_post') {
      setBlog_post(e.target.value)
    } else {
      setPublished(e.target.value)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const authData = JSON.parse(sessionStorage.getItem('token'))
    if(!authData) return navigate('/login')
    fetch('http://localhost:3000/blog/create', {
      method:'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + authData.token
      },
      body: JSON.stringify({
        title: e.target.form.title.value,
        blog_post: e.target.form.blog_post.value,
        author: authData._id,
        published: e.target.form.published.value
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data?.msg === 'Blog post successfully created (:'){
        setTitle('')
        setBlog_post('')
        setPublished('')
        return navigate('/')
      } else {
        setError('Something went wrong :(')
      }
    })
    .catch(err => console.error({"error": err}))
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
      <button type='submit' className='btn mt-1' onClick={handleSubmit}>Submit</button>
      {error}
    </form>
  )
}

export default NewBlog;