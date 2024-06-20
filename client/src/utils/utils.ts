import { v4 } from "uuid";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateAvatarRandomString(imageName: string) {
  const uuid = v4();
  const explodedUuid = uuid.replace(/-/g, "");
  const finalRandomString = `${explodedUuid}-${imageName}`;
  return finalRandomString;
}
