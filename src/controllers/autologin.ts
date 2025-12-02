import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../jwt/verify";
import { createPrisma } from "../lib/prisma";

export default async function autologin(c : Context){
    const token = getCookie(c, "token");
    if (!token) return c.json({authentication: false});
    try{   
        const user = await verifyToken(token, c.env.SECRET);
        if (!user) return c.json({authentication: false})
        const prisma = createPrisma(c.env.DATABASE_URL);
        console.log(user.userId)
        const userInfo = await  prisma.user.findUnique({
            where : {
                id : <string>user.userId
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true
            }
        })
        return c.json({authentication: true,user: userInfo});
    }catch(err){
       return c.json({authentication: false}) 
    }
}