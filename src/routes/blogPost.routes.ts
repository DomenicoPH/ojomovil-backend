import { Router } from 'express';
import {
    getPublishedBlogPosts,
    getPublishedBlogPostBySlug
} from '../controllers/blogPost.controller';

const router = Router();

// Public routes

router.get("/", getPublishedBlogPosts);
router.get("/:slug", getPublishedBlogPostBySlug);

export default router;