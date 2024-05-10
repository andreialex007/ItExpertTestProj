import {makeObservable, observable} from 'mobx';
import data from './SampleData.json';

export default class Store {

    @observable
    jsonContent = JSON.stringify(data, null, 2);

    constructor() {
        makeObservable(this);
    }

}
