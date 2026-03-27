import Article from "../models/article.mjs";
import Category from "../models/category.mjs";
import User from "../models/user.mjs";

const categories = [
  {
    nom: "Tech",
  },
  {
    nom: "Litterature",
  },
  {
    nom: "Apple",
  },
];

const articles = [
  {
    titre: "iPhone 17",
    contenu: "bla bla",
  },
  {
    titre: "iPhone 12",
    contenu: "bla bla",
  },
  {
    titre: "iPhone 18",
    contenu: "bla bla",
  },
];

export const seed = async function (req, res, next) {
  try {
    await Category.deleteMany();
    await Article.deleteMany();

    const insertedCategories = await Category.insertMany(categories);
    console.log(insertedCategories);

    const articlesWithCategory = articles.map((article, index) => ({
      ...article,
      category: insertedCategories[index % insertedCategories.length]._id,
    }));

    console.log(articlesWithCategory);

    const insertedArticles = await Article.insertMany(articlesWithCategory);
    const result = {
      categories: insertedCategories,
      articles: insertedArticles,
    };
    res
      .status(201)
      .json({ message: "Jeux de données créé avec succès", data: result });
  } catch (err) {
    next(err);
  }
};
