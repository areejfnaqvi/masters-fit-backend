import { profileService, userService } from "@/services";
import { Profile, ProfileResponse } from "@/types/profile/types";
import { ApiResponse } from "@/types/common/responses";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Example,
  Security,
} from "@tsoa/runtime";

@Route("profile")
@Tags("Profile")
@Security("bearerAuth")
export class ProfileController extends Controller {
  /**
   * Get the user's profile
   */
  @Get("/{userId}")
  @Response<ApiResponse>(400, "Bad Request")
  public async getProfile(@Path() userId: number): Promise<ProfileResponse> {
    const dbProfile = await profileService.getProfileByUserId(userId);
    if (!dbProfile) {
      throw new Error("Profile not found");
    }
    const profile: Profile = {
      id: dbProfile.id,
      userId: dbProfile.userId,
      height: dbProfile.height ?? undefined,
      weight: dbProfile.weight ?? undefined,
      age: dbProfile.age ?? undefined,
      gender: dbProfile.gender ?? undefined,
      goals: dbProfile.goals ?? undefined,
      fitnessLevel: dbProfile.fitnessLevel ?? undefined,
      limitations: dbProfile.limitations ?? undefined,
      medicalNotes: dbProfile.medicalNotes ?? undefined,
      environment: dbProfile.environment ?? undefined,
      equipment: dbProfile.equipment ?? undefined,
      otherEquipment: dbProfile.otherEquipment ?? undefined,
      preferredStyles: dbProfile.preferredStyles ?? undefined,
      availableDays: dbProfile.availableDays ?? undefined,
      workoutDuration: dbProfile.workoutDuration ?? undefined,
      intensityLevel: dbProfile.intensityLevel ?? undefined,
      created_at: dbProfile.updatedAt ?? new Date(),
      updated_at: dbProfile.updatedAt ?? new Date(),
    };
    return {
      success: true,
      profile,
    };
  }

  /**
   * Create or update the user's profile
   */
  @Post("/")
  @Response<ApiResponse>(400, "Bad Request")
  @SuccessResponse(201, "Created")
  public async createProfile(
    @Body() requestBody: Partial<Profile>
  ): Promise<ProfileResponse> {
    const dbProfile = await profileService.createOrUpdateProfile({
      userId: requestBody.userId!,
      height: requestBody.height ?? null,
      weight: requestBody.weight ?? null,
      age: requestBody.age ?? null,
      gender: requestBody.gender ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      goals: requestBody.goals ?? null,
      fitnessLevel: requestBody.fitnessLevel ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      limitations: requestBody.limitations ?? null,
      medicalNotes: requestBody.medicalNotes ?? null,
      environment: requestBody.environment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      equipment: requestBody.equipment ?? null,
      otherEquipment: requestBody.otherEquipment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      preferredStyles: requestBody.preferredStyles ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      availableDays: requestBody.availableDays ?? null,
      workoutDuration: requestBody.workoutDuration ?? null,
      intensityLevel: requestBody.intensityLevel ?? null,
    });
    const profile: Profile = {
      id: dbProfile.id,
      userId: dbProfile.userId,
      height: dbProfile.height ?? undefined,
      weight: dbProfile.weight ?? undefined,
      age: dbProfile.age ?? undefined,
      gender: dbProfile.gender ?? undefined,
      goals: dbProfile.goals ?? undefined,
      fitnessLevel: dbProfile.fitnessLevel ?? undefined,
      limitations: dbProfile.limitations ?? undefined,
      medicalNotes: dbProfile.medicalNotes ?? undefined,
      environment: dbProfile.environment ?? undefined,
      equipment: dbProfile.equipment ?? undefined,
      otherEquipment: dbProfile.otherEquipment ?? undefined,
      preferredStyles: dbProfile.preferredStyles ?? undefined,
      availableDays: dbProfile.availableDays ?? undefined,
      workoutDuration: dbProfile.workoutDuration ?? undefined,
      intensityLevel: dbProfile.intensityLevel ?? undefined,
      created_at: dbProfile.updatedAt ?? new Date(),
      updated_at: dbProfile.updatedAt ?? new Date(),
    };
    const user = await userService.getUser(requestBody.userId!);
    await userService.updateUser({
      email: user?.email,
      needsOnboarding: false,
    });

    // Get the updated user with needsOnboarding: false
    const updatedUser = await userService.getUser(requestBody.userId!);

    return {
      success: true,
      profile,
      user: updatedUser,
      needsOnboarding: false,
    };
  }

  /**
   * Update the user's profile
   */
  @Put("/{id}")
  @Response<ApiResponse>(400, "Bad Request")
  @SuccessResponse(200, "Success")
  public async updateProfile(
    @Path() id: number,
    @Body() requestBody: Partial<Profile>
  ): Promise<ProfileResponse> {
    const dbProfile = await profileService.createOrUpdateProfile({
      id,
      userId: requestBody.userId!,
      height: requestBody.height ?? null,
      weight: requestBody.weight ?? null,
      age: requestBody.age ?? null,
      gender: requestBody.gender ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      goals: requestBody.goals ?? null,
      fitnessLevel: requestBody.fitnessLevel ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      limitations: requestBody.limitations ?? null,
      medicalNotes: requestBody.medicalNotes ?? null,
      environment: requestBody.environment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      equipment: requestBody.equipment ?? null,
      otherEquipment: requestBody.otherEquipment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      preferredStyles: requestBody.preferredStyles ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      availableDays: requestBody.availableDays ?? null,
      workoutDuration: requestBody.workoutDuration ?? null,
      intensityLevel: requestBody.intensityLevel ?? null,
      updatedAt: new Date(),
    });
    const profile: Profile = {
      id: dbProfile.id,
      userId: dbProfile.userId,
      height: dbProfile.height ?? undefined,
      weight: dbProfile.weight ?? undefined,
      age: dbProfile.age ?? undefined,
      gender: dbProfile.gender ?? undefined,
      goals: dbProfile.goals ?? undefined,
      fitnessLevel: dbProfile.fitnessLevel ?? undefined,
      limitations: dbProfile.limitations ?? undefined,
      medicalNotes: dbProfile.medicalNotes ?? undefined,
      environment: dbProfile.environment ?? undefined,
      equipment: dbProfile.equipment ?? undefined,
      otherEquipment: dbProfile.otherEquipment ?? undefined,
      preferredStyles: dbProfile.preferredStyles ?? undefined,
      availableDays: dbProfile.availableDays ?? undefined,
      workoutDuration: dbProfile.workoutDuration ?? undefined,
      intensityLevel: dbProfile.intensityLevel ?? undefined,
      created_at: dbProfile.updatedAt ?? new Date(),
      updated_at: dbProfile.updatedAt ?? new Date(),
    };
    return {
      success: true,
      profile,
    };
  }

  /**
   * Update the user's profile by userId
   */
  @Put("/user/{userId}")
  @Response<ApiResponse>(400, "Bad Request")
  @SuccessResponse(200, "Success")
  public async updateProfileByUserId(
    @Path() userId: number,
    @Body() requestBody: Partial<Profile>
  ): Promise<ProfileResponse> {
    const dbProfile = await profileService.createOrUpdateProfile({
      userId,
      height: requestBody.height ?? null,
      weight: requestBody.weight ?? null,
      age: requestBody.age ?? null,
      gender: requestBody.gender ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      goals: requestBody.goals ?? null,
      fitnessLevel: requestBody.fitnessLevel ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      limitations: requestBody.limitations ?? null,
      medicalNotes: requestBody.medicalNotes ?? null,
      environment: requestBody.environment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      equipment: requestBody.equipment ?? null,
      otherEquipment: requestBody.otherEquipment ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      preferredStyles: requestBody.preferredStyles ?? null,
      // @ts-ignore - TypeScript types mismatch with Drizzle schema
      availableDays: requestBody.availableDays ?? null,
      workoutDuration: requestBody.workoutDuration ?? null,
      intensityLevel: requestBody.intensityLevel ?? null,
    });
    const profile: Profile = {
      id: dbProfile.id,
      userId: dbProfile.userId,
      height: dbProfile.height ?? undefined,
      weight: dbProfile.weight ?? undefined,
      age: dbProfile.age ?? undefined,
      gender: dbProfile.gender ?? undefined,
      goals: dbProfile.goals ?? undefined,
      fitnessLevel: dbProfile.fitnessLevel ?? undefined,
      limitations: dbProfile.limitations ?? undefined,
      medicalNotes: dbProfile.medicalNotes ?? undefined,
      environment: dbProfile.environment ?? undefined,
      equipment: dbProfile.equipment ?? undefined,
      otherEquipment: dbProfile.otherEquipment ?? undefined,
      preferredStyles: dbProfile.preferredStyles ?? undefined,
      availableDays: dbProfile.availableDays ?? undefined,
      workoutDuration: dbProfile.workoutDuration ?? undefined,
      intensityLevel: dbProfile.intensityLevel ?? undefined,
      created_at: dbProfile.updatedAt ?? new Date(),
      updated_at: dbProfile.updatedAt ?? new Date(),
    };
    return {
      success: true,
      profile,
    };
  }
}

export const profileController = new ProfileController();
