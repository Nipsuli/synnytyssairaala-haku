## Synnytys sairaala haku

Fetching closest hospital to give birth in Finland

Running in https://synnytyssairaalat.korvenlaita.fi/

Tech:

- Backend and web server with
  [Deno](https://deno.land/manual/getting_started/installation) and
  [Oak](https://github.com/oakserver/oak)
- Frontend plain VanillaJS + [Bootsrap](https://getbootstrap.com) for styles.
- Automatically deployed with GH actions
- Backend running in Heroku
- Caching with Cloudflare workers (WIP)

Run locally with `./watch`, requires google api with maps api enabled as
`GOOGLE_API_KEY` env variable.

_Everything_ formatted with `deno fmt`
