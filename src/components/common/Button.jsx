import classes from './Button.module.scss';

export default function Button(props) {
	return (
		<button
			className={`${classes.btn} ${props.className}`}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
			type={props.type}
			disabled={props.disabled}
			style={{
				maxHeight: props.maxHeight || '',
				maxWidth: props.maxWidth || '',
				color: props.color || '',
				background: props.background || '',
			}}
		>
			{props.title}
		</button>
	);
}
