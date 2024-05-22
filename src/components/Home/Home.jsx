import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCharacters,
	loadMoreCharacters,
	setCharactersList,
} from '../../features/character/characterSlice';
import { BASE_URL } from '../../utils/const';
import CardCharacter from '../Character/CardCharacter';
import ButtonLoad from '../UI/ButtonLoad/ButtonLoad';
import './home.css';
const Home = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	useEffect(() => {
		dispatch(getCharacters());
	}, [dispatch]);

	let { list } = useSelector(({ characters }) => characters);
	const loadMore = () => {
		dispatch(loadMoreCharacters(list.info.next));
	};
	const filterName = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/character/?name=${name}`);
			dispatch(setCharactersList(res.data));
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
		<div className='home'>
			<img src='./img/home.png' alt='' className='home-img' />
			<form action=''>
				<TextField
					className='input'
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
				{list.results?.map(({ id, name, species, image }) => {
					return (
						<CardCharacter
							key={id}
							name={name}
							text={species}
							img={image}
							id={id}
						/>
					);
				})}
			</div>
			{list?.info?.next ? <ButtonLoad onClick={loadMore} /> : ''}
		</div>
	);
};

export default Home;
