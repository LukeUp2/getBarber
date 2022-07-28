export const initialState = {
  avatar: '',
  favorites: [],
  appointments: []
}

export const UserReducer = (state, action) => {

  console.log('State -> ', state)
  console.log('Action -> ', action)

  switch(action.type) {
    case 'setAvatar':
      return { ...state, avatar: action.payload.avatar}
      break;
    default:
      return state
  }
}