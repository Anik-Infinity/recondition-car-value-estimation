
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report extends CustomBaseEntity {
  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => User, (user) => user.report)
  user: User;
}
