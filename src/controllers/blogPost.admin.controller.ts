import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET

// Obtener todos los posts: publicados y no publicados
export const getAllBlogPostsAdmin = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener un post por slug (aunque no esté publicado)
export const getBlogPostBySlugAdmin = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
        });

        if(!post){
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

// Modificar un post (por slug)
export const updateBlogPost = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    try {

        const { title, excerpt, content, category, published } = req.body;
        const updatedPost = await prisma.blogPost.update({
            where: { slug },
            data: {
                title,
                excerpt,
                content,
                category,
                published,
                publishedAt: published ? new Date() : null,
            },
        });

        res.json(updatedPost);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE

// Eliminar un post
export const deleteBlogPost = async (req: Request, res: Response) => {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

    try {

        await prisma.blogPost.delete({
            where: { slug },
        })

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}