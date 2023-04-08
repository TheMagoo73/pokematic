import axios from 'axios'
import PokemonDetail from './pokemon-detail'


export default async function Home({params: { id }}) {

  const {name, image, types, stats } = await getPokemonDetail(id)

  return <PokemonDetail image={image} name={name} stats={stats} types={types} key={id}/>
}

export async function generateStaticParams () {
  const { data: { count: totalPokemonCount }} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=1`
  )

  const { data: pokeIndex} = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemonCount}`
  )

  const paths = pokeIndex.results.map(p => ({ id:  p.url.split('/')[6] }))

  return paths
}

const getPokemonDetail = async (id) => {

  const { data: pokemon } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  )

  return({
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/sashafirsov/pokeapi-sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    types: pokemon.types.sort((p1, p2) => p1.slot - p2.slot).map(p => p.type.name),
    stats: {
      ...pokemon.stats.reduce((a, s) => ({...a, [s.stat.name]: s['base_stat']}) , {}),
      total: pokemon.stats.reduce((a, s) => a + s['base_stat'], 0)}
  })
}