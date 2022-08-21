import { DataSource } from "typeorm"
import {homedir} from "os";
import {Item} from "../entity/Item";
import {Repository} from "typeorm/repository/Repository";
import {Config} from "../entity/Config";
import {ApiMenuCollection, ApiMenuItem} from "../entity/ApiMenuCollection";

const dbFilePath = homedir() + '/.gable/';

console.log('sqlite3 file in ' + dbFilePath);
let myDataSource: DataSource;

function creatDatasource(dbFileName?): DataSource {
  if (!dbFileName) {
    dbFileName = 'gable.sqlite';
  }
  let dbF = dbFilePath + dbFileName;
  console.log('dbf is', dbF);
  myDataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: dbF,
    entities: [
      Item
      , Config
      , ApiMenuCollection
      , ApiMenuItem
    ]
  });
  return myDataSource;
}

export const initDatasource = async () => {
  if (myDataSource !== undefined) {
    console.log('datasource have been build')
    return;
  }
  creatDatasource()
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })
};

export const initTestDatasource = async () => {
  if (myDataSource !== undefined) {
    console.log('datasource have been build')
    return;
  }
  var cDatasource = creatDatasource('gable-test.sqlite');
  await cDatasource.initialize().then(() => {
    console.log("Data Source has been initialized!")
  }).catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });
  console.log("finished init database")
};

export const getItemRepository = async ():Promise<Repository<Item>> => {
  return myDataSource.getRepository(Item);
};

export const getConfigRepository = async ():Promise<Repository<Config>> => {
  return myDataSource.getRepository(Config);
};

export const getApiCollectionRepository = async ():Promise<Repository<ApiMenuCollection>> => {
  return myDataSource.getRepository(ApiMenuCollection);
};

export const getApiMenuItemRepository = async ():Promise<Repository<ApiMenuItem>> => {
  return myDataSource.getRepository(ApiMenuItem);
};
