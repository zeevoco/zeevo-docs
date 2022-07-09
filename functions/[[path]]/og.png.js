import * as resvg from "@resvg/resvg-wasm";

export async function onRequestGet(context) {
  const { request, env } = context;

  const url = request.url.replace(/(png)$/gi, "svg");
  const asset = await env.ASSETS.fetch(new Request(url)).catch(() => null);

  if (asset == null) {
    return new Response("Not found", { status: 404 });
  }

  let svg = await asset.arrayBuffer();
  svg = new Uint8Array(svg);

  await resvg.initWasm(
    fetch("https://unpkg.com/@resvg/resvg-wasm@2.0.1/index_bg.wasm")
  );

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
