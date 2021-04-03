## Synnytys sairaala haku

Fetching closest hospital to give birth in finland

Old meets new, backend running with
[Deno](https://deno.land/manual/getting_started/installation) and front end with
vanilla javascript.

Requires google api with maps api enabled as `GOOGLE_API_KEY` env variable.

Cache install deps:

```
deno cache --unstable app/deps.ts
```

Run in watcher:

```
deno run --allow-net --allow-env --allow-read --watch --unstable app/main.ts
```

Everything formatted with `deno fmt`

TODO:

- add styling
- deployment
