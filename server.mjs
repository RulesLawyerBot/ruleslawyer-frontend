import fetch from 'node-fetch'
import { URL, URLSearchParams, fileURLToPath } from 'url'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

// const express = require('express')
// const path = require('path');
// require('dotenv').config()

dotenv.config()

const app = express()
const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable
const API_URL = process.env.API_URL

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')));

app.get('/api/*', async (req, res) => {
  let apiURL = new URL(API_URL + req.path)
  let params = new URLSearchParams(req.query)
  apiURL.search = params

  let apiResponse = await fetch(apiURL)
  apiResponse.headers.forEach((v, k) => res.setHeader(k, v))
  apiResponse.body.pipe(res)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(path.join(path.dirname(fileURLToPath(import.meta.url)), '/dist/index.html')));
  });

app.listen(port, () => console.log(`App is live on port ${port}!`))