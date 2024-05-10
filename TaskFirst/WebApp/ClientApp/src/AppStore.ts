import {makeObservable, observable} from 'mobx';

export default class Store {
    title = () => 'Switcher';

    @observable
    tabIndex = 0;
    
    constructor() {
        makeObservable(this);
    }
}
