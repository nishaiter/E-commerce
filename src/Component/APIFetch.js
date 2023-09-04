import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
// import Search from "./Search";

export default function APIFetch(){

    var API='https://fakestoreapi.com/products/';
    const[api,setapi]=useState([]);
    const[a,seta]=useState("");
    // const [selectedImage, setSelectedImage] = useState(null);
    useEffect(()=>{
        axios.get(API).then(res=>{
            console.log(res.data);
            setapi(res.data);
        })
    },[])

    
    function getFilteredList() {
        if (!a) {
          return api;
        }
        return api.filter((item) => item.category === a);
      }
      var filteredList = useMemo(getFilteredList, [a, api]);

    const myfunc=(ev)=>{
        console.log(ev);
        seta(ev);
        
    }
    return(
        <div className="container">
            <div className="text-center search">
                <select value={a} onChange={(ev)=>myfunc(ev.target.value)} >
                
                    <option value="" >Select what to Search</option>
                    
                    <option value="jewelery">jewelery</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select>
            </div>
            
            
            <h1 className=" mt-5">Products</h1>
            <div className="row">

            {
                 filteredList && filteredList.map(obj=>
                    <div className="col-xxl-3 mt-5" >
                        <img src={obj.image} className="img-fluid"/>
                        <h2>{obj.price}</h2>
                        <p>{obj.title}</p>
                        <p>
                            <Link to={'/singleproduct/'+obj.id}>Details</Link>
                        </p>
                    </div>
)
            }
            </div>
           
        </div>
    )
}