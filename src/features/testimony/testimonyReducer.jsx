

const initialState  = [
    {
      id: '1',
      title: 'Learnt CSS In Two Weeks',
      date: '2018-03-27',
      category: 'culture',
      testi:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      postedBy: 'chikwado',
      hostPhotoURL: 'https://scontent.fphc1-1.fna.fbcdn.net/v/t1.0-9/69410055_2468757096704388_3905778722803810304_n.jpg?_nc_cat=108&_nc_oc=AQkzvItBaIsz3pd-EINRTE8LB9JjmHOGo-ALjJKuq26f7TzrhPkFYlLkfhvbUPJBxYY&_nc_ht=scontent.fphc1-1.fna&oh=eeb7c9821b965960388db4a9b38cdcd2&oe=5E2370E6',
      facebookUrl:'https://www.facebook.com/chikwado.okoye.52',
      twitterUrl: 'https://twitter.com/ChikwadoOkoye1',
      gitUrl:'https://github.com/chikwado17'
    },
    {
      id: '2',
      title: 'How I Learnt Redux',
      date: '2018-03-28',
      category: 'drinks',
      testi:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      postedBy: 'Emmanuel',
      hostPhotoURL: 'https://scontent.fphc1-1.fna.fbcdn.net/v/t1.0-9/69410055_2468757096704388_3905778722803810304_n.jpg?_nc_cat=108&_nc_oc=AQkzvItBaIsz3pd-EINRTE8LB9JjmHOGo-ALjJKuq26f7TzrhPkFYlLkfhvbUPJBxYY&_nc_ht=scontent.fphc1-1.fna&oh=eeb7c9821b965960388db4a9b38cdcd2&oe=5E2370E6',
      facebookUrl:'https://www.facebook.com/chikwado.okoye.52',
      twitterUrl: 'https://twitter.com/ChikwadoOkoye1',
      gitUrl:'https://github.com/chikwado17'
    }
  ]
  

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