import urlSchema from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    const savedUrl = await newUrl.save();
    return savedUrl;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("This short URL already exists. Try another one.");
    }
    throw new Error(err.message || "Error saving URL");
  }
};

export const getShortUrl = async (shortUrl) => {
  const result = await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  return result;
};
