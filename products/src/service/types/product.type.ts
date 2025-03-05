export type ProductDto = {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
      };
  };
