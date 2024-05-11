import {makeObservable, observable} from 'mobx';

export default class Store {

    @observable
    code : number | null = null;
    
    @observable
    value  = "";

    constructor() {
        makeObservable(this);
    }

    trigger = (action: () => void) =>{
        action();
        
    }
    
    
}
