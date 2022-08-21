import {Handler} from "../listener-handler";
import {getHttpApiRepository} from "../../config/init-datasource";
import {HttpApi} from "../../entity/HttpApi";


export class AddHttp implements Handler  {

  async handle(args: any[]): Promise<any> {
    const apiRepository = await getHttpApiRepository();
    const saved = await apiRepository.save(args[0]);
    console.log('AddHttp ', saved);
    return new Promise(resolve => {
      resolve(saved.id);
    });
  }
}


export class GetApiDefine implements Handler  {

  async handle(args: any[]): Promise<any> {
    const apiRepository = await getHttpApiRepository();
    const data = await apiRepository.findOne({
      where: {
        id: args[0]
      }
    });
    console.log('GetApiDefine ', data);
    return new Promise(resolve => {
      resolve(data);
    });
  }
}

export class UpdateApi implements Handler  {

  async handle(args: any[]): Promise<any> {
    const apiRepository = await getHttpApiRepository();
    const updated = await apiRepository
      .createQueryBuilder()
      .update<HttpApi>(HttpApi, args[1])
      .where("id = :id", {id: args[0]})
      .execute();
    console.log('UpdateApi ', updated);
    return new Promise(resolve => {
      resolve(updated);
    });
  }
}
