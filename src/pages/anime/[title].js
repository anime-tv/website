/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import { detailsPage, detailPageBeta } from "@/api";

export default function Details() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataBeta, setDataBeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEpisodeDataBeta = useCallback((title) => {
    setLoading(true);
    detailPageBeta(title, currentPage)
      .then((newData) => {
        setDataBeta(newData);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const fetchEpisodeData = useCallback((title, page) => {
    setLoading(true);
    detailsPage(title, page)
      .then((newData) => {
        setData(newData);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (router.query.title) {
      fetchEpisodeData(router.query.title, currentPage);
      fetchEpisodeDataBeta(router.query.title);
    }
  }, [router.query.title, currentPage, fetchEpisodeData, fetchEpisodeDataBeta]);

  const episodesPerPage = 31; 

  const hasNextPage = dataBeta && dataBeta.length >= episodesPerPage;
  const hasPreviousPage = currentPage > 1;

  return (
    <main className="flex flex-col min-h-screen text-c_white_1 bg-c_dark_1">
      <Header />

      <section className="w-full max-w-screen-lg mx-auto p-8 bg-c_dark_1 text-c_white_1 mt-20">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {data && !loading && dataBeta && !loading && (
          <div>
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

            <div className="flex flex-wrap justify-center items-center py-4">
              <div className="flex flex-wrap justify-center items-center max-w-screen-md mx-auto">
                {dataBeta.map((ep) => (
                  <button
                    key={ep.title}
                    className="bg-gray-400 hover-bg-gray-500 text-white font-bold w-20 h-20 md:w-16 md:h-16 rounded mb-2 md:mb-0 md:mr-2 mx-2 my-2"
                    onClick={() => {
                      window.location.href = `/watch/${encodeURIComponent(ep.href)}`;
                    }}
                  >
                    {ep.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              {hasPreviousPage && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Página Anterior
                </button>
              )}

              {hasNextPage && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próxima Página
                </button>
              )}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
