import idb, { DB, UpgradeDB } from "idb";
import { CoinItem } from "../Contracts/coins";

export default class AllCoinsDbStore {
  private dbPromise: Promise<DB>;
  constructor() {
    this.dbPromise = idb.open("moxy-coins-db", 1, function(upgradeDb: UpgradeDB): void {
      switch (upgradeDb.oldVersion) {
        case 0:
          let store = upgradeDb.createObjectStore<CoinItem, number>("all-coins", { keyPath: "Id" });
          store.createIndex("sortOrder", "SortOrder");
          store.createIndex("name", "Name");
          store.createIndex("symbol", "Symbol");
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
  }

  private async getStore() {
    const db = await this.dbPromise;
    const tx = db.transaction("all-coins", "readwrite");
    return tx.objectStore<CoinItem, number>("all-coins");
  }

  private async getCoinListFromStore() {
    const store = await this.getStore();
    const sortIndex = store.index<number>("sortOrder");
    return await sortIndex.getAll();
  }

  public async getCoinList() {
    let coinlist: Array<CoinItem> = await this.getCoinListFromStore();
    if (coinlist.length > 0) {
      return coinlist;
    }
    const url = `${process.env.REACT_APP_DATA_API_URL}/data/all/coinlist`;
    var response = await fetch(url);
    let results = await response.json();
    var db = await this.dbPromise;
    var tx = db.transaction("all-coins", "readwrite");
    var store = tx.objectStore("all-coins");
    Object.entries(results.Data as Array<CoinItem>).forEach(([key, value]) =>
      store.put({
        ...value,
        Id: Number(value.Id),
        SortOrder: Number(value.SortOrder)
      })
    );
    await tx.complete;
    return await this.getCoinListFromStore();
  }
}
