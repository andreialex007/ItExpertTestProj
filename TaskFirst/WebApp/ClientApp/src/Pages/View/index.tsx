import { observer } from 'mobx-react-lite';
import Store from './Store.ts';
import { Pagination } from 'react-headless-pagination';

export default observer(({ store }: { store: Store }) => {
	return (
		<div className="flex flex-col gap-4 py-4">
			<table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
				<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
					<tr className="rounded text-white">
						<th scope="col" className="w-40 px-6 py-6">
							<input
								className="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 
                                focus:outline-none"
								id="inline-full-name"
								type="number"
								value={store.code || ''}
								onChange={(event) => store.trigger(() => store.updateCode(event.target.value))}
								placeholder="Number"
							/>
						</th>
						<th scope="col" className="px-6 py-6">
							<input
								className="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 
                                focus:outline-none"
								value={store.value}
								onChange={(event) => store.trigger(() => (store.value = event.target.value))}
								id="inline-full-name"
								type="text"
								placeholder="Value"
							/>
						</th>
					</tr>
					<tr className="rounded bg-gray-600 text-white">
						<th scope="col" className="w-40 rounded-l px-6 py-6">
							Code
						</th>
						<th scope="col" className="rounded-r px-6 py-6">
							Value
						</th>
					</tr>
				</thead>
				<tbody>
					{store.items.map((x) => (
						<tr key={x.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
							<th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
								{x.code}
							</th>
							<td className="px-6 py-4">{x.value}</td>
						</tr>
					))}
				</tbody>
			</table>
			{store.items.length > 0 && (
				<div className="mt-5">
					<Pagination
						middlePagesSiblingCount={2}
						edgePageCount={2}
						totalPages={store.totalPages}
						currentPage={store.pageNumber}
						setCurrentPage={(page) => store.changePage(page)}
						className="flex"
						truncableText="..."
						truncableClassName=""
					>
						<Pagination.PrevButton className="cursor-pointer rounded bg-gray-100 p-5 hover:opacity-40">Previous</Pagination.PrevButton>
						<nav className="flex flex-grow justify-center">
							<ul className="flex items-center gap-2">
								<Pagination.PageButton
									activeClassName="bg-red-500 text-white"
									inactiveClassName=""
									className="cursor-pointer rounded bg-gray-100 p-5 hover:opacity-60"
								/>
							</ul>
						</nav>
						<Pagination.NextButton className="cursor-pointer rounded bg-gray-100 p-5 hover:opacity-40">Next</Pagination.NextButton>
					</Pagination>
				</div>
			)}
		</div>
	);
});
