const BlogCard = (props) => {
  const {author, title, blog_post, date} = props
  return (
      <div className='blog--card'>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{author}</p>
        <p>{blog_post}</p>
      </div>
  )
}

export default BlogCard;