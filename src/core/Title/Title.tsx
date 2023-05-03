import type { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';

const Title: FC = () => (
    <div className='flex items-center mb-6'>
        <h1 className='text-4xl'>Lintao's Keyboard</h1>
        <a href="https://github.com/LintaoAmons/Keyboard">
            <AiFillGithub size={30} className='ml-5' />
        </a>
    </div>
);

export default Title;
