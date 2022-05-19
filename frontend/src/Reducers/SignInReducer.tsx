export default function SignInReducer(state = false, action: any) {
	switch (action.type) {
		case 'Signin':    
			return true;
		case 'Signout':
			return false;
        default:
            return state;
	}
}
