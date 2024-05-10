import {observer} from "mobx-react-lite";
import Store from "./Store.ts";

export default observer(({store}: { store: Store }) => {
    return (
        <div className="flex flex-col gap-4 p-4">
        VIEW
        </div>
    );
});