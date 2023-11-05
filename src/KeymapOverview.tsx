import { useContext } from "react";
import { TERipple } from "tw-elements-react";
import { ConfigContext } from "./Config";

export default function KeymapOverview(): JSX.Element {

    const config = useContext(ConfigContext);

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">

                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Keybinding</th>
                                    <th scope="col" className="px-6 py-4">Description</th>
                                    <th scope="col" className="px-6 py-4">AchieveBy</th>
                                    <th scope="col" className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    config.activeScenario.KeymapItems.map((item, _) => (
                                        <tr
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                {item.keybinding ? item.keybinding.map((key, index) =>
                                                    <span className="bg-gray-100 px-2 py-1 rounded border border-gray-600 mx-1 text-black" key={index}>
                                                        {key.keycode + (key.modifiers && key.modifiers.length > 0 ? " | " + key.modifiers.join(", ") : '')}
                                                    </span>
                                                ) : ""}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.description}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.achieveBy}</td>
                                            <td className="border-x-2 text-center">
                                                <TERipple className="mx-2">
                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
                                                        onClick={() => { console.log("delete current item") }}
                                                    >
                                                        Delete
                                                    </button>
                                                </TERipple>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
