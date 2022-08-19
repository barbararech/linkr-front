import API from "./constants.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function NumComments({id}){
    const [numComment, setNumComment] = useState(0)


    useEffect(() => {
        const requestId = axios.get(
          `${API}/comments/${id}` 
        );
        requestId
          .then((response) => {
            setNumComment(response.data[0].postComments);
            // console.log(postComments)
            console.log(response.data)
          })
          .catch((err) => {
            console.error(err);
          });
      }, [])

      
    return(
        <>
        {numComment}
        </>
    )
}