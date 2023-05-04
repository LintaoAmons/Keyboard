import type { FC } from 'react';
import { Scenario } from '../CoreTypes';
import { TypeConverter } from '../util/TypeConverter';

interface KeyMapOverviewProps {
    scenario: Scenario;
    highlightFunction: (keycodes: string[]) => void;
}

const KeyMapOverview: FC<KeyMapOverviewProps> = (props) => {
    const { scenario, highlightFunction } = props;
    const handleClick = (value: string) => {
        const configItem = scenario.config.find((i) => i.keycode === value);
        if (configItem && configItem.modifiers) {
            const modifiers = configItem.modifiers.map((it) =>
                TypeConverter.modifierEnumToKeycode(it)
            );
            highlightFunction([configItem.keycode, ...modifiers]);
        }
    };

    const renderConfigItems: () => JSX.Element = () => {
        const items = Array.from(scenario.config.values());
        return (
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className='border-2'>Keycode</th>
                        <th className='border-2'>Modifiers</th>
                        <th className='border-2'>Description</th>
                        <th className='border-2'>AchieveBy</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((ele) => (
                        <tr
                            className='hover:bg-black hover:text-white'
                            role="button"
                            tabIndex={0}
                            onClick={() => handleClick(ele.keycode)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    handleClick(ele.keycode);
                                }
                            }}
                            key={`overview-${scenario.name}-${ele.keycode}-${ele.modifiers}`}>
                            <td className='border-x-2 text-center'>{ele.keycode}</td>
                            <td className='border-x-2 text-center'>{ele.modifiers?.join(',')}</td>
                            <td className='border-x-2 text-center'>{ele.description}</td>
                            <td className='border-x-2 text-center'>{ele.achieveBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className='flex w-full'>
            {renderConfigItems()}
        </div>
    );
};

export { KeyMapOverview };
