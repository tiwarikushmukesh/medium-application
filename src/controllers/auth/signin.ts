import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { MESSAGE_MATCHER_IS_ALREADY_BUILT } from "hono/router";
export const signin = async (c : Context) => {
    try{
        // values form user
        const body = await c.req.json<
        {
            email:string;
            password:string;
        }
        >();
        const {email, password} = body;
        // prisma client
        const prisma = createPrisma(c.env.DATABASE_URL);
        // check user exists
        const user = await prisma.user.findUnique({
            where : {email}
        });
        if (!user) return c.json({message : "User not found"},404);
        // password checking
        const validPassword = await bcrypt.compare(user.password, password);
        if (!validPassword) return c.json({message: "Invalid email or password"},400);
        //
        return c.json({message: "Loged in successfully!"});
    }catch(err){
        return c.json({error : "Error while logging"},500);
    }
}