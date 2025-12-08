export interface Author {
  uid: string;
  username: string;
  uniqueId: string;
  nickname: string;
  signature: string;
  // Use optional properties for any additional fields
  [key: string]: any;
}

export interface Music {
  album: string;
  author: string;
  coverLarge: string[];
  coverMedium: string[];
  coverThumb: string[];
  duration: number;
  id: string | number;
  isAuthorArtist: boolean;
  isCommerceMusic: boolean;
  isOriginalSound: boolean;
  playUrl: string[];
  title: string;
  [key: string]: any;
}

export interface TikTokPost {
  author: Author;
  createTime: number; // Unix timestamp
  desc: string;
  hashtag: string[];
  id: string;
  isADS: boolean;
  isTurnOffComment: boolean;
  music: Music;
  statistics: Statistics;
  type: string; // Could be more specific like 'video' | 'image' | 'text'
  video: Video;
  status: string;
  [key: string]: any; // For any additional properties
}
