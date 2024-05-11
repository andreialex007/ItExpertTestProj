import {action, computed, makeObservable, observable} from 'mobx';
import axios from './../../Common/axiosConfig.ts';

type Item = {
    id: number;
    code: number;
    value: string;
};

class SearchResponse<T> {
    total: number;
    filtered: number;
    items: T[];

    constructor(total: number, filtered: number, items: T[]) {
        this.total = total;
        this.filtered = filtered;
        this.items = items;
    }
}

export default class Store {
    @observable
    code: number | null = null;

    timeout: any = null;

    @observable
    value = '';

    @observable
    pageNumber = 0;

    @observable
    pageSize = 15;

    @observable
    total = 0;

    @observable
    filtered = 0;

    @computed
    get totalPages() {
        return Math.ceil(this.filtered / this.pageSize);
    }

    @observable
    items: Array<Item> = [];

    constructor() {
        makeObservable(this);
        this.runSearch();
    }

    @action
    trigger = (action: () => void) => {
        action();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.pageNumber = 0;
            this.runSearch();
        }, 500);
    };

    @action
    changePage = (page: number) => {
        this.pageNumber = page;
        this.runSearch();
    };

    @action
    updateCode = (code: string) => {
        let number = parseInt(code);
        this.code = isNaN(number) ? null : number;
    };

    @action
    runSearch = async () => {
        let skip = this.pageNumber * this.pageSize;
        let params = {code: this.code, value: this.value, skip: skip, take: this.pageSize};
        let response = await axios.get<SearchResponse<Item>>('/codes', {params: params});
        this.runSearchCompleted(response.data);
    };

    @action
    runSearchCompleted = (data: SearchResponse<Item>) => {
        this.filtered = data.filtered;
        this.total = data.total;
        this.items = data.items;
    };
}
