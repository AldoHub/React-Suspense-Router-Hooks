import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { postsService } from "../services/PostService";
import { map } from "rxjs/operators";
import image from "../Group 2.svg";

const Main = () => {

  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let postsSubscription;
    let _posts = [];
         
    postsSubscription = postsService.posts$().pipe(
      map(res => {
        res["data"].forEach(_post => {
            _posts.push(_post);
        });
        return _posts;
      })
    ).subscribe(_posts => {
      setPosts(_posts);
    });

    return () => {
      postsSubscription.unsubscribe();
    };

  }, [])

  const toPost = (postId) => {
    console.log(postId);
    history.push(`/post/${postId}`, postId);
  }



  return (
    <Fragment>
         <div className="banner"></div>
        <header>
            <div>
             <h1>Build an app using React, Suspense &amp; React Router Hooks</h1>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas accumsan suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos</p>
            </div>
            <img src={image} alt="man checking phone with a bird" />
        </header>
        
        <section>
         <div className="posts">
         {posts.map( post => {
             return(
                <div className="post" key={post._id}>
                    <div onClick={(e) => toPost(post._id)} className="cover" style={{backgroundImage: "url(" + post.cover + ")" }}></div>
                </div>

             )
         })}
         </div>
      
        </section>

    </Fragment>
    );
}

export default Main;
