import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export const getLocations = createAsyncThunk(
	'locations/getLocations',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get(`${BASE_URL}location`);
			return res.data;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const loadMoreLocations = createAsyncThunk(
	'locations/loadMoreLocations',
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

const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		setLocationList: (state, action) => {
			state.list = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getLocations.fulfilled, (state, action) => {
				state.list = action.payload;
			})
			.addMatcher(
				action => action.type === loadMoreLocations.fulfilled.type,
				(state, action) => {
					state.list.results = state.list.results.concat(
						action.payload.results
					);
					state.list.info = action.payload.info;
				}
			);
	},
});
export const { setLocationList } = locationSlice.actions;

export default locationSlice.reducer;
