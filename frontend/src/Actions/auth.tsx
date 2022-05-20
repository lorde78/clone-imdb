import axios from "axios";

export function Register(payload: any) {
    return {
        type: 'Register',
        payload: payload
    }

}

export function Logout() {
    return {
        type: 'Logout'
    }

}
