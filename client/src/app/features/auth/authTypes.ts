// # authSlice.ts

interface ShapeOfUser {
  displayname: string | null;
  userid: string | null;
  imgURL?: string | null;
}

export interface IState {
  user: ShapeOfUser;
}

export interface CredentialsPayload {
  user: ShapeOfUser;
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
