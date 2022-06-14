export async function onRequestGet(context) {
  const { request } = context;

  let url = new URL(request.url);
  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");

  return fetch(imageURL, {
    cf: {
      image: {
        width: 1280,
        height: 640,
        draw: [
          {
            url: "https://zeevo.co/images/header.svg",
            top: 10,
            right: 10,
            background: "rgb(5 2 26)",
          },
        ],
      },
    },
  });
}
