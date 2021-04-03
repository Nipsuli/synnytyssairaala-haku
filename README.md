## Synnytys sairaala haku

Fetching closest hospital to give birth in finland

Old meets new, backend running with
[Deno](https://deno.land/manual/getting_started/installation) and front end with
vanilla javascript.

Requires google api with maps api enabled as `GOOGLE_API_KEY` env variable.

Run locally with `./watch`

_Everything_ formatted with `deno fmt`

Web server runs in Heroku, there is Cloudflare worker with caching in front,
everyting is deployed with GH actions.

TODO:

- add styling
