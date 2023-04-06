import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const classListLength = initialContainerBackgroundClassNames.length

// Write your code here
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const randNum = Math.floor(Math.random() * classListLength)
    const commentClass = initialContainerBackgroundClassNames[randNum]
    const date = new Date()

    const newCommentObj = {
      id: uuidV4(),
      name,
      comment,
      commentClass,
      created: date,
      isLiked: false,
    }

    if (newCommentObj.name && newCommentObj.comment) {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newCommentObj],
        name: '',
        comment: '',
      }))
    }

    // console.log(commentClass)
    const {commentsList} = this.state
    console.log(commentsList)
  }

  addNewName = event => {
    this.setState({name: event.target.value})
  }

  createNewComment = event => {
    this.setState({comment: event.target.value})
  }

  onLike = id => {
    this.setState(prevList => ({
      commentsList: prevList.commentsList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isLiked: !eachObj.isLiked}
        }
        return eachObj
      }),
    }))
  }

  onDelete = id => {
    this.setState(prevList => ({
      commentsList: prevList.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  render() {
    // console.log(initialContainerBackgroundClassNames)
    const {name, comment, commentsList} = this.state

    return (
      <div className="container">
        <div className="main-container">
          <form className="form-container" onSubmit={this.addComment}>
            <h1>Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              onChange={this.addNewName}
              value={name}
            />
            <textarea
              name="message"
              rows="6"
              cols="40"
              placeholder="Your Comment"
              onChange={this.createNewComment}
              value={comment}
            />
            <button type="submit" className="add-comment-btn">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="comments-container">
          <p>
            <span className="total-comments">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                onLike={this.onLike}
                onDelete={this.onDelete}
                commentObject={eachComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
