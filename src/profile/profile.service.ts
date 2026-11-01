import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { ProfileRepository } from './repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.profileRepository.findDefaultProfile();

    if (!profile) {
      throw new NotFoundException(
        'Profile not found. Ensure database is seeded.',
      );
    }

    return profile;
  }
}
