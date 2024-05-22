import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export const getCharacters = createAsyncThunk(
	'characters/getCharacters',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get(`${BASE_URL}character`);
			return res.data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const loadMoreCharacters = createAsyncThunk(
	'characters/loadMoreCharacters',
	async API => {
		try {
			const res = await axios.get(API);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	}
);

const initialState = {
	list: {},
};

const characterSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setCharactersList: (state, action) => {
			state.list = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getCharacters.fulfilled, (state, action) => {
				state.list = action.payload;
			})
			.addMatcher(
				action => action.type === loadMoreCharacters.fulfilled.type,
				(state, action) => {
					state.list.results = state.list.results.concat(
						action.payload.results
					);
					state.list.info = action.payload.info;
				}
			);
	},
});
export const { setCharactersList } = characterSlice.actions;

export default characterSlice.reducer;
