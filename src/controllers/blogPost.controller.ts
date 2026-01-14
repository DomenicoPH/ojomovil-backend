import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET

// Obtener todos los posts publicados
export const getAllBlogPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { published: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener un post por slug
export const getBlogPostBySlug = async (req: Request, res: Response) => {
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

// POST

// Crear un nuevo post
export const createBlogPost = async (req: Request, res: Response) => {
    try {

        const { title, slug, excerpt, content, category, published } = req.body;
        const post = await prisma.blogPost.create({
            data: {
                title, 
                slug, 
                excerpt, 
                content, 
                category, 
                published, 
                publishedAt: published ? new Date() : null
            }
        });
        res.status(201).json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// PUT

// Modificar un post

// DELETE