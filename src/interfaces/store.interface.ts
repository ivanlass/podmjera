export interface storeInterface {
    _id: string,
    name: string,
    owner: string,
    ownerAuthID: string,
    __v: number,
    deliveryFee: number,
    freeDelivery: number,
    fridayClose: string,
    fridayOpen: string,
    minimalOrder: number,
    mondayClose: string,
    mondayOpen: string,
    noDeliveryLastMinutes: number,
    nonWorkingDay: string,
    saturdayClose: string,
    saturdayOpen: string,
    sundayClose: string,
    sundayOpen: string,
    thursdayClose: string,
    thursdayOpen: string,
    tuesdayClose: string,
    tuesdayOpen: string,
    wednesdayClose: string,
    wednesdayOpen: string,
    image: string,
    category: Array<string>,
    updatedAt: string
};


// this is store interface
// _id: "6430390764b1d82ef84c7639"
// name: "Jeleckusa"
// owner: "642da97b12ed5f8326f9d6e4"
// ownerAuthID: "google-oauth2|114039700042936801304"
// __v: 0
// deliveryFee: null
// freeDelivery: null
// fridayClose: "19:32"
// fridayOpen: "19:32"
// minimalOrder: null
// mondayClose: "19:33"
// mondayOpen: "19:31"
// noDeliveryLastMinutes: null
// nonWorkingDay: ""
// saturdayClose: "19:33"
// saturdayOpen: "19:33"
// sundayClose: "19:33"
// sundayOpen: "19:32"
// thursdayClose: "19:32"
// thursdayOpen: "19:31"
// tuesdayClose: "19:31"
// tuesdayOpen: "19:31"
// wednesdayClose: "19:32"
// wednesdayOpen: "19:32"
// image: "https://storage.googleapis.com/artikli_bucket/1682401164651-kindpng_2053435.png"
// ▶ category 3 items
// updatedAt: "2023-04-27T19:22:25.308Z"