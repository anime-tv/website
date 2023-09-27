import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { details } from "@/api";

export default function Details() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.query.title) {
      details(router.query.title).then(setData);
    }
  }, [router]);

  return (
    <main className="flex flex-row h-screen w-full overflow-hidden bg-c-grey text-c-light">
      <aside className="h-full w-[300px] bg-c-grey p-8">
        <h1 className="text-c-light text-lg mb-8">{data?.name}</h1>
        <img src={data?.image} className="w-full object-contain" />
      </aside>

      <div className="w-full">
        <div className="p-4 text-center w-full">
          <span className="text-c-light-2 underline">
            <Link href="/">Home</Link>
          </span>{" "}
          / <span>{data?.name}</span>
        </div>
        <section className="h-full w-full bg-c-dark p-8 overflow-auto">
          <header className="w-full bg-c-grey shadow-sm p-8">
            <h1 className="text-c-light text-lg">Episódios</h1>
          </header>
          <div className="w-full h-[400px] overflow-y-auto">
            <ul className="w-full">
              {data?.episodios.map((ep) => (
                <li key={ep?.numero} className="my-2">
                  <Link
                    href={`/watch/${encodeURIComponent(ep.link)}`}
                    passHref
                    shallow
                  >
                    <div className="w-full text-left relative p-4 bg-zinc-300/20 rounded-lg">
                      {ep.numero}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
