import professionReducer from './profession'
import qualitiesReducer from './qualities'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  profession: professionReducer
})

export function createStore () {
  return configureStore({
    reducer: rootReducer
  })
}