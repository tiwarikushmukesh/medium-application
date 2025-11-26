import { Hono } from 'hono'
import userRoutes from './routes/auth';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';
import autologin from './controllers/autologin';
const app = new Hono();
app.use("/api/*", cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.route("/api/routes/user", userRoutes) // signup, signin
app.route("/api/routes/blog", blogRoutes) 
export default app
