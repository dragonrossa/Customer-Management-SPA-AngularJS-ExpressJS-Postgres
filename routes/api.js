const { Pool } = require('pg')
var express = require('express');
var router = express.Router();
const fs = require('fs');
path = require('path')
var bcrypt = require('bcryptjs')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors')
router.use(cors())
"use strict";
const nodemailer = require("nodemailer");
var moment = require('moment')
var logger = require('./logger')


const pool = new Pool({
    user: 'rosana',
    host: 'localhost',
    database: 'Api_DB',
    password: 'testing4546.',
    port: 5432
})

var users = []
var list = []
var userDelete = []
var details = []

async function selectUserID(id) {
    var data = await pool.query("Select id, name, initials, eyecolor, age, guid, email from users where id=$1", [id])

    return data.rows[0]
}

async function User() {
    var data2 = await pool.query("SELECT id, name, initials, eyeColor, age, guid, email FROM users ORDER BY id ASC LIMIT 10")
    // logger.info(data2.rows)
    return data2.rows
}


async function userCount() {
    var data3 = await pool.query("SELECT COUNT(id) from users")
    return data3.rows[0].count
}

async function loginCount() {
    var data7 = await pool.query("SELECT COUNT(id) from login")
    data7Logger = data7.rows[0].count
    logger.info(data7.rows[0].count)
    return data7.rows[0].count
}


async function maxAge() {
    var data4 = await pool.query("Select name from users where age = (select max(age) from users)")
    return data4.rows[0].name
}

async function minAge() {
    var data5 = await pool.query("Select name from users where age = (select min(age) from users)")
    return data5.rows[0].name
}


async function insertUser(name, initials, eyeColor, age, guid, email, sendMail) {
    var data = await pool.query("INSERT INTO users(name, initials, eyeColor, age, guid, email) VALUES($1, $2, $3, $4, $5, $6)", [name, initials, eyeColor, age, guid, email])
    return data.rows[0]
}

async function updateUser(name, initials, eyeColor, age, guid, email, id) {
    var data = await pool.query("UPDATE users SET name = $1, initials = $2, eyeColor = $3, age = $4, guid=$5, email = $6 WHERE id = $7;", [name, initials, eyeColor, age, guid, email, id])
    return data.rows[0]
}

async function deleteUser(name) {
    var data = await pool.query("DELETE FROM users WHERE name=$1", [name])
    return data.rows[0]
}




async function checkLogin(username, password) {

    var data1 = await pool.query("SELECT password from login where username=$1", [username]).then((res) => {

        logger.info(res.rows[0].password)
        hash = res.rows[0].password
        logger.info(hash)

        var check = bcrypt.compareSync(password, hash);

        return check
    })
    return data1

}


//CREATE LOGIN


async function createLogin(username, password, sendMail) {


    var data1 = await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            var data = pool.query("INSERT INTO login(username,password) VALUES ($1,$2)", [username, hash])
            return data.rows

        });
    });
    return data1


}




async function asyncCall() {
    logger.info('calling');
    const select2 = await User();
    const select = await selectUserID();
    const select3 = await userCount();
    const select11 = await loginCount();
    // const select13 = await getTime();
    //const select12 = await getDate();
    const select4 = await maxAge();
    const select5 = await minAge();
    const select6 = await insertUser();
    const select7 = await updateUser();
    const select8 = await deleteUser();
    const select9 = await checkLogin();
    const select10 = await createLogin();

    logger.info(select2)
    logger.info(select)
    logger.info(select3)
    logger.info(select4)
    logger.info(select5)
    logger.info(select6)
    logger.info(select7)
    logger.info(select8)
    logger.info(select9)
    logger.info(select10)
    logger.info(select11)
    //logger.info(select12)
    //logger.info(select13)


    var userDetail = {
        name: this.name,
        initials: this.initials,
        id: this.id,
        eyeColor: this.eyecolor,
        age: this.age,
        guid: this.guid,
        email: this.email
    }


    if (details.length > 0) {
        details = []
    }

    var data = {}
    data.table = []
    data.table.push(userDetail)
    details.push(userDetail)
    logger.info(details)


}

router.get('/name/:name/initials/:initials/eyeColor/:eyeColor/age/:age/guid/:guid/email/:email', function (req, res) {
    logger.info(req.params.name, req.params.initials, req.params.eyeColor, req.params.age)
    if (users.length > 0) {
        users = []
    }
    users.push(req.params)
    res.send(req.params)
})




router.get('/name/:name/', async (req, res) => {
    logger.info(req.params.name)

    let name = req.params.name
    let deletedUser

    if (users.length > 0) {
        userDelete = []
    }
    userDelete.push(req.params)

    try {
        deletedUser = await deleteUser(name)
        logger.info("deletedUser" + deletedUser)


    }
    catch (error) {
        logger.info(error)
    }
    finally {
        logger.info("User deleted")
    }

    res.send(deletedUser)

})

router.get('/id/:id/', async (req, res) => {

    logger.info("Usli smo!")
    logger.info(req.params.id)

    let id = req.params.id
    let selectedUser

    try {
        selectedUser = await selectUserID(id)

        logger.info("selectedUser " + selectedUser)

    } catch (error) {
        logger.info(error)
    }
    finally {
        logger.info("Inserted new user in database...")
    }

    res.send(selectedUser)
})




router.get('/details', function (req, res) {
    logger.info(details)
    res.send(details)
})



router.get('/user', async (req, res) => {

    let queryUser

    try {

        queryUser = await User()

        //logger.info("queryUser " + queryUser)

        if (list.length > 0) {
            list = []
        }

        for (let i = 0; i < queryUser.length; i++) {

            list.push(queryUser)

        }

        logger.info("Izvršen je select nad bazom")

    } catch (error) {
        logger.info(error)
    }
    finally {
        logger.info("Podaci poslani na front!")
    }

    res.send(list)
})



//insert new user in Users table

router.post('/users/new/post', jsonParser, async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const name = req.body.name;
    const initials = req.body.initials;
    const eyeColor = req.body.eyeColor;
    const age = req.body.age;
    const guid = req.body.guid;
    const email = req.body.email;
    const sendMail = req.body.sendMail;

    logger.info(req.body);

    let selectedUserForUpdate

    try {
        selectedUserForUpdate = await insertUser(name, initials, eyeColor, age, guid, email, sendMail)

        if (sendMail === true) {
            logger.info("Šaljemo mail")


            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();

                mail = "ccap41367@gmail.com"
                password = "R!x2nQ@2F"

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    //"smtp.ethereal.email",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "ccap41367@gmail.com",
                        //testAccount.user, // generated ethereal user
                        pass: "R!x2nQ@2F"
                        //testAccount.pass, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: mail,
                    //'"Fred Foo 👻" <foo@example.com>', // sender address
                    to: email,
                    //"bar@example.com, baz@example.com", // list of receivers
                    subject: "User registration", // Subject line
                    text: "Your user has been created.<br> Best regards, Admin", // plain text body
                    html: "Your user has been created.<br> Best regards, Admin", // html body
                });

                logger.info("Message sent: %s", info.messageId);

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


            }


            main().catch(console.error);

        }
        else {
            logger.info("Ne šaljemo mail")
        }

        logger.info("selectedUserForUpdate " + selectedUserForUpdate)

    } catch (error) {
        logger.info(error)
    }
    finally {
        logger.info("Inserted new user in database...")
    }

    res.send(req.body)
})




router.get('/change/id/:id/name/:name/initials/:initials/eyeColor/:eyeColor/age/:age/guid/:guid/email/:email', async (req, res) => {

    logger.info(req.params.id, req.params.name, req.params.initials, req.params.eyeColor, req.params.age, req.params.guid, req.params.email)

    let updatedUser

    const id = req.params.id;
    const name = req.params.name;
    const initials = req.params.initials;
    const eyeColor = req.params.eyeColor;
    const age = req.params.age;
    const guid = req.params.guid;
    const email = req.params.email;

    try {
        updatedUser = await updateUser(name, initials, eyeColor, age, guid, email, id)
        logger.info("updateUser" + updateUser)

        logger.info("User updated successfully")
    } catch (error) {
        logger.info(error)
    }
    finally {

    }

    res.send(updateUser)

})

router.get('/minage', async (req, res) => {

    let nameList

    res.header("Access-Control-Allow-Origin", "*");

    try {

        nameList = await minAge()
        logger.info("nameList " + nameList)
        logger.info("Younger user selected!")
        logger.info(nameList)
        return nameList;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(nameList)
    }

})




router.get('/maxage', async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    let maxNameList

    try {

        maxNameList = await maxAge()
        logger.info("maxNameList " + maxNameList)
        logger.info("Oldest user selected!")
        logger.info(maxNameList)
        return maxNameList;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(maxNameList)
    }

})

router.get('/getTime', async (req, res) => {

    let countUsersWithLogin
    res.header("Access-Control-Allow-Origin", "*");
    try {

        countUsersWithLogin = moment().format('h:mm:ss a');
        logger.info("countUsersWithLogin " + countUsersWithLogin)
        logger.info("Time counted!")
        logger.info(countUsersWithLogin)
        return countUsersWithLogin;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(countUsersWithLogin)
    }

})

router.get('/getDate', async (req, res) => {

    let countUsersWithLogin
    res.header("Access-Control-Allow-Origin", "*");
    try {

        countUsersWithLogin = moment().format('MMMM Do YYYY');
        logger.info("countUsersWithLogin " + countUsersWithLogin)
        logger.info("Date counted!")
        logger.info(countUsersWithLogin)
        return countUsersWithLogin;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(countUsersWithLogin)
    }

})

router.get('/loginCount', async (req, res) => {

    let countUsersWithLogin
    res.header("Access-Control-Allow-Origin", "*");
    try {

        countUsersWithLogin = await loginCount()
        logger.info("countUsersWithLogin " + countUsersWithLogin)
        logger.info("Users with login counted!")
        logger.info(countUsersWithLogin)
        return countUsersWithLogin;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(countUsersWithLogin)
    }

})



router.get('/userCount', async (req, res) => {

    let countUserList
    res.header("Access-Control-Allow-Origin", "*");
    try {

        countUserList = await userCount()
        logger.info("countUserList " + countUserList)
        logger.info("Login counted!")
        logger.info(countUserList)
        return countUserList;

    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(countUserList)
    }

})


router.post('/users/login', jsonParser, async (req, res) => {

    let checkUser
    const username = req.body.username;
    const password = req.body.password;
    res.header("Access-Control-Allow-Origin", "*");

    try {
        checkUser = await checkLogin(username, password);
        logger.info("checkUser " + checkUser)
        if (checkUser == true) {
            logger.info("checkUser is true");
        }
        else {
            logger.info("checkUser is false");
        }
        logger.info(req.body)
        logger.info("yup")
    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(checkUser)
    }

})

router.post('/createLogin', jsonParser, async (req, res) => {

    let createUser
    const username = req.body.username;
    const password = req.body.password;
    const sendMail = req.body.sendMail
    res.header("Access-Control-Allow-Origin", "*");

    try {
        checkUser = await createLogin(username, password, sendMail);
        logger.info("createUser " + createUser)
        logger.info(req.body)
        logger.info("Kreiran novi login")

        if (sendMail === true) {
            logger.info("Šaljemo mail")

            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                //  let testAccount = await nodemailer.createTestAccount();

                mail = "ccap41367@gmail.com"
                // passwordTest= "R!x2nQ@2F"

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    //"smtp.ethereal.email",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "ccap41367@gmail.com",
                        //testAccount.user, // generated ethereal user
                        pass: "R!x2nQ@2F"
                        //testAccount.pass, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: mail,
                    //'"Fred Foo 👻" <foo@example.com>', // sender address
                    to: username,
                    //"bar@example.com, baz@example.com", // list of receivers
                    subject: "User registration", // Subject line
                    text: "Your user has been created.<br> Your username is " + username + "<br> Your password is " + password + "<br> Try to login on http://localhost:5000/#!/login<br>Best regards, Admin", // plain text body
                    html: "Your user has been created.<br> Your username is " + username + "<br> Your password is " + password + "<br> Try to login on http://localhost:5000/#!/login<br>Best regards, Admin" // html body
                });

                logger.info("Message sent: %s", info.messageId);

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


            }


            main().catch(console.error);



        }
        else {
            logger.info("Ne saljemo mail")
        }
    } catch (error) {
        logger.info(error)
    }
    finally {
        res.send(createUser)
    }

})

router.post('/sendMail', jsonParser, async (req, res) => {

    //let checkUser
    const from = req.body.from;
    const to = req.body.to;

    logger.info("from " + from);
    logger.info("to " + to);

    res.header("Access-Control-Allow-Origin", "*");

    var sendMail = {
        from,
        to
    }

    module.exports = sendMail


    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        mail = "ccap41367@gmail.com"
        password = "R!x2nQ@2F"

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            //"smtp.ethereal.email",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ccap41367@gmail.com",
                //testAccount.user, // generated ethereal user
                pass: "R!x2nQ@2F"
                //testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: from,
            //'"Fred Foo 👻" <foo@example.com>', // sender address
            to: to,
            //"bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        logger.info("Message sent: %s", info.messageId);

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


    }


    main().catch(console.error);




    res.send(req.body)

})


module.exports = router;