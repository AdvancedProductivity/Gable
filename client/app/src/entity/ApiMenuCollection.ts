import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('api_menu_collection')
export class ApiMenuCollection {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255
  })
  name: string;

  @Column({
    length: 16
  })
  type: string;

  @Column('int')
  apiCount: number;
}


@Entity('api_menu_item')
export class ApiMenuItem extends ApiMenuCollection {

  @Column({
    length: 16
  })
  tag: string;

  @Column({type: 'bigint'})
  version: number;

  @Column({type: 'bigint'})
  collectionId: number;

  @Column({type: 'bigint'})
  defineId: number;

}
