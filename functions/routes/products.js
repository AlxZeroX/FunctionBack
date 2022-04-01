const {Router} = require ("express");
const { getAll, getPs4, getXbox, getPc } = require("../controllers/products");
const router = Router();

router.get('/All', getAll);
router.get('/ps4', getPs4);
router.get('/xbox', getXbox);
router.get('/pc', getPc);

module.exports = router;

