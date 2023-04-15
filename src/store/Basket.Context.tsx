import React, { createContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface IProductInBasket {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type Props = {
  children: React.ReactNode;
};

interface Context {
  basket: IProductInBasket[];
  decreaseQuantity: (product: IProduct) => void;
  increaseQuantity: (product: IProduct) => void;
  productQuantity: (id: string) => number;
  removeFromBasket: (id: string) => void;
  totalPrice: number;
}

export const BasketContext = createContext<Context | null>(null);

export const BasketProvider = ({ children }: Props) => {
  const [basket, setBasket] = useState<IProductInBasket[]>([]);

  const decreaseQuantity = (product: IProduct) => {
    const productInBasket = basket.find((item) => item.id === product.id);
    if (productInBasket) {
      if (productInBasket.quantity > 1) {
        setBasket(basket.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)));
      } else {
        setBasket(basket.filter((item) => item.id !== product.id));
      }
    }
  };

  const increaseQuantity = (product: IProduct) => {
    const productInBasket = basket?.find((item: IProduct) => item.id === product.id);
    if (productInBasket) {
      const newBasket = basket?.map((item: IProductInBasket) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setBasket(newBasket);
    } else {
      setBasket((prev: IProductInBasket[]) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const productQuantity = (id: string) => {
    const product = basket?.find((item: IProduct) => item.id === id);
    if (product?.quantity) {
      return product.quantity;
    } else {
      return 0;
    }
  };

  const removeFromBasket = (id: string) => {
    setBasket(basket.filter((item) => item.id !== id));
  };

  const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <BasketContext.Provider
      value={{
        basket,
        decreaseQuantity,
        increaseQuantity,
        productQuantity,
        removeFromBasket,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
