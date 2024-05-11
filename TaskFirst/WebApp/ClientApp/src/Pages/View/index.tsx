import {observer} from "mobx-react-lite";
import Store from "./Store.ts";

export default observer(({store}: { store: Store }) => {
    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-6 w-40">
                            <input
                                className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                focus:border-purple-500"
                                id="inline-full-name" type="number" value="" placeholder="Number" />
                        </th>
                        <th scope="col" className="px-6 py-6">
                            <input
                                className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
                                id="inline-full-name" type="text" value="" placeholder="Value"  />
                        </th>
                    </tr>
                    <tr className="bg-orange-700 text-white">
                        <th scope="col" className="px-6 py-6 w-40">
                            Code
                        </th>
                        <th scope="col" className="px-6 py-6">
                        Value
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td className="px-6 py-4">
                            White
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td className="px-6 py-4">
                            Black
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});