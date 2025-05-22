import { createStore } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("database.db");

const TABLE_NAME = "users";

const store = createStore();
store.setTable(TABLE_NAME, {}); // Inicializa a tabela na memória

const persister = createExpoSqlitePersister(store, db);

const initializeStore = async () => {
  await persister.load();          // Carrega dados existentes
  await persister.startAutoSave(); // Ativa autosave
};

const clearTable = async () => {
  store.delTable(TABLE_NAME);      // 🔥 Remove a tabela da memória
  await persister.save();          // Salva alteração no banco
  await persister.load();          // Recarrega do banco (agora vazio)
};

export { store, TABLE_NAME, initializeStore, persister, clearTable };
