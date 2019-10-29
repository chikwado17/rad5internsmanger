

const initialState  = [];
  

  export const testimonyReducer = (state = initialState, action) => {

    switch(action.type) {

      case 'CREATE_TESTIMONY':
          return [
            ...state,
            Object.assign({}, action.testimony)
          ]

      case "UPDATE_TESTIMONY":
          return [
              ...state.filter(testimony => testimony.id !== action.testimony.id),
              Object.assign({}, action.testimony)
          ]

      case "DELETE_TESTIMONY":
          return [
              ...state.filter(testimony => testimony.id !== action.testimonyId)
          ]
//reducer to fetch events from mock api
      case "FETCH_TESTIMONY":
          return action.testimony

      default: 
        return state;
    }
  }