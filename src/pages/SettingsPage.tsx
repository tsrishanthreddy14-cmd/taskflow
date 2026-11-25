import React, { useState } from 'react';
import { NotificationPrefs, ThemeMode, UserProfile } from '../types';
import { Avatar } from '../components/Avatar';

interface SettingsPageProps {
  profile: UserProfile;
  onUpdateProfile: (next: UserProfile) => void;
  theme: ThemeMode;
  onSetTheme: (mode: ThemeMode) => void;
  prefs: NotificationPrefs;
  onUpdatePrefs: (next: NotificationPrefs) => void;
}

export function SettingsPage({
  profile,
  onUpdateProfile,
  theme,
  onSetTheme,
  prefs,
  onUpdatePrefs,
}: SettingsPageProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;
    onUpdateProfile({
      ...profile,
      name: trimmedName,
      email: trimmedEmail,
    });
    showToast('Profile details updated.');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateProfile({ ...profile, avatarUrl: reader.result });
        showToast('Profile picture updated.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleThemeSelect = (mode: ThemeMode) => {
    onSetTheme(mode);
    showToast(`Switched to ${mode} mode.`);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      showToast('Passwords do not match. Please try again.');
      return;
    }
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    showToast('Password updated successfully.');
  };

  return (
    <main className="flex-1 p-gutter-lg flex flex-col gap-gutter-lg max-w-4xl w-full mx-auto">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="px-4 py-3 rounded-md bg-light-secondary-container dark:bg-dark-secondary-container text-light-on-secondary-container dark:text-dark-on-secondary-container font-label text-label-lg flex items-center justify-between gap-3">
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            aria-label="Dismiss notification"
            className="inline-flex items-center justify-center rounded hover:opacity-75"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Profile Information */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-light-outline-variant dark:border-dark-outline-variant">
          <div className="flex items-center gap-4">
            <Avatar
              src={profile.avatarUrl}
              name={profile.name}
              className="w-16 h-16 border border-light-outline-variant dark:border-dark-outline-variant"
            />
            <div>
              <h2 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
                {profile.name}
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
                {profile.email} • {profile.workspace}
              </p>
            </div>
          </div>

          <label className="px-3.5 py-2 rounded border border-light-outline-variant dark:border-dark-outline-variant font-label text-label-md cursor-pointer hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container transition-colors whitespace-nowrap">
            <span>Change Photo</span>
            <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
          </label>
        </header>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md">Username</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md">Email Address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface"
            />
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-lg hover:opacity-90 transition-opacity"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>

      {/* Appearance & Theme */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
            Appearance &amp; Theme
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Switch between Light Mode and Dark Mode across all TaskFlow pages.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleThemeSelect('light')}
            className={`px-3.5 py-2 rounded font-label text-label-md transition-colors ${
              theme === 'light'
                ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                : 'border border-light-outline-variant dark:border-dark-outline-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container'
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => handleThemeSelect('dark')}
            className={`px-3.5 py-2 rounded font-label text-label-md transition-colors ${
              theme === 'dark'
                ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                : 'border border-light-outline-variant dark:border-dark-outline-variant hover:bg-light-surface-container-low dark:hover:bg-dark-surface-container'
            }`}
          >
            Dark
          </button>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
        <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
          Notification Preferences
        </h2>

        <label className="flex items-center justify-between gap-4 py-2 cursor-pointer">
          <div>
            <p className="font-label text-label-lg">Due-Date Reminders</p>
            <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Notify 1 hour before high-priority deadlines.
            </p>
          </div>
          <input
            type="checkbox"
            checked={prefs.dueDateReminders}
            onChange={(e) => {
              onUpdatePrefs({ ...prefs, dueDateReminders: e.target.checked });
              showToast('Notification preference updated.');
            }}
            className="w-5 h-5 rounded text-light-primary dark:text-dark-primary cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between gap-4 py-2 cursor-pointer border-t border-light-outline-variant dark:border-dark-outline-variant">
          <div>
            <p className="font-label text-label-lg">Weekly Productivity Digest</p>
            <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
              Receive a Sunday summary of completed tasks.
            </p>
          </div>
          <input
            type="checkbox"
            checked={prefs.weeklyDigest}
            onChange={(e) => {
              onUpdatePrefs({ ...prefs, weeklyDigest: e.target.checked });
              showToast('Notification preference updated.');
            }}
            className="w-5 h-5 rounded text-light-primary dark:text-dark-primary cursor-pointer"
          />
        </label>
      </section>

      {/* Change Password */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col gap-gutter-md">
        <h2 className="font-title text-title-lg text-light-on-surface dark:text-dark-on-surface">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-gutter-md">
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md">Current Password</span>
            <input
              type="password"
              required
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md">New Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md">Confirm Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3.5 py-2 rounded bg-light-surface-container-lowest dark:bg-dark-surface-container border border-light-outline-variant dark:border-dark-outline-variant text-body-md text-light-on-surface dark:text-dark-on-surface"
            />
          </label>
          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-lg hover:opacity-90 transition-opacity"
            >
              Update Password
            </button>
          </div>
        </form>
      </section>

      {/* Account & Logout */}
      <section className="bg-light-surface-container-lowest dark:bg-dark-surface-container-low border border-light-outline-variant dark:border-dark-outline-variant rounded-md p-gutter-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-title text-title-lg text-light-error dark:text-dark-error">
            Session &amp; Account
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant dark:text-dark-on-surface-variant">
            Sign out of your TaskFlow session on this device.
          </p>
        </div>
        <button
          type="button"
          onClick={() => showToast('Signed out safely.')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-light-error dark:bg-dark-error text-light-on-error dark:text-dark-on-error font-label text-label-lg hover:opacity-90 transition-opacity self-start sm:self-auto whitespace-nowrap shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Log Out</span>
        </button>
      </section>
    </main>
  );
}
