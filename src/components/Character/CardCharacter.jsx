import React from 'react';
import { Link } from 'react-router-dom';
import './cardCharacter.css';
const CardCharacter = ({ name, text, img, id }) => {
	return (
		<Link to={`/character/${id}`}>
			<div className='card'>
				<img src={img} alt='' className='card-img' />
				<h2 className='card-title'>{name}</h2>
				<p className='card-text'>{text}</p>
			</div>
		</Link>
	);
};

export default CardCharacter;
