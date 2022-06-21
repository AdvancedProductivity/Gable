import {initTestDatasource} from "../../src/config/init-datasource";
import {
  OnItemAddHandler,
  OnItemClearHandler,
  OnItemGetAllHandler
} from "../../src/listeners/item-listener";
import {Item} from "../../src/entity/Item";

beforeEach(async () => {
  await initTestDatasource();
});
describe('item test', () => {

  it('test add item', async () => {
    var onItemAddHandler1 = new OnItemAddHandler();
    var data = await onItemAddHandler1.handle(null);
    console.log('zzq see added data', data);
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
    expect(data.id).not.toBeNull();

  });

  it('test get all', async () => {
    var onItemGetAllHandler1 = new OnItemGetAllHandler();
    var data = await onItemGetAllHandler1.handle(null);
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
    expect(data.length).toBeGreaterThanOrEqual(1);

  });

  it('test clear all', async () => {
    var onItemClearHandler = new OnItemClearHandler();
    var data = await onItemClearHandler.handle(null);
    console.log('zzq see data', data)
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();

    var onItemGetAllHandler1 = new OnItemGetAllHandler();
    const d: Item[] = await onItemGetAllHandler1.handle(null);
    expect(0).toBe(d.length);
  });
});
