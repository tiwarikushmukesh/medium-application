import { Hono } from 'hono'
import userRoutes from './routes/auth';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';
import autologin from './controllers/autologin';
const app = new Hono();
const allowedOrigins = [
  "http://localhost:5173",
  "https://blogging-20t7odorm-kush-tiwaris-projects.vercel.app",
  "https://blogging-iota-ten.vercel.app",
  "https://blogging-kush-tiwaris-projects.vercel.app",
];

app.use('/api/*', cors({
  origin: (origin) => {
    if (allowedOrigins.includes(origin)) {
      return origin; // return exact string
    }
    return ""; // block others
  },
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Type"],
  maxAge: 600,
}));
app.route("/api/routes/user", userRoutes) // signup, signin
app.route("/api/routes/blog", blogRoutes) 
export default app
