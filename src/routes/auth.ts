import { Hono } from "hono";
import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";
const userRoutes = new Hono();
userRoutes.post("/signup",signup);
userRoutes.post("/signin",signin);
export default userRoutes;