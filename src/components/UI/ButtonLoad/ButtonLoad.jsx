import React from 'react';
import './buttonLoad.css';
const ButtonLoad = ({ onClick }) => {
	return (
		<button className='button-load' onClick={onClick}>
			load more
		</button>
	);
};

export default ButtonLoad;
