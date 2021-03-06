import React,{useState,useEffect} from "react";
// import { useForm } from "react-hook-form";
import axios from "axios";
import './posts.css'


export default function SearchPage(){

    function closePanel3() {
        let modal = document.getElementById("myModal2");
        
    
        modal.style.display = "none";
    
      }

   function closePanel4(id) {
    
        if(window.confirm("are you sure you want to delete the post?")){
            axios.delete("https://souvik-blog-app.herokuapp.com/blogs/" + id).then((res) => {
              // console.log(res.data);
              window.location.reload();
      
            });
          }
    
   }

   const[postdata,setPostdata] = useState([]);
   const[postsearch,setPostsearch] = useState('');

  


   function clicksearch(){
    

      axios.get(`https://souvik-blog-app.herokuapp.com/blogs/search/${postsearch}`).then(res => {
        console.log(res.data)
        setPostdata(res.data)
     })
      
   }

    return(
        <div class="searchBox" >
       <span class="close" onClick={closePanel3}>&times;</span><br/><br/>

       <input
     
     className='form-control col col-sm-12'
    defaultValue={postsearch}
    placeholder='Enter author name'
     onChange={(event)=>{
       setPostsearch(event.target.value);
       
     }}
    />


<br/>
    <button className='btn btn-info btn-block ' onClick={clicksearch}>search</button><br/>
<div style={{overflow:'scroll',height: '60%'}}>

    {
        postdata.map(post=>{
            return (
                <>
<div style={{backgroundColor:'white',padding:'15px',width:'100%'}} >
                     
                     <aside className="col-md-12 col-sm-12" >
                 
                     <div className="card">
                 
                       <div className="card-body">
                       <span class="close" onClick={()=>{closePanel4(post._id)}}>&times;</span>
                 
                           <h5 className="card-title">{post.title}</h5>
                         <p className="card-text">{post.description}</p>
                         <p className="card-text">{post.author}</p><br/>
                 
                        
                       </div>
                 
                       
                     </div>  
                 
                     </aside> 
</div>


    </>
            )
        })
    }
</div>

    <div>
        <h5 id="titleone" style={{color:'red'}}></h5>
        
    </div>

 
        </div>
    )
}
