import React,{useState,useEffect,useRef,useHistory} from 'react'
import {dbRealtime} from '../firebase/setup';
import NavBar from '../components/NavBar';
import photo from '../images/photo.jpg';
// import {toast} from "react-toastify"

const initialState={
    name:"",
    email:"",
    contact:"",
}



const CreateArticle =()  =>{
    const [state,setState] =useState(initialState);
    const [data,setData] =useState({});
    const {title,content,summary} = state;
    const history = useHistory();
    const handleInputChange = (e) => {
       const{name,value} = e.target;
       setState({...state,[name]: value})

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !content || !summary){
            // toast.error("Please provide value in each input field");
            
        } else{
            dbRealtime.child("news").push(state,(err) =>{
                if (err){
                    // toast.error(err);

                }else {
                    // toast.success("Article added successfully")
                }
            });
            // setTimeout(() => history.push("/dashboard"),500)
        }
    };
    const inputRef = useRef(null);
    const [image,setImage] =useState("");
    
    const handleImageClick =() => {
        inputRef.current.click();
    }

    const handleImageChange =(event) => {
       const file = event.target.files[0];
       console.log(file);
        setImage(event.target.files[0]);
 }

    return (
       
       <div className=' bg-gray-500 '>
        <NavBar/>
            <div className='text-center ml-60 mr-60 '>
            <h1 className='text-black text-3xl font-semibold mt-7'>Create Article</h1>   
            {/* <form class=" shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-10 bg-gray-300" onSubmit={handleSubmit}>

                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                    Title
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" value={title} onChange={handleInputChange}/>
                </div>

                <div class="mb-6">  
                <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                    Content
                </label>
                <textarea className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="content" name="content"  placeholder="Content" value={content} onChange={handleInputChange}/>
                </div>

                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="summary">
                    Summary
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="summary" name="summary" type="text" placeholder="Summary" value={summary} onChange={handleInputChange}/>
                </div>
    
                <div className='grid grid-cols-2 flex h-70'>
                
                    <div onClick={handleImageClick} className='w-70' >
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Upload Image
                    </label>
                        {image ? 
                            <img src={URL.createObjectURL(image)} className='w-50 h-30'/>

                        : <img src={photo} className='w-50 h-30'/>
                        
                    }
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
                        
                    </div>

                    {/* <div>
                    <button className="bg-gray-500  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40 mt-7 ml-3 h-7">
                    Upload
                    </button>
                    </div> */}

                    

                {/* </div>

                <button className="bg-gray-500  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-40 mt-6 ml-50">
                <input type='submit' value="Create"/>
                    </button>
                 */}

               
                

            {/* </form> */} 
            
            </div>
            
           
            </div>   

  )
}

export default CreateArticle