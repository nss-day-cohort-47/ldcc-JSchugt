const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


///// snack functions

let snackCollection = [];
let toppingsCollection = [];

export const useToppingsCollection = () => {
	const toppingCollection = [...toppingsCollection]
	return toppingCollection;
}
export const useSnackCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //the spread operator makes quick work
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}
export const getToppings = () => {
	return fetch(`${apiURL}/toppings`)
		.then(response => response.json())
		.then(parsedResponse => {toppingsCollection = parsedResponse
		return parsedResponse})

}
export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}

export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=season&_expand=shape&_expand=type&_expand=inFlavor&_embed=snackToppings`)
	.then(response => response.json())
}

export const getSnackToppingDetail = snackId => {
	return fetch(`${apiURL}/toppings/?id=${snackId}`)
	.then(resposne => resposne.json())
	.then(parsedResponse => {
		console.log(parsedResponse[0].name, "parsedResponse")
		let name = parsedResponse[0].name
		return name})
}

export const getToppingName = snackId => {
	let toppingName = ""
	toppingName += getSnackToppingDetail(snackId)
	return toppingName
}

export const getSnackToppings = snackId => {
	return fetch (`${apiURL}/snackToppings/?snackId=${snackId}&_expand=topping`)
	.then(response => response.json())
}
