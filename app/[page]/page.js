import Image from "next/image";
import PokeCard from "../../components/PokeCard/PokeCard";
import siteLogo from '../../public/pokematic.png'
import Link from "next/link";
import { Suspense } from "react";

const pokemonPerPage = 6

async function Nav({page}) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=1`
  )
  const { count } = await data.json()
  console.log(count)
  const totalPages = Math.ceil(parseInt(count, 10) /  pokemonPerPage)

  const hasNext = parseInt(page) < totalPages ? true : false
  const hasPrev = parseInt(page) > 1 ? true : false

  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 pt-16">
      {hasPrev ? (<Link
        href={`/${parseInt(page) - 1}`}
        type="button"
        className="text-center tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        data-test="nav-previous"                
      >
        Previous
      </Link>) : (<>{` `}</>)}

      {hasNext ? <Link
        href={`/${parseInt(page) + 1}`}
        type="button"
        className="text-center tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        data-test="nav-next"
      >
        Next
      </Link> : (<></>)}
    </div>
  )
}

export default async function PokemonPage({params}) {

  const { page } = await params

  const ids = []
  for(let i = 0; i<6; i++) ids.push(((page - 1) *  pokemonPerPage) + (i + 1))

  return (
    <div data-test="home-page">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

          <h1 className='pb-4'>
            <Image src={siteLogo} alt="Pokematic - the Internet Pokemon inder" priority />
          </h1>
          <h2 className='font-pokemon tracking-widest pb-16 text-3xl font-bold text-blue-600'>
            The Internet Pokemon index!
          </h2>

          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {
              ids.map(id => <Suspense fallback={<p>Loading...</p>}><PokeCard id={id} key={id}/></Suspense>)
            }
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Nav page={page}/>
          </Suspense>

        </div>
      </div>
    </div>
  )
}