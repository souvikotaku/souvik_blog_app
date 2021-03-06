import react,{useEffect,useState} from 'react'
import axios from 'axios'
import './posts.css'


export default function(){
   

    const[userdata,setUserdata] = useState([])

    function closePanel(id) {
       
        if(window.confirm("are you sure you want to delete the post?")){
            axios.delete("http://localhost:5001/blogs/" + id).then((res) => {
              // console.log(res.data);
              window.location.reload();
      
            });
          }

      }

     useEffect(() =>{

        function fetchPosts(){
          axios.get('http://localhost:5001/blogs').then(res => {
             console.log(res.data)
             setUserdata(res.data)
          })
        }

        fetchPosts()
     },[])

    return(
        <>
         {
             userdata.map(post =>{
                 return (
                     <>

                     
	<aside className="col-md-4 col-sm-12" style={{padding:'10px'}}>

	<div className="card">

	  <div className="card-body">
      <span class="close" onClick={()=>{closePanel(post._id)}}>&times;</span>

	  	<h5 className="card-title">{post.title}</h5>
	    <p className="card-text">{post.description}</p>
	    <p className="card-text">{post.author}</p><br/>

        <button className="btn btn-sm btn-info">Edit Post</button>
	  </div>
	</div>  

	</aside> 

    <div>
        
    </div>
                     </>
                 )
             })
         }
        </>
    )
}