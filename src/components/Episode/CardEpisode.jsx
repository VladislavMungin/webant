import React from 'react';
import { Link } from 'react-router-dom';
import './cardEpisode.css';

const CardEpisode = ({ name, id, episode, airDate }) => {
	return (
		<Link to={`/episode/${id}`}>
			<div className='cardLocation'>
				<h2 className='card-title'>{name}</h2>
				<h3 className='card-subtitle'>{airDate}</h3>
				<p className='card-text'>{episode}</p>
			</div>
		</Link>
	);
};

export default CardEpisode;
