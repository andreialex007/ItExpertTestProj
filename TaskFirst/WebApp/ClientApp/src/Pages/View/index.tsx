import {observer} from "mobx-react-lite";
import Store from "./Store.ts";
import {Pagination} from "react-headless-pagination";

export default observer(({store}: { store: Store }) => {
    return (
        <div className="flex flex-col gap-4 py-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-white rounded">
                    <th scope="col" className="px-6 py-6 w-40">
                        <input
                            className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                focus:border-purple-500"
                            id="inline-full-name"
                            type="number"
                            value={store.code || ''}
                            onChange={(event) => store.trigger(() => store.updateCode(event.target.value))}
                            placeholder="Number"/>
                    </th>
                    <th scope="col" className="px-6 py-6">
                        <input
                            className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                focus:border-purple-500"
                            value={store.value}
                            onChange={(event) => store.trigger(() => store.value = event.target.value)}
                            id="inline-full-name"
                            type="text"
                            placeholder="Value"/>
                    </th>
                </tr>
                <tr className="bg-gray-600 text-white rounded">
                    <th scope="col" className="px-6 py-6 w-40 rounded-l">
                        Code
                    </th>
                    <th scope="col" className="px-6 py-6 rounded-r">
                        Value
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    store.items.map(x => <tr key={x.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {x.code}
                        </th>
                        <td className="px-6 py-4">
                            {x.value}
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
            {
                store.items.length > 0 && <div className="mt-5">
                    <Pagination
                        middlePagesSiblingCount={2}
                        edgePageCount={2}
                        totalPages={store.totalPages}
                        currentPage={store.pageNumber}
                        setCurrentPage={page => store.changePage(page)}
                        className="flex"
                        truncableText="..."
                        truncableClassName=""
                    >
                        <Pagination.PrevButton className="p-5 bg-gray-100 rounded hover:opacity-40 cursor-pointer">Previous</Pagination.PrevButton>
                        <nav className="flex justify-center flex-grow">
                            <ul className="flex items-center gap-2">
                                <Pagination.PageButton
                                    activeClassName="bg-red-500 text-white"
                                    inactiveClassName=""
                                    className="p-5 bg-gray-100 rounded hover:opacity-60 cursor-pointer"
                                />
                            </ul>
                        </nav>
                        <Pagination.NextButton className="p-5 bg-gray-100 rounded hover:opacity-40 cursor-pointer">Next</Pagination.NextButton>
                    </Pagination>
                </div>
            }
        </div>
    );
});