import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Entity, Column, OneToMany, AfterInsert, AfterUpdate } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @AfterInsert()
  logAfterInsert() {
    console.log('🔥🔥🔥 User added with id ', this.id);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log('🔥🔥🔥 User updated with id ', this.id);
  }
}
