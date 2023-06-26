import React, { createContext, useState } from 'react';
import { articlesInterface } from '../interfaces/articles.interface';

type Props = {
  children: React.ReactNode;
};

interface Context {
  basket: articlesInterface[];
  decreaseQuantity: (product: articlesInterface) => void;
  increaseQuantity: (product: articlesInterface) => void;
  productQuantity: (id: string) => number;
  removeFromBasket: (id: string) => void;
  setBasketFromLocalStorage: (basket: articlesInterface[]) => void;
  totalPrice: number;
}

export const BasketContext = createContext<Context | null>(null);

export const BasketProvider = ({ children }: Props) => {
  const [basket, setBasket] = useState<articlesInterface[]>([]);

  const decreaseQuantity = (product: articlesInterface) => {
    const productInBasket = basket.find((item) => item._id === product._id);

    if (productInBasket) {
      if (product.perPiece ? productInBasket.quantity > 1 : productInBasket.quantity > 0.1) {
        const newBasket = basket.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: product.perPiece ? item.quantity - 1 : Number((item.quantity - 0.1).toFixed(3)),
              }
            : item
        );
        setBasket(newBasket);

        // Store updated basket in localStorage
        localStorage.setItem('basket', JSON.stringify(newBasket));
        localStorage.setItem('basketTimestamp', new Date().getTime().toString());
      } else {
        const updatedBasket = basket.filter((item) => item._id !== product._id);
        setBasket(updatedBasket);

        // Store updated basket in localStorage
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
        localStorage.setItem('basketTimestamp', new Date().getTime().toString());
      }
    }
  };

  const increaseQuantity = (product: articlesInterface) => {
    const productInBasket = basket?.find((item: articlesInterface) => item._id === product._id);
    if (productInBasket) {
      const newBasket = basket?.map((item: articlesInterface) => {
        if (item._id === product._id) {
          const qty = (item.quantity + 0.1).toFixed(3);
          return {
            ...item,
            quantity: product.perPiece ? item.quantity + 1 : Number(qty),
          };
        }
        return item;
      });
      setBasket(newBasket);
      localStorage.setItem('basket', JSON.stringify(newBasket));
      localStorage.setItem('basketTimestamp', new Date().getTime().toString());
    } else {
      const qty = (0.1).toFixed(3);
      const updatedBasket = [...basket, { ...product, quantity: product.perPiece ? 1 : Number(qty) }];
      setBasket(updatedBasket);
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      localStorage.setItem('basketTimestamp', new Date().getTime().toString());
    }
  };

  const productQuantity = (id: string) => {
    const product = basket?.find((item: articlesInterface) => item._id === id);
    if (product?.quantity) {
      return product.quantity;
    } else {
      return 0;
    }
  };

  const setBasketFromLocalStorage = (products: articlesInterface[]) => {
    setBasket(products);
  };

  const removeFromBasket = (id: string) => {
    const updatedBasket = basket.filter((item) => item._id !== id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    localStorage.setItem('basketTimestamp', new Date().getTime().toString());
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
        setBasketFromLocalStorage,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
