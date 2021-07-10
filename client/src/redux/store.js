import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root.reducer';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const StoreProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider
