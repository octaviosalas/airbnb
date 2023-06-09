import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import StructureForHotels from '../components/StructureForHotels'
import NavBar from '../components/Navbar'
import Spinner from 'react-bootstrap/Spinner'; //bootstrap spinner load
import "../styles/structurehotels.css"


const SouthAmericaHotels = () => {

    const [hotels, setHotels] = useState([])
    const [load, setLoad] = useState(true)

 
    const getAmericanHotels = () => { 
       axios.get("http://localhost:4000/getHotels")
            .then((res) => { 
               const docs = res.data
               const southAmericaHotels = docs.filter(hotel => hotel.continent === "sudamerica")
               setTimeout(() => { 
                  setHotels(southAmericaHotels)
                  setLoad(false)
               }, 1500)
            })
            .catch((err) => { 
               console.log(err)
            })
    }

    useEffect(() => { 
        getAmericanHotels()
    }, [])



  return (
    <div> 

         {load ? <div className='loading-div'>
                    <Spinner animation="border" role="status"> <span className="visually-hidden">Loading...</span> </Spinner>
                 </div>
               : 
              <>
      
   
                   <div className='title-container'>
                       <h3 className='title'>South America Hotels</h3>
                   </div>

                   

                        <div className='container-americann'>
                            {hotels.map((h) => <StructureForHotels hotels={h}/>)}
                        </div>

                      


                  
           </> 
   }
      
</div>
  )
}

export default SouthAmericaHotels
