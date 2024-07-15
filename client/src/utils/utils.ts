import { v4 } from "uuid";
import { arrayOfRandomAvatarGifsForAnon } from "./array";
import { formatDistanceToNow } from "date-fns";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generatePostRandomString(imageName: string) {
  const uuid = v4();
  const finalString = `post_${uuid}`;
  return finalString;
}

export function generateAvatarRandomString(imageName: string) {
  const uuid = v4();
  const explodedUuid = uuid.replace(/-/g, "");
  const finalRandomString = `${explodedUuid}-${imageName}`;
  return finalRandomString;
}

export function generateRandomAvatarGifsForAnon() {
  const randomIndex = Math.floor(
    Math.random() * arrayOfRandomAvatarGifsForAnon.length
  );
  return arrayOfRandomAvatarGifsForAnon[randomIndex];
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatDateDistanceToNow = (createdAt: string) => {
  const createdAtDate = new Date(createdAt);
  return formatDistanceToNow(createdAtDate, { addSuffix: true });
};
