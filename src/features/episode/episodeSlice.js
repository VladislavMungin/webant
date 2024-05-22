import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export const getEpisodes = createAsyncThunk(
	'episodes/getEpisodes',
	async (_, ThunkAPI) => {
		try {
			const res = await axios.get(`${BASE_URL}episode`);
			return res.data;
		} catch (err) {
			console.log(err);
			return ThunkAPI.rejectWithValue(err);
		}
	}
);

export const loadMoreEpisodes = createAsyncThunk(
	'episodes/loadMoreEpisode',
	async API => {
		try {
			const res = axios.get(API);
			return (await res).data;
		} catch (err) {
			console.log(err);
		}
	}
);
const initialState = {
	list: {},
};
const episodeSlice = createSlice({
	name: 'episodes',
	initialState,
	reducers: {
		setEpisodesList: (state, action) => {
			state.list = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getEpisodes.fulfilled, (state, action) => {
				state.list = action.payload;
			})
			.addMatcher(
				action => action.type === loadMoreEpisodes.fulfilled.type,
				(state, action) => {
					state.list.results = state.list.results.concat(
						action.payload.results
					);
					state.list.info = action.payload.info;
				}
			);
	},
});
export const { setEpisodesList } = episodeSlice.actions;
export default episodeSlice.reducer;
