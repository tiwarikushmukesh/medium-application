import { Hono } from "hono";
import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";
import { signUpZod } from "../middlewares/signUpZod";
import { signInZod } from "../middlewares/signInZod";

const userRoutes = new Hono();
userRoutes.post("/signup",signUpZod,signup);
userRoutes.post("/signin",signInZod,signin);

export default userRoutes;