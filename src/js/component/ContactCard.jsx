import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/contactcard.css';
import { Link } from "react-router-dom";

const initialContact = {
    name: "",
    phone: "",
    email: "",
    address: ""
};

const ContactCard = () => {
    const { store } = useContext(Context);
    const { actions } = useContext(Context)

    const deleteContact = (id) => {
        actions.deleterContact(id)
    }


    return (
        <>
            <nav className="navbar navbar-light m-3 me-5 d-flex justify-content-end">

                <div className="ml-auto">
                    <Link to="/addcontact">
                        <button className="btn btn-success mt-3 me-3">Add new contact</button>
                    </Link>
                </div>
            </nav>
            <div>
                {store.contacts?.map((item) => (
                    <div key={item.id} className="container container-border">
                        <div className="row d-flex">
                            <div className="col-2 justify-content-center">
                                <img className="profile-img my-3 ms-4" src="https://picsum.photos/200/200" alt="Profile picture" />
                            </div>
                            <div className="col-8 my-3 justify-content-left">
                                <h5 className="mt-1 ms-4">{item.name}</h5>
                                <ul>
                                    <li>
                                        <i className="fas fa-map-marker-alt me-3"></i>
                                        {item.address}
                                    </li>
                                    <li>
                                        <i className="fas fa-phone me-3"></i>
                                        {item.phone}
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope me-3"></i>
                                        {item.email}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-2 my-4 d-flex justify-content-evenly">
                                <Link to={`/editcontact/${item.id}`}><i className="fas fa-pencil-alt right-icons"></i></Link>
                                <a onClick={() => deleteContact(item.id)}><i className="fas fa-trash-alt right-icons"></i></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ContactCard;
