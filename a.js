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