/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { search } from "@/api/index";

import { FaHome } from 'react-icons/fa'

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Search() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.query.q) return;
      setLoading(true);
      try {
        setData(await search(router.query.q));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  return (
    <main className="w-full min-h-screen bg-c-dark text-c-light py-6 px-4 flex flex-col items-center">
      <Header />
      <div className="p-4 text-center w-full mt-10"/>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <svg className="animate-spin h-12 w-12 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4z" />
          </svg>
        </div>
      ) : (
        <section className="w-full flex flex-col gap-4 max-w-[1280px] mx-auto">
          <header className="w-full flex justify-between gap-4 align-center">
            <ul className="flex gap-4 flex-row flex-wrap w-full justify-center">
              {data?.map(({ title, thumbnail, link, episodes, dub }, i) => {
                const href = link.split("/").slice(-1).join("/");
                return (
                  <li key={i} className="relative w-[220px] snap-center bg-c-grey rounded-md overflow-hidden">
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
      )}
      <Footer />
    </main>
  );
}