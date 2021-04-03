FROM hayd/alpine-deno:1.8.2 as builder

WORKDIR /app
RUN deno install --allow-read --allow-write --allow-hrtime -n minifier https://deno.land/x/minifier@v1.1.1/cli.ts
COPY ./.env.example .
COPY ./app/deps.ts .
RUN deno cache --unstable deps.ts

COPY ./app /app
RUN deno compile --allow-net --allow-env --allow-read --unstable --output=app main.ts

COPY ./static /app/static
RUN minifier ./static/index.html
# minifier doesn't strip comments --> f'ups the js file (p.-)
RUN sed -i 's/\/\/.*$//g' static/js/index.js
RUN minifier ./static/js/index.js
# apperently need to use deno container even with the compliled app
FROM hayd/alpine-deno:1.8.2 
RUN  addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app
COPY --from=builder --chown=app:app /app /app
CMD ["./app"]
