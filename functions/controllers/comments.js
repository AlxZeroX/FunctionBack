const admin = require('firebase-admin');
const db = admin.firestore();

const postComments = async (req, res) => {
  const {idImg} = req.params;
  const {qualify, comment, date, user, uid} = req.body;
  try {
    await db
      .collection("comment/")
      .add({qualify, comment, date, user, uid, idImg});
    return res.json({ ok: true });
  } catch (error) {
    return res
      .status(500)
      .json({mgs: "Por Favor Comuniquese con el Administrador"});
  }
};

const getComments = async (req, res) => {
  try {
    const query = await db.collection("comment").get();
    const docs = query.docs;

    const result = docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return res.status(200).json({
      data: result
  });
  } catch (error) {
    return res
      .status(500)
      .json({mgs: "Error al traer la informacion"});
  }
};

const putCalificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const {commentcalificacion} = req.body;
    const result = db
      .collection("productos")
      .doc(id);
    const resp = await result.update({calificacion: commentcalificacion});

    return res.json({
      ok: true,
      resp,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mgs: "Por Favor Comuniquese con el Administrador" });
  }
};

const getCommentsImg = async (req, res) => {
  const {idImg} = req.params;

  try {
    const result = db.collection("comment");
    const snapshot = await result.where("idImg", "==", idImg).get();

    const commentImg = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      ok: true,
      commentImg,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mgs: "Por Favor Comuniquese con el Administrador" });
  }
};
module.exports = {
  postComments,
  getComments,
  putCalificacion,
  getCommentsImg
};
