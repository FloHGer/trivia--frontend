import { useState } from 'react';
import {FaGithub, FaHome, FaEnvelope} from 'react-icons/fa';

import classes from './AuthorCard.module.scss';

export default function AuthorCard({className, name, nickname, src, github, homepage, email}) {
	const [qr, setQr] = useState(false);

	return (
		<div className={className}>
			<div className={classes.author}
				onMouseEnter={() => setQr(true)}
				onMouseLeave={() => setQr(false)}
			>
				<img className={classes.author__picture} src={src[1]} alt={name} />
				<img className={classes.author__picture} src={src[0]} alt={name} style={{opacity: qr ? 0 : 1}} />
				<div className={classes.author__info}>
					<h2>{name}</h2>
					<h4>'{nickname}'</h4>

					<div className={classes['author__info--git']}>
						<a href={`https://github.com${github}`} target={'_blank'} rel={'noreferrer'}>
							<FaGithub className={classes.author__icons} />
							<h3>{github}</h3>
						</a>
					</div>
					
					<div className={classes['author__info--email']}>
						<a href={`mailto:${email}?subject=Found you on your Trivia Project`}>
							<FaEnvelope className={classes.author__icons} />
							<h3>{email}</h3>
						</a>
					</div>

					{homepage &&
						<div className={classes['author__info--page']}>
							<a href={`https://${homepage}`} target={'_blank'} rel={'noreferrer'}>
								<FaHome className={classes.author__icons} />
								<h3>{homepage}</h3>
							</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
