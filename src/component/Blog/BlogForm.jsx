import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./blogForm.css";


const BlogForm = ({ initialData, onSubmit }) => {


const validationSchema = Yup.object({

title:Yup.string()
.required("Title is required"),


destination:Yup.string()
.required("Destination is required"),


category:Yup.string()
.required("Category is required"),


description:Yup.string()
.min(20,"Minimum 20 characters required")
.required("Description required")

});



const defaultValues={

title:"",
destination:"",
category:"",
description:"",
image:"",
budget:"",
rating:"",
bestTime:""

};





const convertImage=(file,setFieldValue)=>{


if(!file) return;


const reader=new FileReader();



reader.onloadend=()=>{


setFieldValue(
"image",
reader.result
);


};



reader.readAsDataURL(file);



};





return (

<Formik

initialValues={initialData || defaultValues}

validationSchema={validationSchema}

enableReinitialize


onSubmit={(values,{resetForm})=>{


onSubmit(values);


resetForm();


}}


>


{({setFieldValue})=>(


<Form className="blog-form">


<h3>

{
initialData
?
"Edit Blog"
:
"Create Travel Blog"
}

</h3>




<label>
Title
</label>


<Field

name="title"

className="form-control"

placeholder="Enter blog title"

/>


<ErrorMessage

name="title"

component="div"

className="error"

/>





<label>
Destination
</label>


<Field

name="destination"

className="form-control"

placeholder="Example: Manali"

/>


<ErrorMessage

name="destination"

component="div"

className="error"

/>






<label>
Category
</label>


<Field

as="select"

name="category"

className="form-control"

>


<option value="">
Select Category
</option>


<option value="Mountain">
Mountain
</option>


<option value="Beach">
Beach
</option>


<option value="City">
City
</option>


<option value="Adventure">
Adventure
</option>


</Field>



<ErrorMessage

name="category"

component="div"

className="error"

/>






<label>
Description
</label>


<Field

as="textarea"

name="description"

rows="5"

className="form-control"

placeholder="Write your travel experience"

/>



<ErrorMessage

name="description"

component="div"

className="error"

/>







<label>
Budget
</label>


<Field

name="budget"

className="form-control"

placeholder="₹5000"

/>







<label>
Rating
</label>


<Field

name="rating"

className="form-control"

placeholder="5/5"

/>







<label>
Best Time To Visit
</label>


<Field

name="bestTime"

className="form-control"

placeholder="March - June"

/>







<label>
Upload Image
</label>


<input

type="file"

accept="image/*"

className="form-control"


onChange={(e)=>

convertImage(

e.target.files[0],

setFieldValue

)

}


/>




<button

type="submit"

className="btn btn-primary mt-4"

>


{

initialData

?

"Update Blog"

:

"Publish Blog"

}


</button>



</Form>


)}



</Formik>


);


};


export default BlogForm;