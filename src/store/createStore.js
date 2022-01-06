import professionReducer from './profession'
import qualitiesReducer from './qualities'
import usersReducer from './users'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  profession: professionReducer,
  users: usersReducer
})

export function createStore () {
  return configureStore({
    reducer: rootReducer
  })
}