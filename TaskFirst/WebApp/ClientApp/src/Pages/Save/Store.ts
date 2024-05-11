import { action, makeObservable, observable } from 'mobx';
import data from './SampleData.json';
import axios from './../../Common/axiosConfig.ts';

export default class Store {
	@observable
	jsonContent = JSON.stringify(data, null, 2);

	@observable
	loading = false;

	constructor() {
		makeObservable(this);
	}

	@action
	saveJson = async () => {
		let content = this.jsonContent;
		this.loading = true;
		await axios.post<any>('/codes', JSON.parse(content));
		this.loading = false;
		alert('saved!');
	};
}
