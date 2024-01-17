import { atom } from "recoil";
export type DataRow = {
  id: number; // or string, if your IDs are strings
  apn: string;
  propertyAddress: string;
  county: string;
  state: string;
  zip: string;
  mailingCareOfName: string;
  mailingAddress: string;
  mailingCity: string;
  mailingState: string;
  mailingZip: string;
  mailingCountry: string;
  lotSize: string; // or number if it represents a numeric value
  acres: string; // or number if it represents a numeric value
  lowerPrice: number | null; // Assuming this can be null
  upperPrice: number | null; // Assuming this can be null
  lastSaleAmount: number | null; // Assuming this can be null
  today: string; // Assuming this is a date in string format
  today30: string; // Assuming this is a date in string format
  today45: string; // Assuming this is a date in string format
  refId: string;
};
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export const dataAtom = atom<DataRow[]>({
  key: "rawData",
  default: [],
});

export const csvDataAtom = atom({
  key: "csvDataState",
  default: null,
});
