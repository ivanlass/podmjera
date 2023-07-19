export enum Mode {
  Default = 'default', //when user delete search bar or choose "sve" for category it will be default mode and display infinite scroll
  Search = 'search', //when user type something in search bar it will be search mode and display search result
  Category = 'category', //when user click on category it will be category mode and display category result
}

export enum TimeArrivalOptions {
  Odmah = 'Odmah',
  PoslijePodne = 'Poslije podne',
  Predvecer = 'Predvečer',
}

export enum TimeArrivalOptionsValues {
  Odmah = 'U roku od 90 minuta',
  PoslijePodne = '14:00 - 16:00',
  Predvecer = '17:00 - 20:00',
}

type OrderStatus = {
  [key: string]: string;
};

export const orderStatus: OrderStatus = {
  pending: 'Prispjelo',
  shipped: 'Otpremljeno',
  delivered: 'Dostavljeno',
};

export const reversedOrderStatus: OrderStatus = Object.keys(orderStatus).reduce(
  (acc: OrderStatus, key: string) => {
    const value = orderStatus[key];
    acc[value] = key;
    return acc;
  },
  {}
);