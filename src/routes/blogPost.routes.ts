import { Router } from 'express';
import {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
} from '../controllers/blogPost.controller';

const router = Router();

router.get("/", getAllBlogPosts);
router.get("/:slug", getBlogPostBySlug);

router.post("/", createBlogPost);

export default router;