import React from 'react'
import { Link} from 'react-router-dom'

function Dashboard() {
  return (
    <div className='p-4'>
        <Link to='/createArticle'>
        <button className="bg-gray-500  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40">
         Create Article
        </button>
        </Link>
        
    </div>
  )
}

export default Dashboard