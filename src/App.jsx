import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import {useAuth} from './context/loginContext';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import Game from './pages/Game';
import Ranks from './pages/Ranks';
import Stats from './pages/Stats';
import Warning from './pages/Warning';
import Footer from './components/common/Footer';
import About from './pages/About';

import './sass/app.scss';

export default function App() {
	const [isLoggedIn] = useAuth();

	return (
		<Router>
			<main>
				<Routes>
					<Route path='/' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Home />} />

					<Route path='/login' element={isLoggedIn ? <Navigate to='/dashboard' /> : <LogIn />} />

					<Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to='/login' />} />

					<Route path='/game' element={<Game />} />

					<Route path='/ranks' element={<Ranks />} />

					<Route path='/stats' element={<Stats />} />

					<Route path='/about' element={<About />} />

					<Route path='/warning' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Warning />} />

					<Route path='*' element={<Navigate to={isLoggedIn ? '/dashboard' : '/'} />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}
