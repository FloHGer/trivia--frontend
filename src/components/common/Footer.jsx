
import Square from './Square';

import classes from '../../sass/common/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={classes.footer}>
			<nav className={classes.footer__nav}>
					<Square title='Stats' size={'12rem'}/>

					<Square title='Ranks' size={'12rem'}/>

					<Square title='About us' size={'12rem'} />

					<Square title='Feedback' size={'12rem'} />
			</nav>
		</footer>
	);
}
