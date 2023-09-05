export type AuthResult = {
  token: string;
};

export type SignBody = {
  email: string;
  password: string;
};

export type UpdateBody = {
  name: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: unknown;
};

export type User = Omit<Profile, 'email' | 'signUpDate'>;
