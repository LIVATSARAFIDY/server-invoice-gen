import { PrismaClient } from "../../generated/prisma";
import { hash, compare } from "bcrypt";

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import 'dotenv/config';


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET ?? "DEFAULT_SECRET_KEY";

export const register = async (req:Request , res: Response) => {
    const { firstname, lastname, email, password, userStatus, roleId } = req.body
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        
        if(existingUser) return res.status(409).json({ error: 'User already exists' })
        
        const hashedPassword = await hash(password, 10)
        
        const newUser = await prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                userStatus,
                roleId,
                password: hashedPassword
            }
        })
        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return res.status(201).json({ token, user: newUser })
    } catch (error) {
        console.log('error registration', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const login = async (req:Request , res: Response) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({ where: { email },include: { role: true } })
        if(!user) return res.status(401).json({ error: 'Invalid credentials' })
        
        const isValid = await compare(password, user.password)
        
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return res.status(200).json({
            token,
            user: user,
        })
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}