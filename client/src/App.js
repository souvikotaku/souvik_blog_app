import './App.css';
import React,{useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from "axios";
import Posts from './components/Posts'



function App() {

  const { register, handleSubmit, errors } = useForm();
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [author,setAuthor] = useState("");

  const onSubmit=()=>{
     
    let form_data = {
      title: title,
      description: desc,
      author: author,
    }

    console.log(form_data)

    axios.post('http://localhost:5001/blogs/add',form_data).then(res => {
      
        alert('post has been submitted successfully')
        window.location.reload();
      
    })
  }


  return (
    <>
    <Router>

    <h1>Write Post</h1><br/>
    <form onSubmit={handleSubmit(onSubmit)}>

    <input 
    required
    type="text" 
    placeholder="Enter Title"
    defaultValue={title}
    onChange = {(event) =>{
      setTitle(event.target.value)
    }}
    /><br/>

    <textarea 
    required
    type="text" 
    placeholder="Enter Description"
    defaultValue={desc}
    onChange = {(event) =>{
      setDesc(event.target.value)
    }}
    /><br/>

    <input 
    required
    type="text" 
    placeholder="Enter Author Name"
    defaultValue={author}
    onChange = {(event) =>{
      setAuthor(event.target.value)
    }}
    /><br/>

    <button
            type="submit"
            variant="contained"
            className=" btn btn-primary"
    >
            Submit Post
    </button>
    </form>

    <div style={{backgroundColor:'red',padding:'15px'}} className="row">
      <Posts/>
    </div>
    
    <Switch>
      {/* <Route path='/' exact component={Home}/>
      <Route path='/update' component={Updatemodal}/> */}
    </Switch>
    </Router>
    </>
  );
}

export default App;
