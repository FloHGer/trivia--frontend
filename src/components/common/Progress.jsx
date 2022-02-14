import classes from './Progress.module.scss';

export default function Progress({value, max, height}) {
  return (
      <div
        className = {classes.outer}
        style={{
          height: height || ''
        }}
      >
        <div
          className = {classes.inner}
          style = {{width: `${value * 100 / max}%`}}
        ></div>
      </div>
  )
}
