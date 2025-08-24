import { genrateNanoId } from "../utils/helper.js"
import { saveShortUrl } from "../dao/short_url..js";


export const createShortUrlWithoutUser = async (url)=>{
  const shortUrl = genrateNanoId(8);
  if(!shortUrl) throw new Error("Short url not genrated!");
  
 await saveShortUrl(shortUrl,url)
return shortUrl;
}

export const createShortUrlWithUser = async (url,user_id)=>{
  const shortUrl = genrateNanoId(8);
 await saveShortUrl(url,shortUrl,user_id)
return shortUrl;
}