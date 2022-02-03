
import Square from './Square';

import classes from '../../sass/common/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={classes.footer}>
			<nav className={classes.footer__nav}>
					<Square title='Stats' size={'14rem'}/>
					<Square title='Ranks' size={'14rem'}/>

					<Square title='About us' size={'8rem'} />

					<Square title='Feedback' />
			</nav>
		</footer>
	);
}
