import { createStore, applyMiddleware } from 'redux' 
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import rootReducer from './reducers'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  
  // Run redux-saga
  sagaMiddleware.run(rootSaga)
  
  export default store