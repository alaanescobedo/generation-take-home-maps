import styles from "./Footer.module.css";
import PillGithub from "../components/Pill/PillGithub"

export const Footer = () => {
  return (
    <footer className={styles.footer} >
      <PillGithub />
      <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
        <p>Made with <a href="https://reactjs.org/" target="_blank">ReactJS</a></p>
        <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" style={{ height: 40, width: 40 }} alt="reactjs-icon" />
      </div>
    </footer>
  )
}