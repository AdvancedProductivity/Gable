import {Handler} from "../listener-handler";
import {getConfigRepository, getItemRepository} from "../../config/init-datasource";
import {Config} from "../../entity/Config";

export class ConfigGetHandler implements Handler {

  async handle(args: any[]) {
    const configRepository = await getConfigRepository();
    if (!args[0]) {
      return null;
    }
    const config = await configRepository.findOne({
      where: {
        key: args[0]
      }
    });
    if (!config) {
      return null;
    }
    return config.value;
  }

}
export class ConfigSetHandler implements Handler {

  async handle(args: any[]) {
    if (args[0] && args[1]) {
      const configRepository = await getConfigRepository();
      let config = await configRepository.findOne({
        where: {
          key: args[0]
        }
      });
      if (!config) {
        console.log('create new config')
        config = {key: args[0], value: args[1]}
        await configRepository.save(config)
      }else {
        console.log('update old config')
        config.value = args[1];
        await configRepository
          .createQueryBuilder('config')
          .update<Config>(Config, {value: args[1]})
          .where("config.key = :key", {key: args[0]})
          .execute();
      }
      return 'success';
    }
    return 'failed';
  }

}
