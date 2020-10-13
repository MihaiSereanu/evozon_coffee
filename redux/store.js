import rootReducer from './reducers/rootReducer'
import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'

const store = context => createStore(
  rootReducer
)

// export default store;
export const wrapper = createWrapper(store, { debug: true })
