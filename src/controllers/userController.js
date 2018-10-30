var pool = require('../../config/db');

module.exports = {
    index: function (req, res) {
        pool.connect(function (err, client, done) {
            client.query('SELECT * FROM tbl_user', function (err, result) {
                done();
                res.status(200).send(result.rows);
            });
        });
    },
    show: function (req, res) {
        pool.connect(function (err, client, done) {
            var id = req.params.id;
            client.query('SELECT * FROM tbl_user where id=$1', [id], function (err, result) {
                done();
                res.status(200).send(result.rows[0]);
            });
        });
    },
    create: function (req, res) {
        pool.connect(function (err, client, done) {
            var name = req.body.name;
            var age = req.body.age;
            client.query('INSERT INTO tbl_user(name, age) values ($1, $2)', [name, age], function (err, result) {
                done();
                res.status(201).send(result);
            });
        });
    },
    update: function (req, res) {
        pool.connect(function (err, client, done) {
            var name = req.body.name;
            var age = req.body.age;
            var id = req.params.id;
            client.query('UPDATE tbl_user set name=$1, age=$2 where id=$3', [name, age, id], function (err, result) {
                done();
                res.status(200).send(result);
            });
        });
    },
    destroy: function (req, res) {
        pool.connect(function (err, client, done) {
            var id = req.params.id;
            client.query('DELETE FROM tbl_user where id=$1', [id], function (err, result) {
                done();
                res.status(204).send({});
            });
        });
    }
};