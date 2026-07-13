const PIN_UNLOCKED_KEY = 'pinUnlocked';
const SIGNED_IN_KEY = 'signedIn';

export const APP_PIN = '6767';

export function isPinUnlocked(): boolean {
  return sessionStorage.getItem(PIN_UNLOCKED_KEY) === 'true';
}

export function unlockWithPin(): void {
  sessionStorage.setItem(PIN_UNLOCKED_KEY, 'true');
}

export function isSignedIn(): boolean {
  return localStorage.getItem(SIGNED_IN_KEY) !== 'false';
}

export function signIn(): void {
  localStorage.setItem(SIGNED_IN_KEY, 'true');
  sessionStorage.setItem(PIN_UNLOCKED_KEY, 'true');
}

export function signOut(): void {
  sessionStorage.removeItem(PIN_UNLOCKED_KEY);
  localStorage.setItem(SIGNED_IN_KEY, 'false');
}
