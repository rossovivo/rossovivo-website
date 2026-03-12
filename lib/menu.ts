export type MenuItem = {
  name: string;
  description?: string;
  features?: string;
  price: number;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};
