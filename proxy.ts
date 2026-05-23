import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  const intlResponse = intlMiddleware(req);

  if (pathname.startsWith(`/${locale}/admin`)) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      if (!payload.isAdmin) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }
    } catch {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/", "/(de|en)/:path*", "/(de|en)/admin/:path*"],
};
