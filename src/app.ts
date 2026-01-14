import express from 'express';
import cors from 'cors';
import festivalRoutes from './routes/festival.routes';
import blogPostRoutes from './routes/blogPost.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/festival', festivalRoutes);
app.use('/blog', blogPostRoutes);

app.get('/health', (_req, res) => {
    res.json({ status: "ok" });
});