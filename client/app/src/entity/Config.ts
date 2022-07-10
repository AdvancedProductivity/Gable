import {Entity, PrimaryGeneratedColumn, Column, Unique, PrimaryColumn} from 'typeorm';

@Entity()
export class Config{

  @Column({
    unique: true,
    nullable: false
  })
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
