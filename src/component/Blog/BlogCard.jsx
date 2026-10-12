import React from "react";
import {FaHeart,FaEdit,FaTrash} from "react-icons/fa";


const BlogCard = ({
blog,
onLike,
onDelete,
onEdit,
onView
})=>{


return (

<div className="card blog-card">


{
blog.image &&

<img

src={blog.image}

className="card-img-top"

alt={blog.title}

/>

}



<div className="card-body">


<h4>
{blog.title}
</h4>


<p className="text-muted">

📍 {blog.destination}

</p>


<span className="badge bg-success">

{blog.category}

</span>



<p className="mt-3">

{
blog.description.slice(0,120)
}...

</p>



<p>

👤 {blog.author || "Traveler"}

</p>



<button

className="btn btn-outline-danger me-2"

onClick={()=>onLike(blog.id)}

>

<FaHeart/>

&nbsp;

{blog.likes}

</button>




<button

className="btn btn-outline-primary me-2"

onClick={()=>onView(blog)}

>

View

</button>



<button

className="btn btn-outline-warning me-2"

onClick={()=>onEdit(blog)}

>

<FaEdit/>

</button>




<button

className="btn btn-outline-danger"

onClick={()=>onDelete(blog.id)}

>

<FaTrash/>

</button>



</div>


</div>


)


}



export default BlogCard;