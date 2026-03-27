export const get404 = (req, res) => {
  res.status(404).json({ message: "ressource non trouvé", statusCode: 404 });
};

export const getErrors = (err, req, res, next) => {
  if (err.kind === "ObjectId" && err.name === "CastError") {
    err.statusCode = 400;
    err.message = "L'id n'existe pas";
  }
  if (err.name === "ValidationError") {
    err.message = `Erreur de validation : ${err.message}`;
    err.statusCode = 400;
  }
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).json({
    message: err.message,
    statusCode: err.statusCode,
  });
};
