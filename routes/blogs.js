const express = require('express')
const router = require('express').Router();


let Blog = require('../models/blog.model');

//get the blogs

router.get('/',async(req,res)=>{
  
    try{
      const blogs = await Blog.find();
      res.json(blogs);
    }catch(err){
      res.json({message:err});
    }
  })

//add blogs

router.post('/add',async(req,res)=>{
   
    const newBlog = new Blog({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
      });

      try{
        const savedBlog = await newBlog.save();
        res.json(savedBlog);
      }catch(err){
          res.json({message:err});
      }
})


// find specific blogs
router.get('/:id',async(req,res)=>{
    try{
      const blogById = await Blog.findById(req.params.id);
      res.json(blogById);
    }catch(err){
      res.json({message:err});
    }
  })

  //search by name api (promise)
  // router.get('/search/:author',(req,res)=>{
  //  let regex = new RegExp(req.params.author,'i');
  //  Blog.find({author:regex}).then((result)=>{
  //      res.status(200).json(result)
  //  })
  //  .catch(err =>{
  //      console.log(err)
  //  })
  // })

  //search by name api (async/await)
  router.get('/search/:author',async(req,res)=>{
    let regex = new RegExp(req.params.author,'i');
    try{
      const blogByName = await Blog.find({author:regex});
      res.json(blogByName);
    }catch(err){
      res.json({message:err});
    }
  })
 
  
  //delete specific blogs
  router.delete('/:id',async (req,res)=>{
    try{
      const deleteBlog = await Blog.remove({_id:req.params.id});
      res.json(deleteBlog);
    }catch(err){
      res.json({message:err})
    }
  })
  
  // update blogs

  router.put('/:id',async(req,res)=>{
    try{
      const updatedBlog = await Blog.findByIdAndUpdate(
     
      req.params.id,
      req.body,
      {new: true}
      );
      res.json(updatedBlog);
    }catch(err){
      res.json({message:err})
    }
    
  })
  

module.exports = router;