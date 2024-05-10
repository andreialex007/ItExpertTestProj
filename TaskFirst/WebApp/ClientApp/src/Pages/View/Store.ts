import {makeObservable, observable} from 'mobx';

export default class Store {

    @observable
    jsonContent = '';

    constructor() {
        makeObservable(this);
    }

}
