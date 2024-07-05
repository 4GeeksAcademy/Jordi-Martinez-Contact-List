const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
			urlBaseContact: "https://playground.4geeks.com/contact/agendas"	
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });

				
			},
			getAllContacts: async () => {
				try {
					let response = await fetch(`${getStore().urlBaseContact}/JordiMtz/contacts`)
					let data = await response.json()

					// if (response.status == 404) {
					// 	createUser();
					// 	getAllContacts();
					// } else {

						setStore({
							contacts: data.contacts
						})
					// }
				} catch (error) {
					console.log(error)
				}
			},
			
			createUser: async () => {
				try {
					await fetch(`${getStore().urlBaseContact}/JordiMtz`, {
						method: "POST",
					});
				} catch (error) {
					console.log(error);
				}
			},
			addContact: async (contact) => {
				const store = getStore()
				const { urlBaseContact } = store

				try {
					const response = await fetch(`${urlBaseContact}/JordiMtz/contacts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contact)
					})

					if (response.ok) {
						getActions().getAllContacts()
						return true
					} else {
						console.log("Error al agregar contacto")
						return false
					}
				} catch (error) {
					console.log(error)
				}
			},

			
			putContact: async (id) => {
				const store = getStore()
				const { urlBaseContact } = store

				try {
					const response = await fetch(`${urlBaseContact}/JordiMtz/contacts/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contact)
					})

					if (response.ok) {
						getActions().getAllContacts()
						return true
					} else {
						console.log("Error al actualizando contacto")
						return false
					}
				} catch (error) {
					console.log(error)
				}
			},
			
			deleteContact: async (id) => {
				try {
					let response = await fetch(`${getStore().urlBaseContact}/JordiMtz/contacts/${id}`, {
						method: "DELETE"
					})

					if (response.ok) {
						getActions().getAllContacts()
						return true
					}

				} catch (error) {
					console.log(error)
				}
			}

		}
	};
};

export default getState;
