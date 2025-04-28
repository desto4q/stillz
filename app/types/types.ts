export interface UserProfile {
  collectionId: string;
  collectionName: string;
  created: string;
  fullName: string;
  id: string;
  profileImg: string;
  updated: string;
  userName: string;
  user_id: string;
}

export interface User {
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  updated: string;
  verified: boolean;
}

export interface UserData {
  user: User;
  profile: UserProfile;
}
