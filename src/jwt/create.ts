import { SignJWT, JWTPayload } from "jose";
export const generateToken = async (payload:JWTPayload,secret:string) => {
    const key = new TextEncoder().encode(secret);
    const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"}).setExpirationTime("1h").sign(key);
    return token;
}