import { AgeGroups } from './AgeGroups';
import data from './data.json';

Ext.require([
    'Ext.data.Model',
    'Ext.data.Store'
]);

export class DataStore {
    constructor() {
        const model = Ext.create('Ext.data.Model', {
            fields: ['name', 'email', 'phone']
        });

        this.pagedStore = Ext.create('Ext.data.Store', {
            model: model,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        this.store = Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true,
            data: data,
            listeners: {
                load: (store) => {
                    this.pagedStore.getProxy().setData(store.getRange());
                    this.pagedStore.loadPage(1);
                },
                datachanged: (store) => {
                    this.pagedStore.getProxy().setData(store.getRange());
                    this.pagedStore.loadPage(Math.ceil(store.getCount() / store.getPageSize()));
                }
            }
        });

        this.ageGroups = (new AgeGroups()).store.getRange();

        this.store.commitChanges();
        return this;
    }

    add() {
        let count = this.store.getCount() + 1,
            index = count < 10 ? `0${count}` : count,
            age = this.ageGroups[Math.floor(Math.random() * Math.floor(3))],
            npa = `5${Math.floor(count/10) + 10}`,
            nxx = `10${count % 10}`,
            xxxx = `10${(count % 10) + 10}`;

        this.store.add({
            name: `User ${index}`,
            age: age.get('value'),
            email: `user${index}@home.now`,
            phone: `(${npa}) ${nxx}-${xxxx}`
        });
    }

    save() {
        this.store.commitChanges();
    }

    cancel() {
        this.store.rejectChanges();
    }

    last() {
        return this.store.last();
    }

    dirty() {
        return this.store.getModifiedRecords().length !== 0 || this.store.getRemovedRecords().length !== 0;
    }
}
