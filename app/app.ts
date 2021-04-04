import {
  Application,
  createHttpError,
  isHttpError,
  oakHelpers,
  Router,
  send,
  Status,
} from "./deps.ts";
import { hospitalDistance } from "./hospital_search.ts";

export const app = new Application();
// Error handiling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      ctx.response.status = err.status;
      switch (err.status) {
        case Status.NotFound:
          ctx.response.body = "Not found";
          break;
        default:
          console.log("Http error:", err);
          ctx.response.body = "No bonus";
          break;
      }
    } else {
      // rethrow if you can't handle the error
      // Perhaps use generic 500 here
      console.log("Unexpected error:", err);
      throw err;
    }
  }
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Router
const router = new Router({ prefix: "/api" });
router
  .get("/d", async (ctx) => {
    const params = oakHelpers.getQuery(ctx);
    if (!params.o) {
      throw createHttpError(400, "Missing query param");
    }
    const res = await hospitalDistance(decodeURI(params.o));
    ctx.response.body = JSON.stringify(res, null, 2);
  });
app.use(router.routes());
app.use(router.allowedMethods());

// Static files
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});
