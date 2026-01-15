import { Request, Response } from'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = '7d';

// POST /auth/register
export const register = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        };

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        };

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash
            }
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// POST /auth/login
export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        };

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        };

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if(!passwordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        };

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET /auth/me
export const me = async (req: AuthRequest, res: Response) => {
    
    if(!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    res.json({
        id: req.user.userId,
        email: req.user.email
    });
};

// POST /auth/logout
export const logout = async (_req: Request, res: Response) => {

    // * JWT stateless → no hace nada
    res.status(200).json({ message: "Logged out" });
};