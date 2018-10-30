import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import Index from './Index';
import { reducer } from './reducers';
import './styles.css';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('main'),
  )
}

render(Index);

if (module.hot) {
  module.hot.accept('./Index', () => {
    render(Index)
  })
}
