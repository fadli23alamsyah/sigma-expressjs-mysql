const mysql = require('mysql')
const configDb = require('../configs/database')

const db =  mysql.createConnection(configDb)

db.connect((err)=>{
    if(err) console.log(err)
    else console.log('Berhasil konek')
})

module.exports = {
    getUserSigma(req, res){
        var { user } = req.params
        var id_user
        var username
        var fullname
        var aplikasi = []

        db.query(`SELECT id_user, username, fullname FROM tb_user WHERE username = ${user} `, (err, result) => {
            if (err) throw err
            id_user = result[0]["id_user"]
            username = result[0]["username"]
            fullname = result[0]["fullname"]

            db.query(`SELECT ap.id_aplikasi, ap.nama_aplikasi, ro.id_role, ro.nama_role 
            FROM tb_role ro 
            LEFT JOIN tb_userrole ur ON ro.id_role = ur.id_role 
            LEFT JOIN tb_aplikasi ap ON ap.id_aplikasi = ro.id_aplikasi 
            WHERE ur.id_user = ${id_user}`, (err, result) => {
                if (err) throw err

                result.map((dt)=>{
                    if(aplikasi.length != 0){
                        aplikasi.forEach((val, i) => {
                            if(val["id_aplikasi"] == dt["id_aplikasi"]){
                                aplikasi[i]["roles"].push({
                                    id_role: dt["id_role"],
                                    nama_role: dt["nama_role"]
                                })
                            }else{
                                aplikasi.push({
                                    id_aplikasi : dt["id_aplikasi"],
                                    nama_aplikasi : dt["nama_aplikasi"],
                                    roles: [
                                        {
                                            id_role: dt["id_role"],
                                            nama_role: dt["nama_role"]
                                        }
                                    ]
                                })
                            }
                        })
                    }else{
                        aplikasi.push({
                            id_aplikasi : dt["id_aplikasi"],
                            nama_aplikasi : dt["nama_aplikasi"],
                            roles: [
                                {
                                    id_role: dt["id_role"],
                                    nama_role: dt["nama_role"]
                                }
                            ]
                        })
                    }
                })
                res.send({
                    message: `Berhasil menemukan data user ${ user }`,
                    data: {
                        username : username,
                        fullname : fullname,
                        aplikasi : aplikasi
                    }
                })
                db.end()
            })
        })
    }
}