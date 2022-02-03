import classes from '../../sass/common/Square.module.scss';

export default function Square({title, size, className}) {
	return (
		<div
			className={className || classes.square}
			style={{
				width: size || '', 
				eight: size || '',
			}}
		>
			{<h3 className='heading heading__3'>{title}</h3>}
		</div>
	)
}
