const models = require("../models");

const addFavorite = (req, res) => {
  const favorite = req.body;

  models.User_has_favorite.insertFav(favorite)
    .then((results) => {
      if (results[0]);

      res
        .location(`/api/favoris/${favorite.user_id}/${favorite.videos_id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const getFav = (req, res) => {
  const { userId } = req.params;
  models.User_has_favorite.findFavs(userId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const deleteFavorite = (req, res) => {
  const { userId, videoId } = req.params;
  models.User_has_favorite.deleteFav(userId, videoId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  addFavorite,
  getFav,
  deleteFavorite,
};
