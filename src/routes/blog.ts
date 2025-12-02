import { Hono } from "hono";
import { tokenValidation } from "../middlewares/verifyToken";
import { createBlog } from "../controllers/blog/create";
import { status } from "../controllers/blog/status";
import { allblogs } from "../controllers/blog/blogs";
import { userAllBlogs } from "../controllers/blog/userAllBlogs";
import blogbyid from "../controllers/blog/blogbyid";
import save from "../controllers/blog/save";

export const blogRoutes = new Hono();

blogRoutes.post("/create",tokenValidation,createBlog); // blog created not published
blogRoutes.put("/save",tokenValidation,save); // saved the blog
blogRoutes.put("/status",tokenValidation,status); // publish or unpublish
blogRoutes.get("/allblogs",allblogs); // get all the blog from database.
blogRoutes.get("/userAllBlogs",tokenValidation, userAllBlogs); // get all the user blogs
blogRoutes.get("/:id",tokenValidation,blogbyid);

