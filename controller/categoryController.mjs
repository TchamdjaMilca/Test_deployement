import Category from "../models/category.mjs";

export async function createCategory(req, res, next) {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: "Catégorie créée", data: category });
  } catch (err) {
    next(err);
  }
}
