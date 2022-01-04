import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-content';

function Comments(props) {
  const { eventId } = props;

  const { showNotification } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data?.comments);
          setIsFetchingComments(false);
        })
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: "Sending comment ...",
      message: "Your comment is currently being stored in a database!!",
      status: "pending"
    });

    fetch(`/api/comments/${props.eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then(data => {
        throw new Error(data.message || 'Something went wrong!');
      })
    })
      .then(data => {
        showNotification({
          title: "Success!!",
          message: "Your comment is saved!!",
          status: "success"
        });

      }).catch(e => {
        showNotification({
          title: "Error!",
          message: e.message || 'Something went wrong',
          status: "error"
        });
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading....</p>}
    </section>
  );
}

export default Comments;