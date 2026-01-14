import { Router } from 'express';
import {
    getAllBlogPosts,
    getBlogPostBySlug,
} from '../controllers/blogPost.controller';

const router = Router();

router.get("/", getAllBlogPosts);
router.get("/:slug", getBlogPostBySlug);

export default router;