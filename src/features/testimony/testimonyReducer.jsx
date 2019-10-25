

const initialState  = [

  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    postedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  }
 
];
  

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
      case "FETCH_EVENTS":
          return action.testimony

      default: 
        return state;
    }
  }