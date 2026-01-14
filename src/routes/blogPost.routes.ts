import { Router } from 'express';
import {
    createBlogPost,
    deleteBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    updateBlogPost
} from '../controllers/blogPost.controller';

const router = Router();

router.get("/", getAllBlogPosts);
router.get("/:slug", getBlogPostBySlug);

router.post("/", createBlogPost);

router.put('/:slug', updateBlogPost);

router.delete('/:slug', deleteBlogPost);

export default router;