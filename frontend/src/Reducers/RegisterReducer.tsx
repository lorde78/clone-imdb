
// @ts-ignore
export default function RegisterReducer(state : false, action: { type: any; }) {
	switch (action.type) {
		case 'Register':
			return true;
		default:
			return state;
	}
}
