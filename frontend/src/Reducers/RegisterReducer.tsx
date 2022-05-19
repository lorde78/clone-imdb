
// @ts-ignore
export default function RegisterReducer(state = false, action ) {
	switch (action.type) {
		case 'Register':
			return true;
		default:
			return state;
	}
}
