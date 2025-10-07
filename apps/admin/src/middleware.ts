// import type { NextRequest } from "next/server";
// import { auth0 } from "./lib/auth0";

// export async function middleware(request: NextRequest) {
//   return await auth0.middleware(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

// --- CORS 辅助函数 ---
// const ALLOWED_ORIGIN = "http://localhost:5173";
const ALLOWED_ORIGIN = "*";

/**
 * 设置 CORS 头部
 * @param response 要修改的响应对象
 */
function setCorsHeaders(response: NextResponse): NextResponse {
  // 1. 设置 Access-Control-Allow-Origin，允许你的 React/Vite 前端端口访问
  response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);

  // 2. 设置允许的方法
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );

  // 3. 设置允许的头部，Authorization 是用于 Auth0 令牌的关键
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // 4. 设置预检请求的缓存时间 (可选)
  response.headers.set("Access-Control-Max-Age", "86400");

  // 5. 允许发送 Cookie（如果你的 Auth0 或 API 需要）
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}
// --- CORS 辅助函数结束 ---

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. **预检请求 (OPTIONS) 专用处理**
  // 如果是 OPTIONS 请求且目标是 API 路由，我们只返回 CORS 头部，不进行 Auth0 认证。
  if (request.method === "OPTIONS" && pathname.startsWith("/api")) {
    // 创建一个空的 200 响应
    const response = NextResponse.json({}, { status: 200 });
    // 添加 CORS 头部并返回
    return setCorsHeaders(response);
  }

  // 2. **运行 Auth0 中间件**
  // Auth0 可能会返回一个 Response (如重定向) 或一个 Promise<Response>
  const response = await auth0.middleware(request);

  // 3. **为 API 路由添加 CORS 头部**
  // 我们只为 API 路由添加 CORS 头部，不影响其他页面路由
  if (pathname.startsWith("/api") && response) {
    return setCorsHeaders(response);
  }

  return response;
}

// 你的 Matched 配置已经很好了，但为了让 CORS 匹配更精确，可以考虑只匹配 /api 路由
// 不过为了不干扰你现有的全局 Auth0 逻辑，我们保留你的配置。
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
