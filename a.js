router.get('/user', async (req, res) => {
  
    let queryUser

    try {

        queryUser = await pool.query('SELECT id, name, initials, eyeColor, age, guid, email FROM users as Result ORDER BY id ASC LIMIT 10', (err, res) => {
            //console.log(err, res)
          
            for (let i = 0; i < res.rows.length; i++) {
                // console.log("ID of this user is " + res.rows[i].id + " and name of this user is " + res.rows[i].name)
                list.push(res.rows)
                //  resolve(res.rows);
            }
        })

        console.log("Izvršen je select nad bazom")
        // await asyncCall()

    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("Podaci poslani na front!")
    }

    res.send(list)
})


queryUser = await User()

        console.log("queryUser " + queryUser)






//EXAMPLE

router.get('/id/:id/', async (req, res) => {
    console.log("Usli smo!")
    console.log(req.params.id)

    let id = req.params.id
    let selectedUser

    try {
        
        selectedUser = await selectUserID(id)

        console.log("selectedUser " + selectedUser)
        // await asyncCall()

    } catch (error) {
        console.log(error)
    }
    finally {
        console.log("Inserted new user in database...")
    }

    res.send(selectedUser)
})


//userDetail.html

async function selectUserID(id) {
    var data = await pool.query("Select id, name, initials, eyecolor, age, guid, email from users where id=$1", [id])

    return data.rows[0]
}


async function updateUser(id, name, intitals, eyeColor, age, guid, email) {
    var data = await pool.query("UPDATE users SET name = $1, initials = $2, eyeColor = $3, age = $4, guid=$5, email = $6 WHERE id = $7;", [name, initials, eyeColor, age, guid, email, id])
    return data.rows[0]
}

async function deleteUser(name) {
    var data = await pool.query("DELETE FROM users WHERE name=$1", [name])
    return data.rows[0]
}