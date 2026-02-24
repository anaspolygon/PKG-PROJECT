export interface NavbarMenu {
  name: string;
  link?: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}
