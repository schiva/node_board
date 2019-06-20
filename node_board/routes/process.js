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
        const rows = await authUser(paramId, paramPassword);        
        if (rows.length >= 1) {            
            res.status(200).send('로그인 처리 성공');
            console.log('사용자 인증 조회 자료 ===========');
            console.dir(rows);
        } else {
            res.status(200).send('로그인 실패 - 사용자 자료없음');
        }

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
