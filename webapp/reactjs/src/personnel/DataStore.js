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

        this.ownerGrid = null;

        this.pagedStore = Ext.create('Ext.data.Store', {
            model: model,
            proxy: {
                type: 'memory',
                enablePaging: true
            },
            listeners: {
                update: (store, record) => {
                    let source = this.store.getById(record.id);

                    if(source && record.modified) {
                        source.data = record.data;
                        source.modified = record.modified;
                        source.dirty = record.dirty;
                    }
                }
            }
        });

        this.store = Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true,
            data: Ext.Array.map(data, (item, index) => { item.index = index + 1; return item; }),
            listeners: {
                load: (store) => {
                    this.pagedStore.getProxy().setData(store.getRange());
                    this.pagedStore.loadPage(1);
                },
                datachanged: (store) => {
                    this.pagedStore.getProxy().setData(store.getRange());
                }
            }
        });

        this.ageGroups = (new AgeGroups()).store.getRange();

        this.store.commitChanges();
        return this;
    }

    add() {
        let count = this.store.last().get('index') + 1,
            index = count < 10 ? `0${count}` : count,
            age = this.ageGroups[Math.floor(Math.random() * Math.floor(3))],
            npa = `5${Math.floor(count/10) + 10}`,
            nxx = `10${count % 10}`,
            xxxx = `10${(count % 10) + 10}`;

        this.store.add({
            name: `User ${index}`,
            age: age.get('value'),
            email: `user${index}@home.now`,
            phone: `(${npa}) ${nxx}-${xxxx}`,
            index: count
        });

        this.pagedStore.loadPage(Math.ceil(this.store.getCount() / this.pagedStore.getPageSize()));
        this.ensureVisible(true);
    }

    remove(record) {
        this.store.remove(record);
        this.pagedStore.loadPage(this.pagedStore.currentPage);
    }

    save() {
        this.store.commitChanges();
    }

    cancel() {
        this.store.rejectChanges();

        const lastPage = Math.ceil(this.store.getCount() / this.pagedStore.getPageSize());
        if(lastPage < this.pagedStore.currentPage) {
            this.pagedStore.loadPage(lastPage);
            this.ensureVisible();
        } else {
            this.pagedStore.loadPage(this.pagedStore.currentPage);
        }

    }

    last() {
        return this.store.last();
    }

    dirty() {
        return this.store.getModifiedRecords().length !== 0
            || this.store.getRemovedRecords().length !== 0;
    }

    ensureVisible(last) {
        const selected = last ? this.pagedStore.last() : this.ownerGrid.getSelection()[0] || this.pagedStore.last();
        this.ownerGrid.ensureVisible(selected, {select: true, animate: false});
        this.ownerGrid.getView().refresh();
    }
}
