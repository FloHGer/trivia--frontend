import classes from '../../sass/common/Button.module.scss';

export default function Button(props) {
	return (
		<button
			className={`${classes.btn} ${props.className}`}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
			type={props.type}
			style={{
				maxWidth: props.maxWidth || '',
			}}
		>
			{props.title}
		</button>
	);
}
