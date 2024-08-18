import { v4 } from "uuid";
import { arrayOfRandomAvatarGifsForAnon } from "./array";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
  parseISO,
} from "date-fns";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generatePostRandomString() {
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

export const formatDateForPostHeader = (createdAt: string) => {
  const parsedDate = parseISO(createdAt);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

export const formatDateDistanceToNow = (createdAt: string) => {
  const now = new Date();

  const days = differenceInDays(now, createdAt);
  const hours = differenceInHours(now, createdAt) % 24;
  const minutes = differenceInMinutes(now, createdAt) % 60;
  const seconds = differenceInSeconds(now, createdAt) % 60;

  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
};

export const getRandomGradient = () => {
  const gradients = [
    "bg-gradient-to-r from-blue-300 to-blue-800",
    "bg-gradient-to-r from-indigo-500 to-blue-500",
    "bg-gradient-to-r from-rose-400 to-orange-300",
    "bg-gradient-to-r from-emerald-500 to-lime-600",
    "bg-gradient-to-r from-fuchsia-600 to-purple-600",
    "bg-gradient-to-r from-red-400 to-red-900",
    "bg-gradient-to-r from-emerald-500 to-lime-600",
    "bg-gradient-to-r from-sky-400 to-blue-500",
  ];
  const randomIndex = Math.floor(Math.random() * gradients.length);
  const gradient = gradients[randomIndex];
  gradients.splice(randomIndex, 1); // Remove the selected gradient
  return gradient;
};
