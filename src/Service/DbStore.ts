import idb from 'idb';

var dbPromise = idb.open('moxy-coins-db', 1, function (upgradeDb) {
    console.info("upgradeDb.oldVersion", upgradeDb.oldVersion);
    switch (upgradeDb.oldVersion) {
        case 0:
            let store = upgradeDb.createObjectStore('all-coins', { keyPath: 'Id' });
            store.createIndex('name', 'Name');
            store.createIndex('symbol', 'Symbol');
        // var keyValStore = upgradeDb.createObjectStore('keyval');
        // keyValStore.put("world", "hello");
        case 1:
        // upgradeDb.createObjectStore('people', { keyPath: 'name' });
        case 2:
        // var peopleStore = upgradeDb.transaction.objectStore('people');
        // peopleStore.createIndex('animal', 'favoriteAnimal');
        case 3:
        // peopleStore = upgradeDb.transaction.objectStore('people');
        // peopleStore.createIndex('age', 'age');
    }
});


export default class DbStore {

    constructor() {

    }

    private async getStore(){
        var db = await dbPromise;
        var tx = db.transaction('all-coins', 'readwrite');
        return tx.objectStore('all-coins');
    }

    private async getCoinListFromStore() {
        let store = await this.getStore();
        return await store.getAll()
    }

    public async getCoinList() {
        let coinlist: any[] = await this.getCoinListFromStore()
        if (coinlist.length > 0) {
            console.info("Returning list");
            return coinlist;
        }
        const url = "https://min-api.cryptocompare.com/data/all/coinlist"
        console.info("Fetching");
        var response = await fetch(url);
        let results = await response.json();
        var db = await dbPromise;
        var tx = db.transaction('all-coins', 'readwrite');
        var store = tx.objectStore('all-coins');
        console.info("Saving to store");
        Object.entries(results.Data).forEach(([key, value]) => store.put(value))
        await tx.complete;
        console.info("Returning new list");
        return await this.getCoinListFromStore();
    }



}