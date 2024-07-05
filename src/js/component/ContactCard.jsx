import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import '../../styles/contactcard.css'


// const urlBaseContact = "https://playground.4geeks.com/contact/agendas"	

const ContactCard = () => {

    const intialContact = {
        name: "",
        phone: "",
        email: "",
        address: ""
    }

    const { store, actions } = useContext(Context)

    console.log(store.contacts);
    const [contact, setContact] = useState([])


    const handleChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        })
    }


return (
    <>
       {store.contact?.map((item)=>{
            <div key={item.id} className="container container-border">
                <div className="row d-flex">
                    <div className="col-2 justify-content-center">
                        <img className="profile-img my-3 ms-4" src="https://picsum.photos/200/200" alt="Profile picture" />    
                    </div>
                    <div className="col-8 my-3 justify-content-left">
                        <h5 className="mt-1 ms-4">{item.name}</h5>  
                        {/* <ul className="">
                            <li>
                                <i class="fas fa-map-marker-alt me-3"></i>
                                {item.address}
                            </li>
                            <li>
                                <i class="fas fa-phone me-3"></i>
                                {item.phone}
                            </li>
                            <li>
                                <i class="fas fa-envelope me-3"></i>
                                {item.email}
                            </li>
                        </ul>   */}
                    </div>
                    <div className="col-2 my-4 d-flex justify-content-evenly">
                        <i class="fas fa-pencil-alt right-icons"></i>
                        <i class="fas fa-trash-alt right-icons"></i>
                    </div>
                </div>
            </div>})}
    </>
)
}

export default ContactCard