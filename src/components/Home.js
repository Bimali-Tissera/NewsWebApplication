import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import NavBar from './NavBar';

const Home = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const db = getDatabase(); // Initialize Firebase Database
        const newsRef = ref(db, 'news'); // Reference to the 'news' node

        // Listen for changes in the database
        onValue(newsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const articlesArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setArticles(articlesArray);
            } else {
                setArticles([]);
            }
        });
    }, []);

    return (
        <div className="container mx-auto ">
          <NavBar/>
            <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <div key={article.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src="/img/card-top.jpg" alt="News Image" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{article.title}</div>
                            <p className="text-gray-700 text-base">{article.content}</p>
                            <p className="text-gray-700 text-base mt-4">{article.summary}</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #news
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #latest
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
