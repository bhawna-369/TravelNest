import React from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../component/Blog/BlogForm";
import { saveBlog } from "../../utils/blogStorage";


const CreateBlog = () => {

const navigate = useNavigate();



const handleCreate = (values)=>{


const newBlog = {

id: Date.now(),

title: values.title,

destination: values.destination,

category: values.category,

description: values.description,

image: values.image,

budget: values.budget,

rating: values.rating,

bestTime: values.bestTime,


author:"Samaira",


likes:0,


comments:[],


createdAt:new Date()
.toISOString()
.split("T")[0]


};



saveBlog(newBlog);



alert("Blog Created Successfully 🎉");



navigate("/blog");


};





return (

<div className="container mt-5">


<div className="row justify-content-center">


<div className="col-md-8">


<BlogForm

onSubmit={handleCreate}

/>


</div>


</div>


</div>

);


};


export default CreateBlog;