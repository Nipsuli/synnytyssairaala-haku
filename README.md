## Synnytyssairaalahaku

Fetching closest hospital to give birth in Finland

Running in https://synnytyssairaalat.korvenlaita.fi/

Tech:

- Backend and dev web server with
  [Deno](https://deno.land/manual/getting_started/installation) and
  [Oak](https://github.com/oakserver/oak)
- Frontend is plain VanillaJS + [Bootsrap](https://getbootstrap.com) for styles.
- Automatically deployed with [GH actions](https://github.com/features/actions)
- Backend running in [Heroku](https://www.heroku.com/)
- Frontend served with
  [Cloudflare Workers](https://developers.cloudflare.com/workers/)

I know, could have done this easier, but that was not the main point 😅

Run locally with `./watch`, requires google api with maps api enabled as
`GOOGLE_API_KEY` env variable.

To run just frontend with dev worker against production backend do
`wrangler dev` in `./cache-proxy`. Requires to be logged in with
[wrangler](https://github.com/cloudflare/wrangler)

`./cache-proxy` dir formated with [`prettier`](https://prettier.io) everything
else formatted with `deno fmt`
