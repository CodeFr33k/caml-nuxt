import { action, observable } from 'mobx';

class Store {
    @observable data = {};

    @action.bound parseText(text: string | ArrayBuffer | null) {
        if(!text) {
            return;
        }
    }
}

export default new Store();
