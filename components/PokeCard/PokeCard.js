import axios from "axios"
import Link from "next/link"
import useSWR from 'swr'

export default function PokeCard({id, ...props}) {

  const fetcher = url => axios.get(url).then(res => res.data)

  const { data: pokemon, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`, fetcher) 

  return (
    <Link href={`/pokemon/${id}`}>
    <div
      key={id}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >

      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
        <img
          className="h-full w-full object-cover object-center sm:h-full sm:w-full" 
          src={`https://raw.githubusercontent.com/sashafirsov/pokeapi-sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        />
      </div>
      
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="tracking-wider text-3xl font-light text-blue-600 font-pokemon">
            {pokemon?.name?.toUpperCase()}
        </h3>
        <div className="flex flex-1 flex-col justify-end">
          <p>HP: {pokemon?.stats?.find(({stat}) => stat.name === 'hp')['base_stat']}</p>
          <p>Attack: {pokemon?.stats?.find(({stat}) => stat.name === 'attack')['base_stat']}</p>
          <p>Defense: {pokemon?.stats?.find(({stat}) => stat.name === 'defense')['base_stat']}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}