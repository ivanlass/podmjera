export interface storeInterface {
  _id: string;
  name: string;
  owner: string;
  ownerAuthID: string;
  deliveryFee: number;
  freeDelivery: number;
  fridayClose: string;
  fridayOpen: string;
  minimalOrder: number;
  mondayClose: string;
  mondayOpen: string;
  noDeliveryLastMinutes: number;
  nonWorkingDay: string;
  saturdayClose: string;
  saturdayOpen: string;
  sundayClose: string;
  sundayOpen: string;
  thursdayClose: string;
  thursdayOpen: string;
  tuesdayClose: string;
  tuesdayOpen: string;
  wednesdayClose: string;
  wednesdayOpen: string;
  image: string;
  category: Array<string>;
  updatedAt: string;

  [key: string]: string | number | Array<string> | undefined;
}
