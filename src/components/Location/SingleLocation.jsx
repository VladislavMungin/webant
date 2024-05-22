import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import CardCharacter from '../Character/CardCharacter';
import ButtonGoBack from '../UI/ButtonGoBack/ButtonGoBack';
import './singleLocation.css';
const SingleLocation = () => {
	const { id } = useParams();
	const [location, setLocation] = useState();
	const [residents, setResidents] = useState([]);
	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/location/${id}`);
				setLocation(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchLocation();
	}, [id]);
	useEffect(() => {
		const fetchsRes = async url => {
			try {
				const res = await axios.get(url);
				setResidents(prevRes => [...prevRes, res.data]);
			} catch (err) {
				console.log(err);
			}
		};
		if (location && location.residents) {
			location.residents.forEach(item => {
				fetchsRes(item);
			});
		}
	}, [location]);
	console.log(residents);
	return (
		<div className='single'>
			<div className='single__box'>
				<ButtonGoBack />
				<div className='single__box-main'>
					{location ? (
						<>
							<h2 className='single__title'>{location.name}</h2>
							<ul className='single__box-info'>
								<li className='single__box-list-item'>
									<h4 className='single__box-title'>Type</h4>
									{location.type}
								</li>
								<li className='single__box-list-item'>
									<h4 className='single__box-title'>Dimension</h4>
									{location.dimension}
								</li>
							</ul>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			<h2 className='card__wrapper-title'>Residents</h2>
			<div className='card__wrapper'>
				{residents.map(({ name, species, image, id }) => {
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

export default SingleLocation;
