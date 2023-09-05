export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  profile?: Maybe<ProfileMutations>;
};

export type Profile = {
  __typename?: 'Profile';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  signUpDate: Scalars['Date']['output'];
};

export type ProfileMutations = {
  __typename?: 'ProfileMutations';
  password?: Maybe<ProfilePasswordMutations>;
  signin: AuthResult;
  signup: AuthResult;
  update: Profile;
};


export type ProfileMutationsSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type ProfileMutationsSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type ProfileMutationsUpdateArgs = {
  input: UpdateProfileInput;
};

export type ProfilePasswordMutations = {
  __typename?: 'ProfilePasswordMutations';
  change: ResetPassword;
  setNew: ResetPassword;
};


export type ProfilePasswordMutationsChangeArgs = {
  input: ChangePasswordInput;
};


export type ProfilePasswordMutationsSetNewArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  profile?: Maybe<Profile>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean']['output'];
};

export type UpdateProfileInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  signUpDate: Scalars['Date']['output'];
};
