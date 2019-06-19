'use strict';
var express = require('express');
var router = express.Router();
var addUser = require('../models/addUser');
var authUser = require('../models/authUser');
var pool = require('../models/mysqlpool')

router.get('/', function (req, res) {
    res.render('adduser');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/auth', async function (req, res) {
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if (!pool) {
        res.status(400).send('데이타베이스연결 오류.');
        return;
    }
    try {
        const rows = authUser(paramId, paramPassword);        
        console.dir(rows);
        res.status(200).send('로그인 처리 성공');

    } catch (err) {
        console.error('Adduser 데이타베이스 처리 오류 ');
        console.dir(err);
        res.status(400).send('로그인 오류');
    }
});

router.post('/adduser', async function (req, res) {

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;

    console.log('adduser ---------->');
    console.log(paramId);
    console.log(paramPassword);
    console.log(paramName);
    console.log(paramAge);
    console.log('<----------adduser ');

    if (!pool) {
        res.status(400).send('데이타베이스연결 오류.');
        return;
    }

    try {
        const rows = await addUser(paramId, paramName, paramAge, paramPassword);
        res.status(200).send('사용자 추가완료');
    } catch (err) {
        console.error('Adduser 데이타베이스 처리 오류 ');
        console.dir(err);
    }
    
    
});

module.exports = router;
