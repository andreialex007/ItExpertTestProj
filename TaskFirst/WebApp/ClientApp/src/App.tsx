import {observer} from 'mobx-react-lite';
import Store from './AppStore.ts';
import React, {useMemo} from "react";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";

let store = new Store();

const App = observer(() => {

    return (
        <div className="size-full p-5">
            <TabGroup selectedIndex={store.tabIndex} onChange={index => store.tabIndex = index}>
                <TabList className="flex gap-2">
                    <Tab className={`outline-0 font-bold px-5 py-3 rounded ${(store.tabIndex === 0 ? 'bg-slate-600 text-white ' : 'bg-gray-100 hover:opacity-80')}`}>
                        Save
                    </Tab>
                    <Tab className={`outline-0 font-bold px-5 py-3 rounded ${(store.tabIndex === 1 ? 'bg-slate-600 text-white ' : 'bg-gray-100 hover:opacity-80')}`}>
                        View
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Content 1</TabPanel>
                    <TabPanel>Content 2</TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
});

export default App;
