import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
getBlogs,
toggleLike
} from "../../utils/blogStorage";

import CommentSection from "../../components/CommentSection";

import {FaHeart} from "react-icons/fa";


const BlogDetails = ()=>{


const {id}=useParams();

const navigate=useNavigate();


const [blog,setBlog]=useState(null);

const [refresh,setRefresh]=useState(false);



useEffect(()=>{


const blogs=getBlogs();


const selectedBlog=blogs.find(

(item)=>

item.id === Number(id)

);



setBlog(selectedBlog);



},[id,refresh]);





const handleLike=()=>{


toggleLike(blog.id);


setRefresh(
prev=>!prev
);


};





if(!blog)

return (

<div className="container mt-5">

<h3>
Blog Not Found
</h3>

</div>

);






return (


<div className="container mt-5">



<button

className="btn btn-secondary mb-4"

onClick={()=>navigate(-1)}

>

← Back

</button>





<div className="card shadow-lg p-3">



{

blog.image &&

<img

src={blog.image}

className="img-fluid rounded"

alt={blog.title}

/>

}






<div className="card-body">



<h1>

{blog.title}

</h1>



<h5 className="text-muted">

📍 {blog.destination}

</h5>




<span className="badge bg-success">

{blog.category}

</span>




<p className="mt-4">

{blog.description}

</p>




<div className="row mt-3">


<div className="col-md-4">

💰 Budget:

<br/>

<strong>
{blog.budget || "Not mentioned"}
</strong>


</div>



<div className="col-md-4">

⭐ Rating:

<br/>

<strong>
{blog.rating || "Not rated"}
</strong>


</div>




<div className="col-md-4">

🗓 Best Time:

<br/>

<strong>
{blog.bestTime || "Not mentioned"}
</strong>


</div>



</div>





<hr/>




<p>

👤 Author:

<strong>
{" "}
{blog.author}

</strong>

</p>



<p>

📅 Created:

<strong>
{" "}
{blog.createdAt}

</strong>

</p>





<button

className="btn btn-danger"

onClick={handleLike}

>

<FaHeart/>

&nbsp;

{blog.likes}

</button>





<CommentSection

blog={blog}

setRefresh={setRefresh}

/>





</div>



</div>



</div>


);


};



export default BlogDetails;