export interface AppDrawerBaseItem {
  type: AppDrawerItemType,
  id: string;
  label: string;
  condition: () => boolean;
}

export enum AppDrawerItemType {
  Group,
  Entry,
}
