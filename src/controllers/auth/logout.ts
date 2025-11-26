import { Context } from "hono";
import { setCookie } from "hono/cookie";

export function logout(c: Context) {
  try {
    setCookie(c, "token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 0
    });

    return c.json(
      { message: "Logged Out" },
      { status: 200 } // ✅ Correct TS-safe syntax
    );

  } catch (err) {
    return c.json(
      { message: "Error logging out!" },
      { status: 500 }
    );
  }
}
