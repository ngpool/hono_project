import { Hono } from "hono";

const app = new Hono();

let blogPosts = [
    {
      id: "1",
      title: "blog1",
      content: "blog1 posts",
    },
    {
      id: "2",
      title: "blog2",
      content: "blog2 posts",
    },
    {
      id: "3",
      title: "blog3",
      content: "blog3 posts",
    },
    ];
    
    app.get("/",(c) => c.json({posts: blogPosts}));
    
    
    app.get("/:id",(c) => {
    const id = c.req.param("id");
    const post = blogPosts.find((p)=>p.id === id);
    
    if(post){
      return c.json(post);
    }else{
      return c.json({ message: "not found this page"},404)
    }
    });
    
    app.post("/",async(c)=>{
      const{ title, content} = await c.req.json<{
        title:string,
        content:string
      }>();
      const newPost = { id: String(blogPosts.length + 1),title, content};
      blogPosts.push(...blogPosts, newPost);
      return c.json(newPost, 201);
    });
    
    app.put("/:id", async (c) => {
      const id = c.req.param("id");
      const index = blogPosts.findIndex((p) => p.id === id);
      
      if(index === -1){
        return c.json({ message: "not found this page"},404)
      }
    
      const {title, content} = await c.req.json();
      blogPosts[index] = { ...blogPosts[index], title, content};
    
      return c.json(blogPosts[index]);
    }
    
    );
    
    app.delete("/:id", async (c) => {
      const id = c.req.param("id");
      const index = blogPosts.findIndex((p) => p.id === id);
      
      if(index === -1){
        return c.json({ message: "not found this page"},404)
      }
    
    blogPosts = blogPosts.filter((p) => p.id !== id);
    
    return c.json({message: "Blog post Deleted"});
    });
    
    export default app;