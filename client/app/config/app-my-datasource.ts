import { DataSource } from "typeorm"
import {homedir} from "os";
import {Item} from "../entity/Item";

const dbFilePath = homedir() + '/.gable/database.sqlite';

console.log('sqlite3 file in ' + dbFilePath);

const myDataSource = new DataSource({
  type: 'sqlite',
  synchronize: true,
  logging: true,
  logger: 'simple-console',
  database: dbFilePath,
  entities: [
    Item
  ]
})

export const initDatasource = () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })
};

export const getItemRepository = async () => {
  return myDataSource.getRepository(Item);
};
