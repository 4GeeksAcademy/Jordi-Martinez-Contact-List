import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light m-3 me-5 d-flex justify-content-end">
			
			<div className="ml-auto">
				<Link to="/addcontact">
					<button className="btn btn-success mt-3 me-3">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
