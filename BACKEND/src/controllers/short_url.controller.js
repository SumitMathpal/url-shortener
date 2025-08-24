import { createShortUrlWithoutUser } from "../services/short_url.services.js";
import { getShortUrl } from "../dao/short_url..js";
export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    const fullUrl = process.env.APP_URL + shortUrl;
    res.send(fullUrl);
  } catch (err) {
    return next(err);
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);

    if (!url) {
      return res.status(404).json({
        status: "error",
        message: "Short URL not found",
      });
    }

    res.redirect(url.full_url);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};
