export interface UserInterface {
    _id: string;
    name: string;
    email: string;
    date?: Date;
    familyName?: string;
    picture?: string;
    givenName?: string;
    nickname?: string;
    authID: string;
    storeID?: string;
    addresses?: string[];
    phoneNumbers?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }