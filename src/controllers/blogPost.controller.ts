import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET

// Obtener todos los posts publicados
export const getPublishedBlogPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener un post por slug
export const getPublishedBlogPostBySlug = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if(!post || !post.published){
            return res.status(404).json({ message: "Blog post not found" });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};