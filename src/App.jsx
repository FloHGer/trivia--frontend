import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {useAuth} from './context/loginContext';

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import LogIn from './components/LogIn/LogIn';
import Game from './components/Game/Game';
import Ranks from './components/Ranks/Ranks';
import Stats from './components/Stats/Stats';
import Navigation from './components/common/Navigation';
import Feedback from './components/Feedback/Feedback';
import About from './components/About/About';

import './app.scss';

export default function App() {
	const [isLoggedIn] = useAuth();

	return (
		<Router>
			<Routes>
				<Route path='/' element={
					isLoggedIn
						? <Navigate to='/dashboard' />
						: <Navigation>
							<Home />
						</Navigation>
				} />

				<Route path='/login' element={
					isLoggedIn
						? <Navigate to='/dashboard' />
						: <LogIn />
				} />

				<Route path='/dashboard' element={
					isLoggedIn
						? <Dashboard />
						: <Navigate to='/login' />
				} />

				<Route path='/game' element={<Game />} />

				<Route path='/ranks' element={
					<Navigation>
						<Ranks />}
					</Navigation>
				} />

				<Route path='/stats' element={
					<Navigation>
						<Stats />
					</Navigation>
				} />

				<Route path='/feedback' element={
					<Navigation>
						<Feedback />
					</Navigation>
				} />

				<Route path='/about' element={
					<Navigation>
						<About />
					</Navigation>
				} />

				<Route path='*' element={<Navigate to={isLoggedIn ? '/dashboard' : '/'} />} />
			</Routes>
		</Router>
	);
}
