export interface DataUser {
  name: string;
  CPF: string;
  phone: number;
  email: string;
  confirmEmail: string;
  address: Address;
  position: string;
  technology: string;
  framework: boolean[];
  neswllet: string;
  id?: number;
}

interface Address {
  CEP: number;
  number: number;
  complement: string;
  street: string;
  district: string;
  city: string;
  states: string;
}
