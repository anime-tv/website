/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import { details, detailsPage } from "@/api";

export default function Details() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (router.query.title) {
      detailsPage(router.query.title, currentPage).then(setData);
    }
  }, [router, currentPage]);

  const nextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    detailsPage(router.query.title, nextPage).then((newData) => {
      setData(newData);
    });

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: nextPage },
    });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      detailsPage(router.query.title, prevPage).then((newData) => {
        setData(newData);
        window.location.reload();
      });

      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: prevPage },
      });
    }
  };

  return (
    <main className="flex flex-col min-h-screen text-c_white_1 bg-c_dark_1">
      <Header />

      <section className="w-full max-w-screen-lg mx-auto p-8 bg-c_dark_1 text-c_white_1 mt-20">
        <div className="flex flex-col md:flex-row md:items-center">
          <aside className="md:w-1/4 p-4 md:p-8 relative">
            <img src={data?.image} className="w-full object-contain" />
            <h1 className="text-c-light text-lg my-2 md:my-0 text-center">
              {data?.name}
            </h1>
          </aside>
          <div className="md:w-3/4 md:pl-8">
            <h1 className="text-4xl py-4 md:py-8">Sinopse :</h1>
            <h1 className="text-c-light">{data?.sinopse}</h1>
          </div>
        </div>
      </section>

      <div>
        {data?.episodios?.length > 34 ? (
          <div className="flex flex-wrap justify-center items-center py-4">
            <div className="flex flex-wrap justify-center items-center max-w-screen-md mx-auto">
              {data?.episodios.map((ep) => (
                <button
                  key={ep?.numero}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold w-20 h-20 md:w-16 md:h-16 rounded mb-2 md:mb-0 md:mr-2 mx-2 my-2"
                  onClick={() => {
                    window.location.href = `/watch/${encodeURIComponent(
                      ep.link
                    )}`;
                  }}
                >
                  {ep?.numero}
                </button>
              ))}
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={prevPage}
              >
                Página Anterior
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={nextPage}
              >
                Próxima Página
              </button>
            </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center py-4">
            <div className="flex flex-wrap justify-center items-center max-w-screen-md mx-auto">
              {data?.episodios.map((ep) => (
                <button
                  key={ep?.numero}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold w-20 h-20 md:w-16 md:h-16 rounded mb-2 md:mb-0 md:mr-2 mx-2 my-2"
                  onClick={() => {
                    window.location.href = `/watch/${encodeURIComponent(
                      ep.link
                    )}`;
                  }}
                >
                  {ep?.numero}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
