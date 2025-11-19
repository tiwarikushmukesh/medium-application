import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
export const signup = async (c : Context) => {
    try {
        // required values
        const {firstName, lastName, email, password} = c.get("parsedValue");
        // prisma client 
        const prisma = createPrisma(c.env.DATABASE_URL)
        // check user already exist
        const isUser = await prisma.user.findUnique({
            where: {email}
        })
        if (isUser) return c.json({message: "User already exits!"},400);
        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10)
        // adding user to database
        await prisma.user.create({
            data : {
                firstName,
                lastName,
                email,
                password : hashedPassword
            }
        })
        return c.json({message:"User Created Successfully!"},201)
    }catch(err){
        return c.json({error: "Error creating user"},500); 
    }
}