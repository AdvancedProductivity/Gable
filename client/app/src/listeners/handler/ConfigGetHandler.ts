import {Handler} from "../listener-handler";
import {getConfigRepository, getItemRepository} from "../../config/init-datasource";

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
      const config = {key: args[0], value: args[1]}
      const configRepository = await getConfigRepository();
      await configRepository.save(config)
      return 'success';
    }
    return 'failed';
  }

}
