const BLOG_KEY = "travelnest_blogs";

// Get all blogs
export const getBlogs = () => {
  const blogs = localStorage.getItem(BLOG_KEY);

  return blogs ? JSON.parse(blogs) : [];
};


// Save complete blog array
const saveBlogs = (blogs) => {
  localStorage.setItem(BLOG_KEY, JSON.stringify(blogs));
};


// Add new blog
export const saveBlog = (blog) => {
  const blogs = getBlogs();

  blogs.push(blog);

  saveBlogs(blogs);
};


// Update existing blog
export const updateBlog = (updatedBlog) => {
  const blogs = getBlogs();

  const updatedBlogs = blogs.map((blog) =>
    blog.id === updatedBlog.id ? updatedBlog : blog
  );

  saveBlogs(updatedBlogs);
};


// Delete blog
export const deleteBlog = (id) => {
  const blogs = getBlogs();

  const filteredBlogs = blogs.filter(
    (blog) => blog.id !== id
  );

  saveBlogs(filteredBlogs);
};


// Like system
export const toggleLike = (id) => {

  const blogs = getBlogs();

  const updatedBlogs = blogs.map((blog)=>{

    if(blog.id === id){

      return {
        ...blog,
        likes: blog.likes + 1
      };

    }

    return blog;

  });


  saveBlogs(updatedBlogs);
};



// Add comment
export const addComment = (id, comment)=>{

 const blogs = getBlogs();


 const updatedBlogs = blogs.map((blog)=>{

   if(blog.id === id){

     return{
       ...blog,
       comments:[
        ...blog.comments,
        comment
       ]
     }

   }


   return blog;

 });


 saveBlogs(updatedBlogs);

};



// Delete comment
export const deleteComment=(blogId,commentId)=>{

const blogs=getBlogs();


const updatedBlogs=blogs.map((blog)=>{


 if(blog.id===blogId){

   return{

    ...blog,

    comments:
    blog.comments.filter(
      (comment)=>comment.id!==commentId
    )

   }

 }


 return blog;


});


saveBlogs(updatedBlogs);


};