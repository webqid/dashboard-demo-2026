'use client';

import { useState, useTransition, useEffect } from 'react';
import type { UserSettings } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, Button, Switch, Input } from '@/components/ui';
import { updateSettingsAction } from './actions';
import { useTheme } from '@/lib/theme';

interface SettingsFormProps {
  initialSettings: UserSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();

  // Sync settings state with actual theme on mount
  useEffect(() => {
    setSettings((prev) => ({ ...prev, theme: currentTheme }));
  }, [currentTheme]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setSettings({ ...settings, theme: newTheme });
    setTheme(newTheme);
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateSettingsAction(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Switch
              label="email notifications"
              description="receive email updates about your account activity."
              checked={settings.notifications.email}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: checked },
                })
              }
            />
            <Switch
              label="push notifications"
              description="receive push notifications on your devices."
              checked={settings.notifications.push}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: checked },
                })
              }
            />
            <Switch
              label="weekly digest"
              description="get a weekly summary of your activity."
              checked={settings.notifications.weekly}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, weekly: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="timezone"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                timezone
              </label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-text-secondary mb-1.5"
              >
                language
              </label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              theme
            </label>
            <div className="flex gap-3">
              {(['light', 'dark', 'system'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  type="button"
                  onClick={() => handleThemeChange(themeOption)}
                  className={`flex-1 px-4 py-3 rounded-md border-2 text-sm font-medium capitalize transition-colors ${
                    settings.theme === themeOption
                      ? 'border-brand bg-surface-muted text-text-primary'
                      : 'border-border hover:border-text-muted text-text-secondary'
                  }`}
                >
                  {themeOption}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-brand">settings saved</span>
        )}
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'saving...' : 'save changes'}
        </Button>
      </div>
    </div>
  );
}
