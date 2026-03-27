import Article from "../models/article.mjs";

export async function getArticles(req, res) {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des articles",
      error: err.message,
    });
  }
}

export async function getArticlesById(req, res, next) {
  const id = req.params.id;
  try {
    const article = await Article.findById(id).populate("categorie"); //nom de la propriété

    if (article) {
      res.status(200).json({
        message: "Article récupéré avec succès",
        article,
      });
    } else {
      const error = new Error(`Article avec l'id : ${id} est introuvable`);
      error.statusCode = 404;

      throw error;
    }
  } catch (err) {
    next(err); //envoie l'erreur à express. Il va directement dans le middleware avec err en param
  }
}

export async function createArticle(req, res, next) {
  const { titre, contenu, categorie } = req.body;

  const article = new Article({ titre, contenu, categorie });
  try {
    await article.save();
    res.location(`/articles/${article.id}`); //Ajout du location au header
    //Retour du code de statut et de l'objet créé.
    res.status(201).json({
      message: "Article ajouté",
      data: article,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteArticle(req, res, next) {
  const id = req.params.id;
  try {
    await Article.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(req, res, next) {
  const id = req.params.id;
  const { titre, contenu } = req.body;
  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { titre, contenu },
      { new: true },
    );
    if (article) {
      res.status(200).json({
        message: "Article mis à jour avec succès",
        data: article,
      });
    } else {
      const error = new Error(`Article avec l'id : ${id} est introuvable`);
      error.statusCode = "404";

      throw error;
    }
  } catch (err) {
    next(err);
  }
}
