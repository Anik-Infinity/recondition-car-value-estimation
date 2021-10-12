import { Exclude } from 'class-transformer';
import { CustomBaseEntity } from 'src/common/entities/custom-base.entity';
import { Entity, Column, OneToMany, AfterInsert, AfterUpdate } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  // @Exclude()
  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  // This entity hook only works with save() function
  @AfterInsert()
  logAfterInsert() {
    console.log('🔥🔥🔥 User added with id ', this.id);
  }

  // This entity hook only works with remove() function
  @AfterUpdate()
  logAfterUpdate() {
    console.log('🔥🔥🔥 User updated with id ', this.id);
  }
}
