import { Hono } from "hono";
import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";
import { signUpZod } from "../middlewares/signUpZod";
import { signInZod } from "../middlewares/signInZod";
import autologin from "../controllers/autologin";
import {logout} from "../controllers/auth/logout";

const userRoutes = new Hono();
userRoutes.post("/signup",signUpZod,signup);
userRoutes.post("/signin",signInZod,signin);
userRoutes.get("/me", autologin);
userRoutes.post("/logout",logout)
export default userRoutes;