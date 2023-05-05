import { FC } from 'react';
import { Scenario } from '../CoreTypes';
import { TypeConverter } from '../util/TypeConverter';

interface KeyMapOverviewProps {
    scenario: Scenario;
    highlightFunction: (keycodes: string[]) => void;
    onDeleteKeybinding: (index: number) => void;
}

const KeyMapOverview: FC<KeyMapOverviewProps> = ({
    scenario,
    highlightFunction,
    onDeleteKeybinding,
}) => {
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
                        <th className="border-2 w-1/12">Keycode</th>
                        <th className="border-2 w-2/12">Modifiers</th>
                        <th className="border-2 w-5/12">Description</th>
                        <th className="border-2 w-2/12">AchieveBy</th>
                        <th className="border-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((ele, index) => (
                        <tr
                            className={`hover:bg-black hover:text-white 
                            ${index === items.length - 1 ? 'border-b' : ''}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleClick(ele.keycode)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    handleClick(ele.keycode);
                                }
                            }}
                            key={`overview-${scenario.name}-${ele.keycode}-${ele.modifiers}`}>
                            <td className="border-x-2 text-center">{ele.keycode}</td>
                            <td className="border-x-2 text-center">{ele.modifiers?.join(',')}</td>
                            <td className="border-x-2 text-left pl-3">{ele.description}</td>
                            <td className="border-x-2 text-center">{ele.achieveBy}</td>
                            <td className="border-x-2 text-center">
                                <button
                                    className="w-24 py-1 px-2 rounded border-2"
                                    onClick={() => onDeleteKeybinding(index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return <div className="flex w-full">{renderConfigItems()}</div>;
};

export { KeyMapOverview };
