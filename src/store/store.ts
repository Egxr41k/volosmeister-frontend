import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore
} from 'redux-persist'
import { carouselSlice } from './carousel/carousel.slice'
import { cartSlice } from './cart/cart.slice'
import { filtersSlice } from './filters/filters.slice'
import { userSlice } from './user/user.slice'

const isClient = typeof window !== undefined

const combinedReducers = combineReducers({
	user: userSlice.reducer,
	cart: cartSlice.reducer,
	carousel: carouselSlice.reducer,
	filters: filtersSlice.reducer
})

let mainReduser = combinedReducers

if (isClient) {
	const { persistReducer } = require('redux-persist')
	const storage = require('redux-persist/lib/storage').default

	const persistConfig = {
		key: 'amazon-clone',
		storage,
		whitelist: ['cart']
	}

	mainReduser = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
	reducer: mainReduser,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootStore = ReturnType<typeof mainReduser>
