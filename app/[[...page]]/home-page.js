'use client'

import { useRouter } from 'next/navigation'
import { Suspense, lazy } from "react"
const PokeCard = lazy(() => import('../../components/PokeCard/PokeCard'))

export default function HomePage({ pokemon, nextPage, previousPage, }) {

  const router = useRouter()

  return (
    <div data-test="home-page">
      <>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

            <h2 className='pb-4'>
              <img src='/pokematic.png' alt="Pokematic"></img>
            </h2>
            <h3 className='font-pokemon tracking-widest pb-16 text-3xl font-bold text-blue-600'>
              The Internet Pokemon index!
            </h3>

            <Suspense fallback={<h4>Loading</h4>}>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {
                  pokemon.map(p => (
                    <PokeCard key={p.id} id={p.id}/>
                  ))
                }
              </div>
            </Suspense>


            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 pt-16">
              {previousPage ? (<button
                type="button"
                className="tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => router.push(`/${previousPage}`)}
                data-test="nav-previous"
              >
                Previous
              </button>) : (<>{` `}</>)}

              {nextPage ? <button
                type="button"
                className="tracking-widest font-pokemon rounded-md text-yellow-400 bg-blue-600 py-2.5 px-3.5 text-2xl shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => router.push(`/${nextPage}`)}
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
  </div>
  )
}
