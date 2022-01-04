import classes from './comment-list.module.css';

function CommentList({items}) {

  return (
    <ul className={classes.comments}>
     { Array.isArray(items) ?
       items.map(item=>(
        <li key={item._id}>
        <p>{item.text}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
       ))
     :null}
    </ul>
  );
}

export default CommentList;