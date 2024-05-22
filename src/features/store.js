import { configureStore } from '@reduxjs/toolkit';
import characterSlice from './character/characterSlice';
import episodeSlice from './episode/episodeSlice';
import locationSlice from './location/locationSlice';

export const store = configureStore({
	reducer: {
		characters: characterSlice,
		locations: locationSlice,
		episodes: episodeSlice,
	},
});
