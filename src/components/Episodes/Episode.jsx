import SearchIcon from '@mui/icons-material/Search';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEpisodes,
	loadMoreEpisodes,
	setEpisodesList,
} from '../../features/episode/episodeSlice';
import { BASE_URL } from '../../utils/const';
import CardEpisode from '../Episode/CardEpisode';
import ButtonLoad from '../UI/ButtonLoad/ButtonLoad';
import './episodes.css';
const Episode = () => {
	const dispatch = useDispatch();
	const [episode, setEpisode] = useState('');
	useEffect(() => {
		dispatch(getEpisodes());
	}, [dispatch]);
	const { list } = useSelector(({ episodes }) => episodes);
	const loadMore = () => {
		dispatch(loadMoreEpisodes(list.info.next));
	};
	const filterEpisode = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/episode/?episode=${episode}`);
			dispatch(setEpisodesList(res.data));
		} catch (err) {
			console.log(err);
		}
	};
	const handleInput = event => {
		const inputValue = event.target.value;
		setEpisode(inputValue);
		filterEpisode(episode);
	};
	return (
		<div className='episodes'>
			<img src='./img/episode.png' alt='' className='episodes-img' />
			<form className='search__box'>
				<TextField
					className='search'
					variant='outlined'
					value={episode}
					onChange={e => handleInput(e)}
					placeholder='Filter by name or episode (ex. S01 or S01E02)'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</form>
			<div className='card__wrapper'>
				{list.results?.map(({ id, air_date, name, episode }) => {
					return (
						<CardEpisode
							id={id}
							key={id}
							airDate={air_date}
							name={name}
							episode={episode}
						/>
					);
				})}
			</div>
			{list?.info?.next ? <ButtonLoad onClick={loadMore} /> : ''}
		</div>
	);
};

export default Episode;
