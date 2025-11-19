import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../jwt/create";

export const signin = async (c : Context) => {
    try{
        // values form user
        const {email, password} = c.get("parsedValue");
        // prisma client
        const prisma = createPrisma(c.env.DATABASE_URL);
        // check user exists
        const user = await prisma.user.findUnique({
            where : {email}
        });
        if (!user) return c.json({message : "User not found"},404);
        // password checking
        const validPassword = await bcrypt.compare(password ,user.password);
        if (!validPassword) return c.json({message: "Invalid email or password"},400);
        // generate token
        const userId = user.id
        const payload = {
            userId,
            email,
        }
        const token = await generateToken(payload,c.env.SECRET);
        return c.json({message:"Logged in successfully.",token:token},200)
    }catch(err){
        return c.json({error : "Error while logging"},500);
    }
}