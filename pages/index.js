/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";

import { recents } from "@/api";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoadingFake, setIsLoadingFake] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      recents()
        .then((data) => {
          setData(data);
          setIsLoadingFake(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          setData([]);
          setIsLoadingFake(false);
        });
    }, 1500);
  }, []);

  return (
    <main className="flex flex-col w-screen h-screen text-c_white_1 h-full bg-c_dark_1">
      <Header />
      <section className="w-[100%] max-w-[1820px] mx-auto flex-1 p-8 bg-c_dark_1 text-c_white_1">
        {isLoadingFake ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl py-8">Mais recentes</h1>
            <ul id="episodes" className="flex gap-4 flex-row flex-wrap w-full justify-center">
              {data?.map(
                ( { quality: q, title, link, audio, episodeNumber: ep, thumbnail }, i ) => (
                  <div
                    key={i}
                    className="group/episode overflow-hidden"
                    onClick={() => {
                      window.location.href = `/watch/${encodeURIComponent(link)}`;
                    }}
                  >
                    <li className="w-[320px] h-[280px] relative">
                      <div className="pointer-events-none select-none w-full h-full bg-c_dark_1/60 absolute top-0 left-0 z-5 group-hover/episode:bg-c_dark_1/40 transition-all" />
                      <img
                        src={thumbnail}
                        className="object-cover w-[100%] h-[100%] rounded-md rounded-b-none"
                        alt={title}
                      />
                      <div className="absolute top-4 left-2 flex">
                        <span className="bg-red-600 uppercase text-xs p-1 rounded-md mr-2">
                          {q}
                        </span>
                        <span className="bg-blue-600 uppercase text-xs p-1 rounded-md">
                          {audio}
                        </span>
                      </div>
                      <header className="absolute bottom-4 left-2 right-2">
                        <p className="text-xs shadow-sm">{ep}</p>
                        <h2 className="text-md shadow-sm">{title}</h2>
                      </header>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-c_gray_1/60 scale-95 rounded-full p-2 group-hover/episode:scale-105 transition-all" >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    </li>
                  </div>
                )
              )}
            </ul>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
