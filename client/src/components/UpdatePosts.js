import React,{useState,useEffect} from "react"
// import "./Addmodal.css"
import { useForm } from "react-hook-form";
import axios from "axios";


function UpdatePosts(props){

  const { register, handleSubmit, errors } = useForm();
  const[title,setTitle] = useState('')
  const[desc,setDesc] = useState('')
  const[author,setAuthor] = useState('')
  const [change, setChange] = useState(false);


  const onSubmit=()=>{
    
    let id = localStorage.getItem('id')


    const update_data={
      title: title,
      description: desc,
      author: author,
    }

    axios.put("https://souvik-blog-app.herokuapp.com/blogs/" + id,update_data).then((res) => {
      alert("Your post has been updated successfully")
  
       window.location.reload();


     }
     );
  }


  function closePanel2() {
    let modal = document.getElementById("myModal");
    

    modal.style.display = "none";

    localStorage.removeItem('id')
if(change){
  window.location.reload()

}else{
  setChange(false)
}
  }
    

  

    return(
      <div style={{display:'flex',justifyContent: 'center'}}>
<div class="updatebox" >
<span class="close" onClick={closePanel2}>&times;</span>

 <form onSubmit={handleSubmit(onSubmit)} >

   <div style={{textAlign:'center',paddingTop:'2%'}} className="form-group">
   <h1 >Edit Posts</h1><br/>

   </div>
<div style={{textAlign:'center'}}>
            <input type="text" 
            defaultValue={props.title || title} 
            placeholder="Enter Title"
            required
            className="form-control"
            onChange={(event)=>{
              setTitle(event.target.value)
              setDesc(props.desc || desc)
              setAuthor(props.author || author)
              setChange(true);

            }}
         />
</div>
        
        <br/>
        <div style={{textAlign:'center'}}>
        
        <textarea
        type="text" 
        defaultValue={props.desc || desc}  
        placeholder="Enter Description"
        required
        className="form-control"

        onChange={(event)=>{
          setDesc(event.target.value)
          setTitle(props.title || title)
          setAuthor(props.author || author)
          setChange(true);

        }}
        />
        </div>
        
        <br/>
       
        <div style={{textAlign:'center'}}>
            <input type="text"
            defaultValue={props.author || author}   
            placeholder="Enter Author"
            required
            className="form-control"

            onChange={(event)=>{
              setAuthor(event.target.value)
              setDesc(props.desc || desc)
              setTitle(props.title || title)
              setChange(true);

            }}
         />
</div>

<br/>
        <div  style={{textAlign:'center'}}>
            <button className="btn btn-success btn-md" type="submit" disabled={!change? 'none' : ''} >Update Post</button>
        </div>
        
         
     </form>
    </div>
 </div>
    )
}

export default UpdatePosts
