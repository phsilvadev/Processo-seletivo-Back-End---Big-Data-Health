import { User } from 'src/app/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  asset_id: string;

  @Column()
  public_id: string;

  @Column()
  version: number;

  @Column()
  version_id: string;

  @Column()
  signature: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  format: string;

  @Column()
  resource_type: string;

  @Column()
  created_at: string;

  @Column()
  bytes: number;

  @Column()
  type: string;

  @Column()
  etag: string;

  @Column()
  placeholder: boolean;

  @Column()
  url: string;

  @Column()
  secure_url: string;

  @Column()
  asset_folder: string;

  @Column()
  display_name: string;

  @Column()
  original_filename: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (key) => key.image)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
