import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { search } from '@/api/index'

import Header from "@/components/Header/Header"

export default function Search() {
  const router = useRouter()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (router.query.q) {
      search(router.query.q).then(setData)
    }
  }, [router])

  return (
    <main className='w-full min-h-screen bg-c-dark text-c-light py-6 px-4'>
      <Header />
      <div className='p-4 text-center w-full mt-10'>
        <span className='text-c-light-2 underline'>
          <Link href='/'>Home</Link>
        </span>{' '}/ <span>Search</span>
      </div>
      <div className='flex flex-col gap-10'>
        <section className='w-full flex flex-col gap-4 max-w-[1280px] mx-auto'>
          <header className='w-full flex justify-between gap-4 align-center'>
            <ul className='grid grid-cols-5 gap-4 w-full overflow-x-auto pb-4 snap-x'>
              {data?.map(({ title, thumbnail, link }, i) => {
                const href = link.split('/').slice(-1).join('/')
                return (
                  <li key={i} className='relative w-[220px] snap-center bg-c-grey rounded-md overflow-hidden'>
                    <a href={'/anime/' + href}>
                      <figure className='shadow-sm'>
                        <span className='rounded-full p-2 flex align-center justify-center bg-c-dark-opacity  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10'>
                        </span>
                        <img src={thumbnail} className='w-full aspect-square object-cover rounded-md rounded-b-none select-none opacity-75' />
                        <figcaption className='px-4 py-2 select-none text-c-light'>
                          <span className='line-clamp-2'>{title}</span>
                        </figcaption>
                      </figure>
                    </a>
                  </li>
                )
              })}
            </ul>
          </header>
        </section>
      </div>
    </main>
  );
}