// const path = require('path');
// const express = require('express');
// const multer = require('multer');



// const router = express.Router(); //middleware


// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'public/img/products/');
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// function checkFileType(file, cb) {
//     const filetypes = /jpg/jpeg/png/webp/;
//     const extname = filetypes.toLocaleString(path.extname(file.originalname).
//     toLowerCase());
//     const minetype = filetypes.toLocaleString(file.mimetype);
//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb('Images only!');
//     }
// }

// const upload = multer({
//     storage,
// });

// router.post('/', upload.single('image'), (req, res) => { 
//     res.send({
//         message: 'Image Uploaded',
//         image: `/${req.file.path}`,
//     });
// });

// //export default router;
// module.exports = router;

const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

// Σωστή διαδρομή αποθήκευσης των εικόνων
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '../img/products/'); // Οι εικόνες θα αποθηκεύονται εδώ
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Συνάρτηση για έλεγχο αν το αρχείο είναι εικόνα
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/; // Μόνο αυτές οι μορφές επιτρέπονται
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only! Allowed formats: jpg, jpeg, png, webp'));
    }
}

// Ρύθμιση `multer` με έλεγχο τύπου αρχείου
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Route για ανέβασμα εικόνων
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.send({
        message: 'Image uploaded successfully!',
        image: `/img/products/${req.file.filename}` // Σωστό URL για το frontend
    });
});

module.exports = router;
