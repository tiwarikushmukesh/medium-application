import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../jwt/verify";

export default async function autologin(c : Context){
    const token = getCookie(c, "token");
    if (!token) return c.json({authentication: false});
    try{   
        const user = await verifyToken(token, c.env.SECRET);
        if (!user) return c.json({authentication: false})
        return c.json({authentication: true});
    }catch(err){
       return c.json({authentication: false}) 
    }
}