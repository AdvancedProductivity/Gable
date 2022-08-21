import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('api_http')
export class HttpApi {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 8
  })
  protocol: string;

  @Column({
    length: 36
  })
  method: string;

  @Column({
    length: 255
  })
  host: string;

  @Column({
    type: "text"
  })
  hostArr: string;

  @Column({
    length: 36
  })
  port: string;

  @Column({
    length: 255
  })
  path: string;

  @Column({
    type: "text"
  })
  pathArray: string;


  @Column({
    length: 255
  })
  url: string;

  @Column({
    type: "text"
  })
  query: string;

  @Column({
    type: "text"
  })
  header: string;

  @Column({
    length: 36
  })
  bodyType: string;

  @Column({
    type: "text"
  })
  bodyForm: string;

  @Column({
    type: "text"
  })
  bodyUrlEncoded: string;


  @Column({
    type: "text"
  })
  bodyText: string;

  @Column({
    type: "text"
  })
  bodyTextDoc: string;

  @Column({
    type: "text"
  })
  respBodyTextDoc: string;

  @Column({
    length: 36
  })
  bodyTextType: string;

  @Column({
    type: "text"
  })
  bodyGraphQlQuery: string;


  @Column({
    type: "text"
  })
  bodyGraphQlVar: string;

  @Column({type: 'bigint'})
  version: number;
}
