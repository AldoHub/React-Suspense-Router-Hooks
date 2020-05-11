import React from "react";
import { Switch, Route } from "react-router-dom";

const Main = React.lazy(() => import("./components/Main"));
const AddPost = React.lazy(() => import("./components/AddPost"));
const Post = React.lazy(() => import("./components/Post"));


const Routes = () => (

    <React.Suspense fallback={<span>Loading, please wait...</span>}>

        <Switch>
            <Route exact path="/" render= {() => <Main/>} />
            <Route exact path="/addpost" render= {() => <AddPost/>} />
            <Route exact path="/post/:id" render= {() => <Post/>} />
        </Switch>


    </React.Suspense>

)

export default Routes;