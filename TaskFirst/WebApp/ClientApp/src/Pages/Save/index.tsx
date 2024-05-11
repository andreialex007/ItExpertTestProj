import {observer} from "mobx-react-lite";
import Store from "./Store.ts";

export default observer(({store}: { store: Store }) => {
    return (
        <div className="flex flex-col gap-4 mt-5 h-full">
            <h1 className="text-2xl">Put your JSON here:</h1>
            <textarea id="message" rows="4"
                      value={store.jsonContent}
                      onChange={(x) => store.jsonContent = x.target.value}
                      className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none
                      flex-grow ${store.loading ? 'readonly ' : ''}`}
                      placeholder="Write your json here..."></textarea>
            <div className="mb-5">
                <span onClick={() => store.saveJson()} className={
                    `bg-orange-500 rounded text-white px-5 py-3 cursor-pointer hover:opacity-80 float-right ${store.loading ? 'pointer-events-none animate-pulse' : ''}`
                }>{!store.loading ? 'SAVE JSON' : 'SAVING...'}</span>
            </div>
        </div>
    );
});