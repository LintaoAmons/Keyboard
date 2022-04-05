import styles from './KeyMapOverview.module.scss'
const KeyMapOverview: React.FC = () => {
	return <div className={styles.container}>
		<h1 className={styles.header}>OVERVIEW</h1>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
		</ul>

	</div>
}

export { KeyMapOverview }