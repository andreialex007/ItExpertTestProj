import {makeObservable, observable} from 'mobx';
import SavePageStore from './Pages/Save/Store.ts';
import ViewPageStore from './Pages/View/Store.ts';

export default class Store {
    @observable
    tabIndex = 0;

    savePage = new SavePageStore();
    viewPage = new ViewPageStore();

    constructor() {
        makeObservable(this);
    }

    onTabChange = (index: number) => {
        this.tabIndex = index;
        if (index === 1) {
            this.viewPage.runSearch();
        }
    }
}
