export const validateArticle = (req, res, next) => {
  const { titre, contenu, categorie } = req.body;

  if (!titre || !contenu || !categorie) {
    const error = new Error("Titre, contenu et catégorie sont requis");
    error.statusCode = 400;
    return next(error);
  }
  next();
};

//Lors des importation, si on ne veut pas mettre des accolades, on  utilise export default
