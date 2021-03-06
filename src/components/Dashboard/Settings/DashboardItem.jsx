import {useAllCategories} from '../../../context/gameContext';
import classes from './DashboardItem.module.scss';


export default function DashboardItem({title, elements, type}) {
	const [allCategories] = useAllCategories();

	return (
		<div className={classes.dashboard__item}>
			<h2 className={classes['dashboard__item--category']}>{title.name}</h2>
			<div className={classes.elementsContainer}>
				{elements.map((element, i) => {
					if (type === 'radio') {
						return (
							<label
								key={`${element.name}${i}`}
								className={classes['dashboard__item--value']}
								title={element.tooltip}
								style={{background: element.name === element.mode ? '#6ccfe8' : ''}}
							>
								{element.name}
								<input type={'radio'} name={title.shortname} value={element.name} onClick={element.change} />
							</label>
						);
					}
					if (type === 'select')
						return (
							<select
								key={`${element.name}${i}`}
								defaultValue={typeof element.value === 'string' ? element.value : element.value.name}
								onChange={e => element.change(e.target.value, i)}
								className={classes['dashboard__item--select']}
							>
								<option value={'choose'}>{'random category'}</option>
								{allCategories.map(category => (
									<option value={category.name} key={category.id}>
										{category.name}
									</option>
								))}
							</select>
						);
				})}
			</div>
		</div>
	);
}
