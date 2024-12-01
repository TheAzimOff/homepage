export function generateShortcutId() {
  // Use a combination of timestamp and random number for uniqueness
  return `shortcut_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}