export interface PushNotificationData {
  id: string;
  title: string;
  text: string;
  appName?: string | null;
  icon?: string;
  routerLink?: string[];
  duration?: number;
}
