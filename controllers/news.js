import newsModel from "../models/news.js";

export const getNews = async (req, res) => {
  try {
    const news = await newsModel.find();
    res.status(201).json({ news });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
