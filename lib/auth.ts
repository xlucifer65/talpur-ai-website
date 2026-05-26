import { cookies } from "next/headers";

const COOKIE_NAME = "talpur_admin";

export function isAuthenticated(): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const token = cookies().get(COOKIE_NAME)?.value;
  return token === password;
}

export { COOKIE_NAME };
