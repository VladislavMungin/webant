import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import ButtonGoBack from '../UI/ButtonGoBack/ButtonGoBack';
import './sindleCharacter.css';

const SingleCharacter = () => {
	const { id } = useParams();
	const [character, setCharacter] = useState();
	const [episodes, setEpisodes] = useState([]);
	useEffect(() => {
		const fetchCharacter = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/character/${id}`);
				setCharacter(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchCharacter();
	}, [id]);
	useEffect(() => {
		const fetchEp = async url => {
			try {
				const res = await axios.get(url);

				setEpisodes(prevEpisodes => [...prevEpisodes, res.data]);
			} catch (err) {
				console.log(err);
			}
		};
		if (character && character.episode) {
			character.episode.forEach(item => {
				fetchEp(item);
			});
		}
	}, [character]);

	console.log(episodes);
	return (
		<div className='singleCharacter'>
			<div className='singleCharacter__box'>
				<ButtonGoBack />

				<div className='singleCharacter__box-main'>
					{character ? (
						<>
							<img
								src={character.image}
								alt=''
								className='singleCharacter-img'
							/>
							<h2 className='singleCharacter__title'>{character.name}</h2>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			<div className='singleCharacter__wrapper'>
				<div>
					<h4 className='singleCharacter__list-title'>Information</h4>
					<ul className='singleCharacter__list'>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Gender</h2>
							{character?.gender ? character?.gender : 'unknown'}
						</li>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Status</h2>
							{character?.status ? character?.status : 'unknown'}
						</li>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Specie</h2>
							{character?.specie ? character?.specie : 'unknown'}
						</li>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Origin</h2>
							{character?.origin?.name ? character?.origin.name : 'unknown'}
						</li>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Type</h2>
							{character?.type ? character?.type : 'unknown'}
						</li>
						<li className='singleCharacter__list-item'>
							<h2 className='singleCharacter__list-item-title'>Location</h2>
							{character?.location.name ? character?.location.name : 'unknown'}
						</li>
					</ul>
				</div>
				<div>
					<h4 className='singleCharacter__list-title'>Episodes</h4>
					<ul className='singleCharacter__list'>
						{episodes.map(({ id, name, air_date, episode }) => {
							return (
								<Link
									key={id}
									to={`/episode/${id}`}
									className='singleCharacter__list-item'
								>
									<li className='singleCharacter__item-box'>
										<h2 className='singleCharacter__list-item-title'>
											{episode}
										</h2>
										<p className='singleCharacter__list-item-subtitle'>
											{name}
										</p>
										<p className='singleCharacter__list-item-text'>
											{air_date}
										</p>
									</li>
									<img src='../img/arrow.svg' alt='' />
								</Link>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SingleCharacter;
