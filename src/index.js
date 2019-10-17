import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './app/layout/App';
// import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/common/utils/ScrollToTop';
import { configureStore } from './app/store/configureStore';


const store = configureStore()

const rootEl = document.getElementById('root');

let render = () => {

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                <ReduxToastr
                            timeOut={4000}
                            newestOnTop={false}
                            preventDuplicates
                            position="bottom-right"
                            transitionIn="fadeIn"
                            transitionOut="fadeOut"
                            closeOnToastrClick/>
                    <App/>
                </ScrollToTop>
            </BrowserRouter>
        </Provider>,
        rootEl);

}

if(module.hot){
    module.hot.accept('./app/layout/App',() => {
        setTimeout(render);
    });
}


//only when firebase authentication is ready then ready the page..
store.firebaseAuthIsReady.then(() => {
    render();
});




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
