import { Hono } from 'hono'
import userRoutes from './routes/auth';
const app = new Hono();
app.route("/api/routes", userRoutes)
export default app
