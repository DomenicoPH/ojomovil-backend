import express from 'express';
import cors from 'cors';
import festivalRoutes from './routes/festival.routes';
import festivalAdminRoutes from './routes/festival.admin.routes';
import blogPostRoutes from './routes/blogPost.routes';
import blogPostAdminRoutes from './routes/blogPost.admin.routes';
import authRoutes from './auth/auth.routes';
import shortFilmRoutes from './routes/shortFilm.routes';
import shortFilmAdminRoutes from './routes/shortFilm.admin.routes';

export const app = express();

app.use(cors());
app.use(express.json());

// public routes
app.use('/festival', festivalRoutes);
app.use('/blog', blogPostRoutes);

// auth
app.use('/auth', authRoutes);

// private user routes (JWT required)
app.use('/shortfilms', shortFilmRoutes);

// admin routes
app.use('/admin/festival', festivalAdminRoutes);
app.use('/admin/blog', blogPostAdminRoutes);
app.use('/admin/shortfilms', shortFilmAdminRoutes );


app.get('/health', (_req, res) => {
    res.json({ status: "ok" });
});