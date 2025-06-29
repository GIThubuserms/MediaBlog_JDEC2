import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { useAuthcontext } from "./Authcontext.jsx";

export const PostContext = createContext();


export const Postprovider = ({ children }) => {
    const [currentpage, setcurrentpage] = useState(1);
    const [post, setposts] = useState([]);
    const [loading, setloading] = useState(false);
    const {user}=useAuthcontext()
 
    
    useEffect(() => {
        async function fetchposts() {
         
              if (user) {
                  try {
                      setloading(true);
                      
                      const res = await axios.post(
                          `https://mediaweb.onrender.com/api/v1/post/getpost/?pageNum=${currentpage}&&postsperpage=10`,
                          {},
                          { withCredentials: true, }
                      );
      
                      if (res && res.data.message) {
                          // Set the new posts directly, ensuring no old data persists
                          setposts(res.data.message);
                      } else {
                          console.error("No posts returned from the API.");
                          setposts([]); // Clear posts if no data
                      }
                      
                  } catch (error) {
                      console.error("Error fetching posts:", error.message);
                      setposts([]); // Clear posts on error
                  } finally {
                      setloading(false);
                  }
              }
            }

        fetchposts();
    }, [currentpage,user]); // Trigger useEffect on page change

    return (
        <PostContext.Provider value={{ currentpage, setcurrentpage,setposts,post, loading}}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    return useContext(PostContext);
};
