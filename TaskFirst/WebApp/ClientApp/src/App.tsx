import {observer} from 'mobx-react-lite';
import Store from './AppStore.ts';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import SavePage from './Pages/Save';
import ViewPage from './Pages/View';

let store = new Store();

const App = observer(() => {

    return (
        <div className="size-full p-5">
            <TabGroup selectedIndex={store.tabIndex} onChange={index => store.tabIndex = index} className="flex flex-col h-full">
                <TabList className="flex gap-2">
                    <Tab className={`outline-0 font-bold px-5 py-3 rounded ${(store.tabIndex === 0 ? 'bg-slate-600 text-white ' : 'bg-gray-100 hover:opacity-80')}`}>
                        Save
                    </Tab>
                    <Tab className={`outline-0 font-bold px-5 py-3 rounded ${(store.tabIndex === 1 ? 'bg-slate-600 text-white ' : 'bg-gray-100 hover:opacity-80')}`}>
                        View
                    </Tab>
                </TabList>
                <TabPanels className="flex-grow" >
                    <TabPanel className="h-full"><SavePage store={store.savePage}/></TabPanel>
                    <TabPanel className="h-full"><ViewPage store={store.viewPage}/></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
});

export default App;
