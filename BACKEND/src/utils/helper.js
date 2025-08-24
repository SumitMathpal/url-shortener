import { nanoid } from "nanoid"

export const genrateNanoId = (length)=>{
  return nanoid(length);
};