export type User = {
  id: string;
  name: string;
  email: string;
  customer: string;
};

export type Hotel = {
  id: number;
  name: string;
  location: string;
  rooms: number;
  description: string;
  href: string;
  image: string;
  availableRooms: number;
};
