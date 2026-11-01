import { Module } from '@nestjs/common';
import { ProfileLoader } from './loaders/profile.loader';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
  providers: [
    ProfileRepository,
    ProfileLoader,
    ProfileService,
    ProfileResolver,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
