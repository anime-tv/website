import { useRef } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const searchRef = useRef()

  const onSearch = evt => {
    evt.preventDefault()

    const query = searchRef?.current?.value?.trim()

    if (!query?.length) {
      return setError('Preencha o campo de pesquisa')
    }

    router.push(`/search?q=${query}`)
  }

  // <Image src={logo} alt='Minha Imagem' width={200} height={100} />
  return (
    <header className='flex flex-col items-center w-full'>

      <form
        className='w-full mt-12 flex flex-col items-center'
        onSubmit={onSearch}
      >
        <fieldset className='flex align-center mx-auto w-full max-w-[400px] bg-c-grey text-c-light rounded-md shadow-sm'>
          <labe htmlFor='searchField' className='p-4 pl-4 flex items-center'>
            <svg stroke='currentColor' fill='none' strokeWidth='2' viewBox='0 0 24 24' strokeLinecap='round' strokeLinejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><circle cx='11' cy='11' r='8' /><line x1='21' y1='21' x2='16.65' y2='16.65' /></svg>
          </labe>
          <input
            ref={searchRef}
            id='searchField'
            placeholder='Pesquisar anime'
            className='bg-transparent w-full outline-none border-none p-2'
            type='text'
          />
        </fieldset>
      </form>
    </header>
  )
}
