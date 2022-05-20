//@ts-ignore
import {eraseCookie} from "./Hook/useEraseCookie";



export function SigninReducer(state = {}, action: any) {
	switch (action.type) {
		case "Login":
			return true;
		case "Logout":
			
			return {
				status: 'error',
				token: "",
				username: ""
			}
		default:
			return state
	}
}


