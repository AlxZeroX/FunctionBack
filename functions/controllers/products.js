const admin = require('firebase-admin');
const db = admin.firestore();

const getAll = async (req, res) => {

    try {
        const query = await db.collection(`productos`).orderBy('productname', 'asc').get().then(function (querySnapshot) {
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

const getPs4 = async (req, res) => {
    try {
        const query = await db.collection(`productos`).where('category', '==', 'ps4').get().then(function (querySnapshot) {
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

const getPc = async (req, res) => {
    try {
        const query = await db.collection(`productos`).where('category', '==', 'pc').get().then(function (querySnapshot) {
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

const getXbox = async (req, res) => {
    try {
        const query = await db.collection('productos').where('category', '==', 'xbox').get().then(function (querySnapshot) {
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return res.status(200).json(response);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = {
    getAll,
    getPs4,
    getPc,
    getXbox
}