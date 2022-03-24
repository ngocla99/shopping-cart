export interface UserSignIn {
  email: string;
  password: string;
  deviceId: string;
}

export interface UserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface UserStore {
  id: string;
  username: string;
  role: string;
  isEmailVerified: boolean;
  accessToken: string;
  expiredAccessDate: any;
  refreshToken: string;
  expiredRefreshDate: any;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  password: string;
  contact: null | string;
  avatar: null | string;
  role: string;
  isEmailVerified: boolean;
  isContactVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface userCreate {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface userUpdate {
  username: string;
  role: string;

}

export interface TokenData {
  token: string;
  expires: string;
}

export interface DeviceData {
  refreshToken: string;
  deviceId: string;
}

export interface UserData extends UserInfo, TokenData {
  user: UserInfo;
  tokens: {
    access: TokenData;
    refresh: TokenData;
  };
  deviceId: string;
}
