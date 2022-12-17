import '../styles/Home.css';
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { NavLink } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import BlogCard from '../components/BlogCard';

const Home = () => {
  const {state} = useLocation()
  const [msg, setMsg] = useState(state?.msg ||  "" )
  const [blogData, setBlogData] = useState([])

  const cards = () => {
    return blogData.map(blog => 
      <NavLink 
        key={blog._id}
        to={`/blog/${blog._id}`}
        state= {blog}
        className='blog-card--link'
      >
        <BlogCard 
          key={blog._id}
          author={blog.author.username}
          title={blog.title}
          blog_post={blog.blog_post}
          date={format(parseISO(blog.date), "LLL dd, yyyy", "UTC")}
          id={blog._id}
          published={blog.published}
          />
      </NavLink>
      )
  }

  useEffect(() => {
    fetch('http://localhost:3000/blog',
      { mode: 'cors', headers: {'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => setBlogData(json))
  }, [])

  const notify = () => {
    setTimeout(() => {
      setMsg('')
    }, 3000)
    return msg
  }
  return (
    <>
    <h1 className='center mt-1'>Blogs</h1>
    <p className='success notify'>{notify()}</p>
      <section className="home-container">
        {cards()}
      </section>
    </>
  )
}

export default Home;