import classes from './Progress.module.scss';

export default function Progress({value, max}) {
  return (
      <div
        className = {classes.outer}
      >
        <div
          className = {classes.inner}
          style = {{width: `${value * 100 / max}%`}}
        ></div>
      </div>
  )
}
