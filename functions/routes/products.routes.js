const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

//get products by category
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/ps4
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/xbox
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/pc
router.get('/:category', async (req, res) => {
    try {
        const query = await db.collection('productos').where('category', '==', req.params.category).get().then(function (querySnapshot) {
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
});

//get products by productname
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/api/Dead Cells
router.get('/api/:productname', async (req, res) => {
    try {
        const query = await db.collection('productos').where('productname', '==', req.params.productname).get().then(function (querySnapshot) {
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
});

//get products by id
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/api/product/pc-dead-cells
router.get('/api/product/:id', async (req, res) => {
    try {
        const query = await db.collection('productos').where('id', '==', req.params.id).get().then(function (querySnapshot) {
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
});

//create product
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/crea
router.post('/crea', async (req, res) => {
    try {
        await db 
            .collection('productos')
            .doc()
            .create({ 
                id: req.body.id,
                productname: req.body.productname,
                description: req.body.description,
                shortdescription: req.body.shortdescription,
                tags: req.body.tags,
                img: req.body.img,
                date: req.body.date,
                category: req.body.category,
                rating: req.body.rating })
        return res.status(204).json({ message: "Product created" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


//get all products
//https://us-central1-e-commerce-24233.cloudfunctions.net/app/products/all
router.get('/products/all', async (req, res) => {
    try {
        const query = await db.collection('productos').get().then(function (querySnapshot) {
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
});

module.exports = router;