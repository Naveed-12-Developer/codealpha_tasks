const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    const allUrls = await URL.find({});

    return res.render('home', {
        id: shortID,
        urls: allUrls,
    });
}

async function handleGeTAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    
    if (!result) return res.status(404).json({ error: "Not found" });

    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory,
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGeTAnalytics,
};