import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import './header.css';
const Header = () => {
	return (
		<header className='header'>
			<img src='../img/logo.svg' alt='' />
			<nav className='menu'>
				<ul className='menu__list'>
					<li className='menu__list-item'>
						<Link to={ROUTES.HOME} className='menu__list-link'>
							Characters
						</Link>
					</li>
					<li className='menu__list-item'>
						<Link to={ROUTES.LOCATIONS} className='menu__list-link'>
							Locations
						</Link>
					</li>
					<li className='menu__list-item'>
						<Link to={ROUTES.EPISODES} className='menu__list-link'>
							Episodes
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
