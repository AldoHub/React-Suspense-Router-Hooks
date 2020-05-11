import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { postsService } from "../services/PostService";
import { map } from "rxjs/operators";

const Post = () => {

  const [post, setPost] = useState("");
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    const postSubscription = postsService.post$(id)
    .pipe(
        map(res => {
            console.log(res["data"]);
            return res["data"];
        })
    )
    .subscribe(res =>{
        setPost(res);
    });

    return () => {
      postSubscription.unsubscribe();
    }

  }, [id]);

  const goBack = () => {
    history.goBack();
  }

  const deletePost = () => {
    postsService.deletePost(id)
    .then(res => {
        console.log(res);
        history.push("")
    })
    .catch(err => {
        console.log(err);
    })
  }


  return (
    <Fragment>
              <div className="data">
                    <button className="back" onClick={goBack}> &larr; Go Back</button>
                    <span>{history.location.state}</span>
              </div>
                 
              <div className="postContainer">

                <img src={post.cover} alt={post.cover} />
                <div className="content">
                    <h2>{post.title}</h2>
                    <div>{post.content}</div>
                </div>

                <button className="delete" onClick={deletePost}> Delete Post </button>
              </div>


    </Fragment>
    );
}

export default Post;
