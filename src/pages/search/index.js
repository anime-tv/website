/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { search } from "@/api/index";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Search() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.query.q) {
      search(router.query.q).then(setData);
    }
  }, [router]);

  return (
    <main className="w-full min-h-screen bg-c-dark text-c-light py-6 px-4">
      <Header />
      <div className="p-4 text-center w-full mt-10">
        <span className="text-c-light-2 underline">
          <Link href="/">Home</Link>
        </span>{" "}
        / <span>Search</span>
      </div>
      <div className="flex flex-col gap-10">
        <section className="w-full flex flex-col gap-4 max-w-[1280px] mx-auto">
          <header className="w-full flex justify-between gap-4 align-center">
            <ul className="flex gap-4 flex-row flex-wrap w-full justify-center">
              {data?.map(({ title, thumbnail, link, episodes, dub }, i) => {
                const href = link.split("/").slice(-1).join("/");
                return (
                  <li
                    key={i}
                    className="relative w-[220px] snap-center bg-c-grey rounded-md overflow-hidden"
                  >
                    <a href={"/anime/" + href}>
                      <figure className="relative">
                        <img
                          src={thumbnail}
                          className="w-full aspect-square object-cover rounded-md rounded-b-none select-none shadow-sm opacity-50"
                          alt={title}
                        />
                        <div className="absolute top-4 left-2 flex">
                          <span className="bg-red-600 uppercase text-xs p-1 rounded-md mr-2">
                            {episodes}
                          </span>
                          <span className="bg-blue-600 uppercase text-xs p-1 rounded-md">
                            {dub}
                          </span>
                        </div>
                        <figcaption className="px-4 py-2 select-none text-c-light">
                          <span className="line-clamp-2">{title}</span>
                        </figcaption>
                      </figure>
                    </a>
                  </li>
                );
              })}
            </ul>
          </header>
        </section>
      </div>
      <Footer />
    </main>
  );
}
