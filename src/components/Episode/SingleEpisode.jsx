import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import CardCharacter from '../Character/CardCharacter';
import ButtonGoBack from '../UI/ButtonGoBack/ButtonGoBack';

const SingleEpisode = () => {
	const { id } = useParams();
	const [episode, setEpisode] = useState();
	const [characters, setCharacters] = useState([]);
	useEffect(() => {
		const fetchEpisode = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/episode/${id}`);
				setEpisode(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchEpisode();
	}, [id]);
	useEffect(() => {
		const fetchChar = async url => {
			try {
				const res = await axios.get(url);
				setCharacters(prevChar => [...prevChar, res.data]);
			} catch (err) {
				console.log(err);
			}
		};
		if (episode && episode.characters) {
			episode.characters.forEach(item => {
				fetchChar(item);
			});
		}
	}, [episode]);

	return (
		<div className='single'>
			<div className='single__box'>
				<ButtonGoBack />
				<div className='single__box-main'>
					{episode ? (
						<>
							<h2 className='single__title'>{episode.name}</h2>
							<ul className='single__box-info'>
								<li className='single__box-list-item'>
									<h4 className='single__box-title'>Episode</h4>
									{episode.episode}
								</li>
								<li className='single__box-list-item'>
									<h4 className='single__box-title'>Date</h4>
									{episode.air_date}
								</li>
							</ul>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			<h2 className='card__wrapper-title'>Cast</h2>
			<div className='card__wrapper'>
				{characters.map(({ name, species, image, id }) => {
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
		</div>
	);
};

export default SingleEpisode;
