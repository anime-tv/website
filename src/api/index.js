export async function recents() {
  const url = 'https://animesvision.vercel.app/home/episodios'
  const resp = await fetch(url)

  return resp.json()
}

export async function watch(title, ep, dub) {
  const url = `https://animesvision.vercel.app/anime/player?link=https://animes.vision/animes/${title}/${ep}/${dub}`
  const resp = await fetch(url)

  return resp.json()
}

export async function search(title) {
  const url = 'https://animesvision.vercel.app/anime/search?name=' + title
  const resp = await fetch(url)

  return resp.json()
}

export async function details(title) {
  const url = 'https://animesvision.vercel.app/anime/detalhes?link=https://animes.vision/animes/' + title
  const resp = await fetch(url)

  return resp.json()
}