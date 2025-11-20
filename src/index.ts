import { Hono } from 'hono'
import userRoutes from './routes/auth';
import { blogRoutes } from './routes/blog';
const app = new Hono();
app.route("/api/routes/user", userRoutes) // signup, signin
app.route("/api/routes/blog", blogRoutes) 
export default app
