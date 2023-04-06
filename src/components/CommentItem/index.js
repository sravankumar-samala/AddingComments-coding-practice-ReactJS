// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const likeImagesList = [
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png',
]

const CommentItem = props => {
  const {commentObject, onLike, onDelete} = props
  const {id, name, created, comment, commentClass, isLiked} = commentObject
  const likeImage = isLiked ? likeImagesList[1] : likeImagesList[0]
  const likeClass = isLiked ? 'btn-liked' : ''

  const likeComment = () => {
    onLike(id)
  }

  const deleteComment = () => {
    onDelete(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-details">
        <div className={`profile-logo ${commentClass}`}>
          {name.slice(0, 1).toUpperCase()}
        </div>
        <div className="comment-content">
          <p className="profile-name">
            {name}{' '}
            <span className="date">{formatDistanceToNow(created)} ago</span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="comment-btns">
        <button
          type="button"
          className={`like-btn ${likeClass}`}
          onClick={likeComment}
        >
          <img src={likeImage} alt="like" />
          <p>like</p>
        </button>
        <button
          type="button"
          data-testid="delete"
          className="delete-btn"
          onClick={deleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="Delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
