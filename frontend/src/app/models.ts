// src/app/models.ts
export interface MenuItem {
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
    note?: string; // Optional properties
  }
  