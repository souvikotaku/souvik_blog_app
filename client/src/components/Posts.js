import react,{useEffect,useState} from 'react'
import axios from 'axios'
import './posts.css'
import UpdatePosts from './UpdatePosts'


export default function(){
   

    const[title,setTitle] = useState('')
    const[desc,setDesc] = useState('')
    const[author,setAuthor] = useState('')
    const [postsearch,setPostsearch] = useState('');
    const[userdata,setUserdata] = useState([])

    

    function clickUpdate(id,title,desc,author){
        let updatebox = document.querySelector(".tablediv");
      
        updatebox.style.display = "block";

        localStorage.setItem('id',id)

        setTitle(title)
        setDesc(desc)
        setAuthor(author)

      }

    function closePanel(id) {
       
        if(window.confirm("are you sure you want to delete the post?")){
            axios.delete("https://souvik-blog-app.herokuapp.com/blogs/" + id).then((res) => {
              // console.log(res.data);
              window.location.reload();
      
            });
          }

      }


     

     useEffect(() =>{

       function getPosts(){
        axios.get('https://souvik-blog-app.herokuapp.com/blogs').then(res => {
            console.log(res.data)
            setUserdata(res.data)
         })
       }

       getPosts()

    
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
	    <p className="card-text" style={{color:'grey'}}>Published by {post.author}</p><br/>

        <button className="btn btn-sm btn-info" onClick={()=>{
            clickUpdate(post._id,post.title,post.description,post.author)
            }}>Edit Post</button>
	  </div>

      
	</div>  

	</aside> 
    <div id="myModal" class="modal tablediv" style={{display: 'none'}} >
        <UpdatePosts
          title={title}
          desc={desc}
          author={author}
        />
    </div>
    
                     </>
                 )
             })
         }
        </>
    )
}
