//Appel du controller user
const userCtrl = require("../controllers/user");
//Appel de l'authentification
const { authJwt } = require("../middleware");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Utilisation de auth afin de vérifier le token et sécuriser la modification de l'utilsateur
// Dans ce cas l'utilisateur, l'administrateur et le moderateur peuvent modifier l'utilisateur ou le suprimer 
  app.put("/:id",[authJwt.verifyToken], userCtrl.updateUser);
  app.delete("/:id",[authJwt.verifyToken], userCtrl.deleteUser);

//Il s'agit de test de route 
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

