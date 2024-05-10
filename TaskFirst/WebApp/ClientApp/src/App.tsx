import { observer } from 'mobx-react-lite';
import { counterStore } from './AppStore.ts';

const App = observer(() => {
    return (
        <div className="bg-orange-500" >
            <h1>Count: {counterStore.count}</h1>
            <button onClick={() => counterStore.increment()}>Increment</button>
            <button onClick={() => counterStore.decrement()}>Decrement</button>
        </div>
    );
});

export default App;
