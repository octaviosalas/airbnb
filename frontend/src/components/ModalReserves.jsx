import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../styles/detaill.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CustomModal = ({ title, body, bodyTwo, bodyThree, bodyFour, onClose, showMsjConfirmate }) => {

    const userCtx = useContext(UserContext)
    const [userName, setUserName] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()
    console.log(userCtx.userId)

    const getUserNameToNavBar = () => { 
      axios.get(`http://localhost:4000/getUserById/${userCtx.userId}`)
           .then((res) => {
            console.log(res.data)
            setTimeout(() => { 
              setUserName(res.data.name)
            }, 500)
      
          })
           .catch((err) => console.log(err))
     }
  
     useEffect(() => { 
       getUserNameToNavBar()
     }, [])

    const sendMyReserv = () => { 
        const newReserv = { 
           hotelId: id,
           userId: userCtx.userId,
           userName: userName,
           name: title,
           checkIn: body,
           checkOut: bodyTwo,
           amountPeople: bodyThree,
           totalPrice: bodyFour
        }
        axios.post("http://localhost:4000/reserves", newReserv)
             .then(({data}) => { 
              console.log(data.message)
              onClose()
              showMsjConfirmate()
             })
             .catch((err) => { 
              console.log(err)
             })
    }

  return ( 
            
    
      <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title><p>The Hotel You Have Choosen is: <b>{title}</b> </p> </Modal.Title>
      </Modal.Header>
      <Modal.Body>
                   <p>You are about to confirm your reservation. The day of arrival will be <b>{body}</b> </p>  
                   <p>"The day of departure will be: <b>{bodyTwo}</b></p> 
                   <p>Reserve a room for: <b>{bodyThree}</b></p> 
                   <p>The stay will have a value of: <b>{bodyFour} USD 💲</b></p>
            
      </Modal.Body>
      <Modal.Body>
        <div style={{display:"flex"}}>
             <Button className='definitive-confirm' style={{color:"black", background:"lightblue", boder:"lightblue", marginLeft: "3vh"}} onClick={() => sendMyReserv()}>Confirm and send me the Email</Button>
            <Button className='definitive-confirm' style={{color:"black", background:"lightblue", boder:"lightblue", marginLeft: "3vh"}} onClick={() => onClose()}>I Regret</Button>
        </div>
            
      </Modal.Body>
    </Modal>

  );
};

export default CustomModal;

