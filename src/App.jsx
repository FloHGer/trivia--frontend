import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {useAuth} from './context/loginContext';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import Game from './pages/Game';
import Ranks from './pages/Ranks';
import Stats from './pages/Stats';
import Navigation from './components/common/Navigation';
import Feedback from './pages/Feedback';
import About from './pages/About';

import './sass/app.scss';

export default function App() {
	const [isLoggedIn] = useAuth();

	return (
		<Router>
			<Routes>
				<Route path='/' element={isLoggedIn
					? <Navigate to='/dashboard' />
					: <Navigation>
							<Home />
						</Navigation>
				} />

				<Route path='/login' element={isLoggedIn
					? <Navigate to='/dashboard' />
					: <LogIn />
				} />

				<Route path='/dashboard' element={isLoggedIn
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
