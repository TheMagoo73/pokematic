import axios from 'axios'
import HomePage from './home-page'

const pokemonPerPage = 6

export default async function Home({params: { page }}) {

  const {pokemon, previousPage, nextPage} = await getPokemon(page || 1)

  return <HomePage pokemon={pokemon} previousPage={previousPage} nextPage={nextPage} />
}

export async function generateStaticParams () {

  const { data: { count }} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=1`
  )

  const totalPages = Math.ceil(parseInt(count, 10) /  pokemonPerPage)

  const paths = []
 
  for(let i = 1; i <= totalPages; i++) {
    paths.push({ page: [`${i}`] })
  }

  return (paths)
}

const getPokemon = async (page) => {

  const currentPage = parseInt(page) || 1
  const offset = (currentPage - 1) * pokemonPerPage

  const { data: pokeIndex} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`
  )

  return {
    pokemon: pokeIndex.results.map(p => ({url: p.url, id: p.url.split('/')[6]})),
    nextPage: pokeIndex.next ? currentPage + 1 : null,
    previousPage: pokeIndex.previous ? currentPage -1  : null,
  }
}