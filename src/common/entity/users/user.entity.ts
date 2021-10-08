import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];
}
