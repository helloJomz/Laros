// # authSlice.ts

export interface IState {
  user: any;
  token: string | null;
}

export interface CredentialsPayload {
  user: any; // Replace `any` with your user type if you have one
  accessToken: string;
}

// # authApiSlice.ts

export type CredentialsType = {
  email: string;
  password: string;
};

export type UserInformationType = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};
