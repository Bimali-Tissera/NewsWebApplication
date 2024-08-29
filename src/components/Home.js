import React, { useState } from 'react'
import {useEffect} from 'react'

function Home() {
    const [news,setNews] = useState([])
    
    const getNews= () => {
        fetch("https://newsapi.org/v2/everything?q=Apple&from=2024-08-29&sortBy=popularity&apiKey=c8621448e7e44e6dbd4fb660aba6a11e")
        .then(res => res.json())
        .then(json => setNews(json.articles))
    }

    useEffect(() => {
        getNews()
    },[news])  
 
    console.log(news)
    
    
  return (
    <div className='mt-12 p-5 ml-6 grid grid-cols-4'>
        {news.map((data) => {
            return <>

            <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src={data.urlToImage} alt="Sunset in the mountains"/>
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{data.title}</div>
                <p class="text-gray-700 text-base">
                 {data.content}
                </p>
            </div>
            
            </div>
            
            </>
        }

        )}
    </div>
  )
}

export default Home