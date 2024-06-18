export interface GiphyResultObject {
  mp4_link: string;
  user: User;
}

interface User {
  avatar_url: string;
  display_name: string;
  username: string;
  profile_url: string;
}
