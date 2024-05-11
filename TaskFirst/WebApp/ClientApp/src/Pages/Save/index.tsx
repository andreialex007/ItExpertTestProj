import { observer } from 'mobx-react-lite';
import Store from './Store.ts';

export default observer(({ store }: { store: Store }) => {
	return (
		<div className="mt-5 flex h-full flex-col gap-4">
			<h1 className="text-2xl">Put your JSON here:</h1>
			<textarea
				id="message"
				rows="4"
				value={store.jsonContent}
				onChange={(x) => (store.jsonContent = x.target.value)}
				className={`block w-full flex-grow resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 
                      focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                      dark:focus:ring-blue-500 ${store.loading ? 'readonly ' : ''}`}
				placeholder="Write your json here..."
			></textarea>
			<div className="mb-5">
				<span
					onClick={() => store.saveJson()}
					className={`float-right cursor-pointer rounded bg-orange-500 px-5 py-3 text-white hover:opacity-80 ${store.loading ? 'pointer-events-none animate-pulse' : ''}`}
				>
					{!store.loading ? 'SAVE JSON' : 'SAVING...'}
				</span>
			</div>
		</div>
	);
});
