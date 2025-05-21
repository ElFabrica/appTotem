import { createStore } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from 'expo-sqlite';

// Abre o banco de dados corretamente
console.log(SQLite)
const db = SQLite.openDatabaseSync("database.db");

const TABLE_NAME = "users";

const store = createStore();
store.setTable(TABLE_NAME, {}); // Inicializa tabela se ainda não existir

const persister = createExpoSqlitePersister(store, db); // Passa o db corretamente

const initializeStore = async () => {
  await persister.load();
  await persister.startAutoSave();
};

export { store, TABLE_NAME, initializeStore };
