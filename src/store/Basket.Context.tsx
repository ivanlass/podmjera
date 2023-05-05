import React, { createContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  perPiece: boolean;
}

interface IProductInBasket {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  perPiece: boolean;
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
      if (product.perPiece ? productInBasket.quantity > 1 : productInBasket.quantity > 0.1) {
        setBasket(basket.map((item) => (item.id === product.id ? { ...item, quantity: product.perPiece ? item.quantity - 1 : Number((item.quantity - 0.1).toFixed(3)) } : item)));
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
          const qty = (item.quantity + 0.1).toFixed(3);
          return {
            ...item,
            quantity: product.perPiece ? item.quantity + 1 : Number(qty),
          };
        }
        return item;
      });
      setBasket(newBasket);
    } else {
      const qty = (0.1).toFixed(3);
      setBasket((prev: IProductInBasket[]) => [...prev, { ...product, quantity: product.perPiece ? 1 : Number(qty) }]);
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
