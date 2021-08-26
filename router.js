const express = require("express");
const router = express.Router();
const fresh = require('fresh');

function isFresh(req, res) {
    return fresh(req.headers, {
        'etag': res.getHeader('ETag'),
        'last-modified': res.getHeader('Last-Modified')
    });
};

router.get("*", (req, res, next) => {
    if (isFresh(req, res)) {
        res.statusCode = 304;
        res.end();
        return;
    };
    res.status(200);
    res.sendFile(process.cwd() + "/data" + req.url.split("?")[0], (err) => {
        if (err) return res.status(404).send('<h2>Content Not Found - 404</h2>').end();
    });
});

module.exports = router;
