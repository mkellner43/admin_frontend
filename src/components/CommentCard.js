import '../styles/Comment.css';

const CommentCard = (props) => {
  const {author, comment, date, id, deleteComment} = props
  return (
    <div className='comment-card mt-1'>
      <div className='author-date'>
        <h2>{author}</h2>
        <p>{date}</p>
      </div>
        <p className='mt-1'>{comment}</p>
        <div className='mt-1'>
          <button className='btn bg-red' type='submit' value={id} onClick={deleteComment}>Delete</button>
        </div>
    </div>
  )
}

export default CommentCard;