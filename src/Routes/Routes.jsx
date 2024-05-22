import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SingleCharacter from '../components/Character/SingleCharacter';
import SingleEpisode from '../components/Episode/SingleEpisode';
import Episode from '../components/Episodes/Episode';
import Home from '../components/Home/Home';
import SingleLocation from '../components/Location/SingleLocation';
import Locations from '../components/Locations/Locations';
import { ROUTES } from '../utils/routes';
const AppRoutes = () => (
	<Routes>
		<Route index element={<Home />} />
		<Route path={ROUTES.CHARACTER} element={<SingleCharacter />} />
		<Route path={ROUTES.LOCATIONS} element={<Locations />} />
		<Route path={ROUTES.LOCATION} element={<SingleLocation />} />
		<Route path={ROUTES.EPISODES} element={<Episode />} />
		<Route path={ROUTES.EPISODE} element={<SingleEpisode />} />
	</Routes>
);
export default AppRoutes;
