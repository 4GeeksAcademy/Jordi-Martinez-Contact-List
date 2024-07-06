import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const initialContact = {
    name: "",
    phone: "",
    email: "",
    address: ""
};

const AddContact = () => {
    const { store, actions } = useContext(Context)
    const params = useParams()
    const [contact, setContact] = useState(initialContact);

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            if (contact.name.trim() !== "" && contact.email.trim() !== "" && contact.phone.trim() !== "" && contact.address.trim() !== "") {

                let response = await actions.addContact(contact)

                if (response) {
                    setContact(initialContact)
                    // alert("Contact Added")
                    Swal.fire({
                        text: "Contact Added",
                        icon: "success"
                    });
                } else {

                    Swal.fire({
                        text: "Error at saving new contact",
                        icon: "error"
                    });
                }
            }
            
            else {
                // alert("Error at saving de new contact")

                Swal.fire({
                    text: "All paramaters are needed",
                    icon: "error"
                });
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const searchContact = () => {
        let existent = store?.contacts.find((item) => item.id == params.id)
        setContact(existent)
    }


    const handlePutSubmit = async (id) => {
        try {
            if (contact.name.trim() !== "" && contact.email.trim() !== "" && contact.phone.trim() !== "" && contact.address.trim() !== "") {

                let response = await actions.putContact(contact, id)

                if (response) {
                    Swal.fire({
                        text: "Contact edited",
                        icon: "success"
                    }).then(() => { navigate("/"); })
                } else {
                    // alert("Error at saving de new contact")

                    Swal.fire({
                        text: "Error at saving contact",
                        icon: "error"
                    });
                }
            }
            else {
                // alert("Error at saving de new contact")

                Swal.fire({
                    text: "All paramaters are needed",
                    icon: "error"
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = ({ target }) => {
        setContact({
            ...contact,
            [target.name]: target.value
        })
    }

    useEffect(() => {
        if (params.id) {
            searchContact()
        }
    }, [store.contacts])

    if (params.id == undefined) {


        return (
            <>
                <h1 className="d-flex justify-content-center">Add a new contact</h1>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name Lastname"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                        />


                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="000-000-0000"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="000 Street"
                            name="address"
                            value={contact.address}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" onClick={() => handleSubmit()} className="col-12 btn btn-primary">save</button>
                    <Link to="/">
                        <a>or get back to contacts</a>
                    </Link>
                </div>
            </>
        )


    } else {


        return (
            <>
                <h1 className="d-flex justify-content-center">Edit contact</h1>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name Lastname"
                            name="name"
                            value={contact?.name}
                            onChange={handleChange}
                        />


                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            name="email"
                            value={contact?.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="000-000-0000"
                            name="phone"
                            value={contact?.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="000 Street"
                            name="address"
                            value={contact?.address}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" onClick={() => handlePutSubmit(params.id)} className="col-12 btn btn-primary">save changes</button>
                    <Link to="/">
                        <a>or get back to contacts</a>
                    </Link>
                </div>
            </>
        )


    }
}

export default AddContact