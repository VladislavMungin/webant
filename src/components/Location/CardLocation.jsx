import React from 'react';
import { Link } from 'react-router-dom';
import './CardLocation.css';
const CardLocation = ({ name, type, id }) => {
	return (
		<Link to={`/location/${id}`}>
			<div className='cardLocation'>
				<h2 className='card-title'>{name}</h2>
				<p className='card-text'>{type}</p>
			</div>
		</Link>
	);
};

export default CardLocation;
