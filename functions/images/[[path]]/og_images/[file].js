import * as resvg from "@resvg/resvg-wasm";

export async function onRequestGet(context) {
  await resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm")
  );

  const { request, params, env } = context;

  if (params.file === "og.svg") {
    return env.ASSETS.fetch(request);
  }

  if (params.file !== "og.png") {
    return new Response("Not found", { status: 404 });
  }

  const originalURL = request.url.replace(/\.(png)$/gi, "svg");
  const originalAsset = await env.ASSETS.fetch(new Request(originalURL));

  let svg = await originalAsset.arrayBuffer();
  svg = new Uint8Array(svg);

  const resvgJS = new resvg.Resvg(svg, {
    // logLevel: "debug",
    font: {
      defaultFontFamily: "Jost",
      loadSystemFonts: false,
    },
  });

  const pngBuffer = resvgJS.render().asPng();
  return new Response(pngBuffer, { headers: { "content-type": "image/png" } });
}
