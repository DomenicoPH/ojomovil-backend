import { Router } from 'express';
import {
    createBlogPost,
    deleteBlogPost,
    updateBlogPost,
    getAllBlogPostsAdmin,
    getBlogPostBySlugAdmin
} from '../controllers/blogPost.admin.controller';

const router = Router();

// Admin routes

router.get('/', getAllBlogPostsAdmin);
router.get("/:slug", getBlogPostBySlugAdmin);

router.post("/", createBlogPost);

router.put('/:slug', updateBlogPost);

router.delete('/:slug', deleteBlogPost);

export default router;