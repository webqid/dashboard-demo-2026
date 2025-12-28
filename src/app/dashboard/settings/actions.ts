'use server';

import type { UserSettings } from '@/types';
import { updateUserSettings } from '@/lib/data';

export async function updateSettingsAction(
  settings: Partial<UserSettings>
): Promise<{ success: boolean }> {
  try {
    await updateUserSettings(settings);
    return { success: true };
  } catch {
    return { success: false };
  }
}
