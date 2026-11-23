const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

const ReadJSONFile = async (filePath)=>{
    try{
        const raw = await fs.readFile(filePath, 'utf8');
        return JSON.parse(raw);
    }catch(error){
        throw new Error("Hiba történt: ", error);
    }
}

//!Endpoints:
//?GET /api/test

router.get('/madagaszkar', async (request,response)=>{
    try{
        const utvonal = path.join(__dirname, '../files/orszagok.json');
        const content = await ReadJSONFile(utvonal);
        let j=0;
        while(j<content.orszagok.length && content.orszagok[j].orszag != "MADAGASZKÁR"){
            j++;
        }

        response.status(200).json({
            result: content.orszagok[j]
        })
    }catch(error){
        response.status(500).json({
            message: "Hiba!"
        })
    }
})

router.get('/OUAGADOUGOU', async (request,response)=>{
    try{
        const utvonal = path.join(__dirname, '../files/orszagok.json');
        const content = await ReadJSONFile(utvonal);
        let j=0;
        while(j<content.orszagok.length && content.orszagok[j].fovaros != "OUAGADOUGOU"){
            j++;
        }

        response.status(200).json({
            result: content.orszagok[j]
        })
    }catch(error){
        response.status(500).json({
            message: "Hiba!"
        })
    }
})

router.get('/TT', async (request,response)=>{
    try{
        const utvonal = path.join(__dirname, '../files/orszagok.json');
        const content = await ReadJSONFile(utvonal);
        let j=0;
        while(j<content.orszagok.length && content.orszagok[j].autojel != "TT"){
            j++;
        }

        response.status(200).json({
            result: content.orszagok[j]
        })
    }catch(error){
        response.status(500).json({
            message: "Hiba!"
        })
    }
})

router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
