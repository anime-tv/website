/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import { detailsPage, detailPageBeta } from "@/api";

export default function Details() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataBeta, setDataBeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (router.query.title) {
      fetchEpisodeData(router.query.title, currentPage);
      fetchEpisodeDataBeta(router.query.title, currentPage);
    }
  }, [router.query.title, currentPage]);

  const fetchEpisodeData = (title, page) => {
    detailsPage(title, page).then((newData) => {
      setData(newData);
    });
  };

  const fetchEpisodeDataBeta = (title) => {
    detailPageBeta(title).then((newData) => {
      setDataBeta(newData);
    });
  };

  return (
    <main className="flex flex-col min-h-screen text-c_white_1 bg-c_dark_1">
      <Header />

      <section className="w-full max-w-screen-lg mx-auto p-8 bg-c_dark_1 text-c_white_1 mt-20">
        {data && (
          <div className="flex flex-col md:flex-row md:items-center">
            <aside className="md:w-1/4 p-4 md:p-8 relative">
              <img
                src={data.image}
                alt={data.name}
                className="w-full object-contain"
              />
              <h1 className="text-c-light text-lg my-2 md:my-0 text-center">
                {data.name}
              </h1>
            </aside>
            <div className="md:w-3/4 md:pl-8">
              <h1 className="text-4xl py-4 md:py-8">Sinopse:</h1>
              <p className="text-c-light">{data.sinopse}</p>
            </div>
          </div>
        )}

        {dataBeta && (
          <div className="flex flex-wrap justify-center items-center py-4">
            <div className="flex flex-wrap justify-center items-center max-w-screen-md mx-auto">
              {dataBeta.map((ep) => (
                <button
                  key={ep.title}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold w-20 h-20 md:w-16 md:h-16 rounded mb-2 md:mb-0 md:mr-2 mx-2 my-2"
                  onClick={() => {
                    window.location.href = `/watch/${encodeURIComponent(
                      ep.href
                    )}`;
                  }}
                >
                  {ep.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
