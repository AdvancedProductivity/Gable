import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('docs')
export class Docs {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    length: 512
  })
  name: string;

  @Column({
    type: "bigint"
  })
  dateCreated: number;

}

@Entity('doc_menu')
export class DocMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "bigint"
  })
  docId: number;

  @Column({
    type: "int"
  })
  level: number;

  @Column({
    type: "int"
  })
  itemCount: number;

  @Column({
    type: "bigint"
  })
  parentId: number;

  @Column({
    length: 512
  })
  name: string;

  @Column({
    length: 128
  })
  apiKey: string;

  @Column({
    type: "bigint"
  })
  dateCreated: number;
}


@Entity('doc_define')
export class DocDefine{

  @Column({
    unique: true,
    nullable: false
  })
  @PrimaryColumn()
  id: number;

  @Column({
    type: "bigint"
  })
  time: number;

  @Column({
    length: 512
  })
  name: string;

  @Column({
    length: 32
  })
  version: string;
}

@Entity('doc_block')
export class DocBlock {
  @PrimaryGeneratedColumn()
  i: number;

  @Column({
    length: 32
  })
  id: string;

  @Column({
    type: "bigint"
  })
  docDefineId: number;

  @Column({
    type: "int"
  })
  order: number;

  @Column({
    length: 16
  })
  type: string;

  @Column({
    type: "text"
  })
  data: string;

  @Column({
    type: "text"
  })
  config: string;
}
