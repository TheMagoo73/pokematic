const styleMap = [
  {type: 'GRASS', color: 'bg-lime-400'},
  {type: 'POISON', color: 'bg-violet-400'},
  {type: 'WATER', color: 'bg-blue-300'},
  {type: 'GROUND', color: 'bg-yellow-400'},
  {type: 'ROCK', color: 'bg-yellow-500'},
  {type: 'FIRE', color: 'bg-red-400'},
  {type: 'FLYING', color: 'bg-purple-300'},
  {type: 'BUG', color: 'bg-lime-600'},
  {type: 'DRAGON', color: 'bg-purple-500'},
  {type: 'STEEL', color: 'bg-gray-400'},
  {type: 'ELECTRIC', color: 'bg-yellow-300'},
  {type: 'ICE', color: 'bg-cyan-300'},
  {type: 'NORMAL', color: 'bg-gray-400'}
]

export default function ({ type, ...props }) {

  const color = styleMap.find(s => s.type === type.toUpperCase())?.color || 'bg-gray-300'

  return (
    <span className={`inline-flex items-center rounded-md ${color} px-2.5 py-0.5 text-md font-medium text-gray-100 mr-4 mt-2`}>
      {type.toUpperCase()}
    </span>
  )
}