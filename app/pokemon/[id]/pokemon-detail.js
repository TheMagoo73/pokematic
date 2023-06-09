'use client'

import { useRouter } from "next/navigation"
import TypeBadge from "../../../components/TypeBadge/TypeBadge"

export default ({ name, image, types, stats }) => {

  const router = useRouter()

  const handleBack = (e) => {
    router.back()
  }

  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

        {/* Pokemon details */}
        <div className="lg:max-w-lg lg:self-end"> 

          <div className="mb-8 font-semibold text-md">
            <a href="#" onClick={e => handleBack(e)} data-test="nav-back">&lt;Back</a>
          </div>
        
          <h1 
            className="font-pokemon tracking-wider text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl mb-4 sm:mb-8"
            data-test="pokemon-name"
          >
            {name.toUpperCase()}
          </h1>

          <ul className="flex flex-wrap mb-6" data-test="pokemon-types">
            {
              types?.map(t => (<li key={t}><TypeBadge type={t}/></li>))
            }
          </ul>

          <div className="font-extrabold text-xl">Base Stats</div>
            <table className="min-w-full divide-y divide-gray-300 font-lg" data-test="pokemon-stats">
              <tbody className="bg-white">
                <tr>
                  <td>HP</td>
                  <td className="font-bold">{stats.hp}</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td>Attack</td>
                  <td className="font-bold">{stats.attack}</td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td className="font-bold">{stats.defense}</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td>Sp. Atk</td>
                  <td className="font-bold">{stats['special-attack']}</td>
                </tr>
                <tr>
                  <td>Sp. Def</td>
                  <td className="font-bold">{stats['special-defense']}</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td>Speed</td>
                  <td className="font-bold">{stats.speed}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className="font-extrabold">{stats.total}</td>
                </tr>
              </tbody>
            </table>

        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img src={image} className="h-full w-full object-cover object-center" data-test="pokemon-image" alt={`${name.toUpperCase}`}/>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
