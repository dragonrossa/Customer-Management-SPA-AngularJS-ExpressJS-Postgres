const { Pool } = require('pg')
var express = require('express');
var router = express.Router();
const fs = require('fs');
path = require('path')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors')
router.use(cors())

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
    // console.log(data2.rows)
    return data2.rows
}

async function userCount() {
    var data3 = await pool.query("SELECT COUNT(id) from users")
    // console.log(data3.rows[0].count)
    return data3.rows[0].count
}

async function maxAge() {
    var data4 = await pool.query("Select name from users where age = (select max(age) from users)")
    // console.log(data4.rows[0].name)
    return data4.rows[0].name
}

async function minAge() {
    var data5 = await pool.query("Select name from users where age = (select min(age) from users)")
    //console.log(data5.rows[0].name)
    return data5.rows[0].name
}


async function insertUser(name, initials, eyeColor, age, guid, email) {
    var data = await pool.query("INSERT INTO users(name, initials, eyeColor, age, guid, email) VALUES($1, $2, $3, $4, $5, $6)", [name, initials, eyeColor, age, guid, email])
    // console.log(data.rows[0])
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

async function asyncCall() {
    console.log('calling');
    const select2 = await User();
    const select = await selectUserID();
    const select3 = await userCount();
    const select4 = await maxAge();
    const select5 = await minAge();
    const select6 = await insertUser();
    const select7 = await updateUser();
    const select8 = await deleteUser();
    console.log(select2)
    console.log(select)
    console.log(select3)
    console.log(select4)
    console.log(select5)
    console.log(select6)
    console.log(select7)
    console.log(select8)


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
    console.log(details)


}

router.get('/name/:name/initials/:initials/eyeColor/:eyeColor/age/:age/guid/:guid/email/:email', function (req, res) {
    console.log(req.params.name, req.params.initials, req.params.eyeColor, req.params.age)
    if (users.length > 0) {
        users = []
    }
    users.push(req.params)
    res.send(req.params)
})




router.get('/name/:name/', async (req, res) => {
    console.log(req.params.name)

    let name = req.params.name
    let deletedUser

    if (users.length > 0) {
        userDelete = []
    }
    userDelete.push(req.params)

    try {
        deletedUser = await deleteUser(name)
        console.log("deletedUser" + deletedUser)


    }
    catch (error) {
        console.log(error)
    }
    finally {
        console.log("User deleted")
    }

    res.send(deletedUser)

})

router.get('/id/:id/', async (req, res) => {

    console.log("Usli smo!")
    console.log(req.params.id)

    let id = req.params.id
    let selectedUser

    try {
        selectedUser = await selectUserID(id)

        console.log("selectedUser " + selectedUser)

    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("Inserted new user in database...")
    }

    res.send(selectedUser)
})




router.get('/details', function (req, res) {
    console.log(details)
    res.send(details)
})



router.get('/user', async (req, res) => {

    let queryUser

    try {

        queryUser = await User()

        //console.log("queryUser " + queryUser)

        if (list.length > 0) {
            list = []
        }

        for (let i = 0; i < queryUser.length; i++) {

            list.push(queryUser)

        }

        console.log("Izvršen je select nad bazom")

    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("Podaci poslani na front!")
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

    let selectedUserForUpdate

    try {
        selectedUserForUpdate = await insertUser(name, initials, eyeColor, age, guid, email)

        console.log("selectedUserForUpdate " + selectedUserForUpdate)

    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("Inserted new user in database...")
    }

    res.send(req.body)
})




router.get('/change/id/:id/name/:name/initials/:initials/eyeColor/:eyeColor/age/:age/guid/:guid/email/:email', async (req, res) => {

    console.log(req.params.id, req.params.name, req.params.initials, req.params.eyeColor, req.params.age, req.params.guid, req.params.email)

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
        console.log("updateUser" + updateUser)

        console.log("User updated successfully")
    } catch (error) {
        console.log(error)
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
        console.log("nameList " + nameList)
        console.log("Younger user selected!")
        console.log(nameList)
        return nameList;

    } catch (error) {
        console.log(error)
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
        console.log("maxNameList " + maxNameList)
        console.log("Oldest user selected!")
        console.log(maxNameList)
        return maxNameList;

    } catch (error) {
        console.log(error)
    }
    finally {
        res.send(maxNameList)
    }

})



router.get('/userCount', async (req, res) => {

    let countUserList
    res.header("Access-Control-Allow-Origin", "*");
    try {

        countUserList = await userCount()
        console.log("countUserList " + countUserList)
        console.log("Users counted!")
        console.log(countUserList)
        return countUserList;

    } catch (error) {
        console.log(error)
    }
    finally {
        res.send(countUserList)
    }

})

router.post('/users/login', jsonParser, async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    try {
        console.log(req.body)
        console.log("yup")
    } catch (error) {
        console.log(error)
    }
    finally {
        res.send(req.body)
    }

})


module.exports = router;