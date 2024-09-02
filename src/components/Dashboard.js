import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import NavBar from '../components/NavBar';

const Dashboard = () => {
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

    const onDelete = (id) => {
        if (window.confirm("Are you sure that you want to delete the article?")) {
            const db = getDatabase();
            const articleRef = ref(db, `news/${id}`);

            remove(articleRef)
                .then(() => {
                    toast.success("Article Deleted Successfully");
                    setArticles(articles.filter(article => article.id !== id)); // Update the state to remove the deleted article from the list
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    return (
        
        <div>
          <NavBar/>
            <div className='p-4'>
                <Link to='/createArticle'>
                    <button className="bg-gray-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40">
                        Create Article
                    </button>
                </Link>
            </div>
            <div className='text-center'>
                <h1 className='text-black text-3xl font-semibold'>Dashboard</h1>
                <table className="min-w-full mt-7 mb-7">
                    <thead>
                        <tr>
                            <th className="py-2 bg-gray-500">Title</th>
                            <th className="py-2 bg-gray-500">Content</th>
                            <th className="py-2 bg-gray-500">Summary</th>
                            <th className="py-2 bg-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <tr key={article.id} className="text-center">
                                    <td className="border px-4 py-2">{article.title}</td>
                                    <td className="border px-4 py-2">{article.content}</td>
                                    <td className="border px-4 py-2">{article.summary}</td>
                                    <td>
                                        {/* <Link to={`/editArticle/${article.id}`}>
                                            <button className="bg-gray-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40">
                                                Edit
                                            </button>
                                        </Link> */}
                                        <Link to={`/editArticle/${article.id}`}>
                                            <button className="bg-gray-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40">
                                            Edit
                                            </button>
                                        </Link>

                                        <button
                                            className="bg-gray-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => onDelete(article.id)}  // Pass the correct id here
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No articles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
