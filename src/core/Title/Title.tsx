import type { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import styles from './Title.module.scss';

const Title: FC = () => (
    <div className={styles.title}>
        <h1>Lintao's Keyboard</h1>
        <a href="https://github.com/LintaoAmons/Keyboard">
            <AiFillGithub size={30} className={styles.icon} />
        </a>
    </div>
);

export default Title;
