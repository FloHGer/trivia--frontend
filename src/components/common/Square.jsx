import classes from '../../sass/common/Square.module.scss';

export default function Square({title, size}) {
	return (
		<div className={classes.box} style={{width: size, height: size}}>
			<div className={classes.square}>
				{<h3 className='heading heading__3'>{title}</h3>}
			</div>
		</div>
	)
}
