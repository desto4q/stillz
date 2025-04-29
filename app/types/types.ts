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

export interface Post {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  subtitle: string;
  title: string;
  updated: string;
  user_id: string;
  video: string;
  duration: number;
  thumb: string;
  userName: string;
}

export interface PostResponse {
  items: Post[];
  page: number;

  perPage: number;
  totalItems: number;
  totalPages: number;
}
