import { jwtVerify } from "jose";
export const verifyToken = async (token: string,secret:string) => {
    try {
        const key = new TextEncoder().encode(secret);
        const { payload } = await jwtVerify(token, key); // { {//payload}, {//algorithm used} }
        return payload;
    }catch (err) {
        return null;
    }
}