const express = require('express');
const { getPeference, putPeference } = require('../controllers/PreferenceController');
const verifyToken = require('../Middleware/jwtToken');
const getNews = require('../controllers/NewsController');
const news = require('express').Router()



news.get('/preferences',verifyToken, getPeference)
news.put('/preferences', putPeference)
news.get("/news", verifyToken, getNews);

module.exports = news