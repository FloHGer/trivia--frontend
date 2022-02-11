import {FaGithub, FaHome, FaEnvelope} from 'react-icons/fa';

import classes from './AuthorCard.module.scss';

export default function AuthorCard({className, name, nickname, src, github, homepage, email}) {
	return (
		<div className={className}>
			<div className={classes.item}>
				<img className={classes.picture} src={src} alt={name} />
				<div className={classes.item__info}>
					<h2>{name}</h2>
					<h4>'{nickname}'</h4>

					<div className={classes['item__info--git']}>
						<a href={`https://github.com${github}`} target={'_blank'} rel={'noreferrer'}>
							<FaGithub className={classes.item__icons} />
							<h3>{github}</h3>
						</a>
					</div>
					
					<div className={classes['item__info--email']}>
						<a href={`mailto:${email}?subject=Found you on your Trivia Project`}>
							<FaEnvelope className={classes.item__icons} />
							<h3>{email}</h3>
						</a>
					</div>

					{homepage &&
						<div className={classes['item__info--page']}>
							<a href={`https://${homepage}`} target={'_blank'} rel={'noreferrer'}>
								<FaHome className={classes.item__icons} />
								<h3>{homepage}</h3>
							</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
