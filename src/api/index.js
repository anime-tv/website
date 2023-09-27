export async function recents() {
  const url = "https://animesvision.vercel.app/home/episodios";
  const resp = await fetch(url);

  return resp.json();
}

export async function watch(link) {
  const url = `https://animesvision.vercel.app/anime/player?link=${link}`;
  const resp = await fetch(url);

  return resp.json();
}

export async function search(title) {
  const url = "https://animesvision.vercel.app/anime/search?name=" + title;
  const resp = await fetch(url);

  return resp.json();
}

export async function details(title) {
  const url = "https://animesvision.vercel.app/anime/detalhes?link=https://animes.vision/animes/" + title;
  const resp = await fetch(url);

  return resp.json();
}
