import { DataStore} from "./database.js";

async function start() {
    await DataStore.initialize()
}

start()