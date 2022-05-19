export default function RegisterReducer(state = {}, action) {
	switch (action.type) {
		case Register:
			return true;
		default:
			return state;
	}
}
