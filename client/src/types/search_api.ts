type GameImage = {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
};

type GamePlatforms = {
  id: number;
  name: string;
};

export type SearchGameProps = {
  guid: string;
  image: GameImage;
  name: string;
  original_release_date: string;
  platforms: GamePlatforms[];
  deck: string;
};
