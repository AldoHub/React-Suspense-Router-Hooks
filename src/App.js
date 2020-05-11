import React, {useState, useEffect} from 'react';
import Routes from "./routes";
import { Link, useHistory } from "react-router-dom";


function App() {

  const history = useHistory();
  const [path, setPath] = useState("");


  const checkPath = () => {
    history.listen((location) => {
      setPath(location.pathname);
    });
  }

  useEffect(() => {
    checkPath();
  }, []);

  const showContact = path;
  let addpostpage;
  if(showContact !== "/addpost"){
    addpostpage = (<li><Link to="/addpost">New Post</Link></li>)
  }


  return (
    <div className="App">
     <div className="container">
       <nav>
         <ul>
           <li><Link to="/"> LazyLoading </Link></li>
         </ul>
         <ul>
         {addpostpage}
         </ul>
       </nav>
       <Routes/>
     </div>
    </div>
  );
}

export default App;
