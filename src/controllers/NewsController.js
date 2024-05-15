const axios = require("axios");


async function getNews(req,res) {
    if (!req.user) {
        return res.status(401).json({ message: req.message });
    }

    try {
        const user = req.user;
        if (!user.preferences || user.preferences.length === 0) {
            return res.status(400).json({ message: "User preferencess not set" });
        }

        // Fetch news based on each user preference
        const promises = user.preferences.map(async (preference) => {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${preference}&apiKey=3504a0db9bf640a49134a321cdb0d2fc`
            );
            return response.data.articles;
        });

        // Wait for all requests to finish
        const newsArticlesArrays = await Promise.all(promises);

        // Concatenate arrays of news articles
        const newsArticles = newsArticlesArrays.reduce(
            (acc, curr) => acc.concat(curr),
            []
        );

        return res.status(200).json({ articles: newsArticles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getNews;