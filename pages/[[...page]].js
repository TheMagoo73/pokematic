import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PokeCard from '../components/PokeCard/PokeCard'

const pokemonPerPage = 6

export default function Home({ pokemon, nextPage, previousPage, }) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Pokematic</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet"/>
      </Head>
      <>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

            <h2 className='pb-4'>
              <img src='/pokematic.png' alt="Pokematic"></img>
            </h2>
            <h3 className='font-pokemon tracking-widest pb-16 text-3xl font-bold text-blue-600'>
              The Internet Pokemon index!
            </h3>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {
                pokemon.map(p => (
                  <PokeCard key={p.id} id={p.id}/>
                ))
              }
            </div>


            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 pt-16">
              {previousPage ? (<button
                type="button"
                className="tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => router.push({pathname: `/${previousPage}`})}
                data-test="nav-previous"
              >
                Previous
              </button>) : (<>{` `}</>)}

              {nextPage ? <button
                type="button"
                className="tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => router.push({pathname: `/${nextPage}`})}
                data-test="nav-next"
              >
                Next
              </button> : (<></>)}
            </div>

          </div>

        <div>

      </div>


      </div>
    </>
  </>
  )
}

export const getStaticPaths = async () => {

  const { data: { count }} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=1`
  )

  const totalPages = Math.ceil(parseInt(count, 10) /  pokemonPerPage)

  const paths = [
    { params: { page: [] }}
  ]
 
  for(let i = 1; i <= totalPages; i++) {
    paths.push({
      params: { page: [`${i}`] }
    })
  }

  return ({ 
    paths,
    fallback: 'blocking' 
  })

}

export const getStaticProps = async ({ params: { page } }) => {

  const currentPage = parseInt(page) || 1
  const offset = (currentPage - 1) * pokemonPerPage

  const { data: pokeIndex} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`
  )

  return {props: {
    pokemon: pokeIndex.results.map(p => ({url: p.url, id: p.url.split('/')[6]})),
    nextPage: pokeIndex.next ? currentPage + 1 : null,
    previousPage: pokeIndex.previous ? currentPage -1  : null,
  }}
}