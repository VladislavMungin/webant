import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getLocations,
	loadMoreLocations,
	setLocationList,
} from '../../features/location/locationSlice';
import { BASE_URL } from '../../utils/const';
import CardLocation from '../Location/CardLocation';
import ButtonLoad from '../UI/ButtonLoad/ButtonLoad';
import './locations.css';

const Locations = () => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocations());
	}, [dispatch]);
	const { list } = useSelector(({ locations }) => locations);
	const loadMore = () => {
		dispatch(loadMoreLocations(list.info.next));
	};
	const filterName = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/location/?name=${name}`);
			dispatch(setLocationList(res.data));
		} catch (err) {
			console.log(err);
		}
	};
	const handleInput = event => {
		const inputValue = event.target.value;
		setName(inputValue);
		filterName(name);
	};
	return (
		<div className='locations'>
			<img src='./img/Locations.png' alt='' className='locations-img' />
			<form action=''>
				<TextField
					variant='outlined'
					placeholder='Filter by name...'
					value={name}
					onChange={e => handleInput(e)}
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
				{list.results?.map(({ id, name, type }) => {
					return <CardLocation key={id} name={name} type={type} id={id} />;
				})}
			</div>
			{list?.info?.next ? <ButtonLoad onClick={loadMore} /> : ''}
		</div>
	);
};

export default Locations;
