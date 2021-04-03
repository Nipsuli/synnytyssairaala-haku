import { onSignal } from "./deps.ts";
import { app } from "./app.ts";
import { port } from "./config.ts";

const main = async () => {
  app.addEventListener("error", (evt) => {
    console.log(evt.error);
  });

  const controller = new AbortController();
  const { signal } = controller;

  const appPromise = app.listen({ port, signal });

  const exit = () => {
    console.log("Stopping...");
    controller.abort();
  };

  onSignal(Deno.Signal.SIGINT, exit);
  onSignal(Deno.Signal.SIGTERM, exit);
  onSignal(Deno.Signal.SIGQUIT, exit);

  console.log(`Stariting to listen in port: ${port}`);
  await appPromise;
  console.log("Bye!");
  Deno.exit();
};

if (import.meta.main) {
  await main();
}
