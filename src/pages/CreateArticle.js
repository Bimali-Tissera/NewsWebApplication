import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, update, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';

const initialState = {
    title: "",
    content: "",
    summary: "",
    imageUrl: ""
};

const CreateArticle = () => {
    const [state, setState] = useState(initialState);
    const [image, setImage] = useState(null);
    const { title, content, summary } = state;
    const db = getDatabase();
    const storage = getStorage();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const articleRef = ref(db, `news/${id}`);
            get(articleRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setState(snapshot.val());
                }
            });
        }
    }, [id, db]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !summary || !image) {
            toast.error("Please provide value in each input field and select an image.");
            return;
        }

        try {
            let imageUrl = '';
            if (image) {
                const imageName = `${uuidv4()}-${image.name}`;
                const imageRef = storageRef(storage, `images/${imageName}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const newArticle = { title, content, summary, imageUrl };

            if (id) {
                const articleRef = ref(db, `news/${id}`);
                await update(articleRef, newArticle);
                toast.success("Article updated successfully");
            } else {
                const newsRef = ref(db, 'news');
                await push(newsRef, newArticle);
                toast.success("Article added successfully");
                setState(initialState);
            }

            navigate('/dashboard');
        } catch (error) {
            toast.error("Failed to save article: " + error.message);
        }
    };

    return (
        <div className='bg-gray-500'>
            <NavBar />
            <div className='text-center ml-60 mr-60'>
                <h1 className='text-black text-3xl font-semibold mt-7'>
                    {id ? 'Update Article' : 'Create Article'}
                </h1>
                <form className="shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-10 bg-gray-300" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            name="content"
                            placeholder="Content"
                            value={content}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                            Summary
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="summary"
                            name="summary"
                            type="text"
                            placeholder="Summary"
                            value={summary}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40 mt-6 ml-50"
                    >
                        {id ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateArticle;
