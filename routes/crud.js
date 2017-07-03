var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/engineering", function(err, database) {
    if (err) return console.error(err);
    console.log("DB connection successfull !!" + database);
    db = database;
});

router.get('/labs', function(req, res, next) {
    db.collection("labs").find().sort({
        "lab_id": 1
    }).toArray(function(err, labs) {
        if (err) {
            res.send(err);
        } else {
            res.json(labs);
        }
    });
});

router.get('/benches/:id', function(req, res, next) {
    var id = req.params.id;
    db.collection("benches").find({
        "lab_obj_id": id
    }).sort({
        "bench_id": 1
    }).toArray(function(err, benches) {
        if (err) {
            res.send(err);
        } else {
            res.json(benches);
        }
    });
});

router.get('/lab/:id', function(req, res, next) {
    var id = req.params.id;
    db.collection('labs').findOne({
        _id: ObjectId(id)
    }, function(err, lab) {
        if (err) {
            res.send(err);
        } else {
            res.json(lab);
        }
    });
});

router.post('/addlab', (req, res) => {
    db.collection('labs').save(req.body.obj, (err, result) => {
        if (err) return console.log(err)
        res.json(result);
    })
})

router.get('/bench/:id', function(req, res, next) {
    var id = req.params.id;
    db.collection('benches').findOne({
        _id: ObjectId(id)
    }, function(err, bench) {
        if (err) {
            res.send(err);
        } else {
            res.json(bench);
        }
    });
});

router.post('/addbench', (req, res) => {
    db.collection('benches').save(req.body.obj, (err, result) => {
        if (err) return console.log(err)
        res.json(result);
    })
})

/** update function to get form by id. */
router.put('/updatebench', (req, res) => {
    db.collection('benches').update({
        _id: ObjectId(req.body.obj._id)
    }, {
        $set: {
            "lab_id": req.body.obj.lab_id,
            "bench_id": req.body.obj.bench_id,
            "poc": req.body.obj.poc,
            "technology": req.body.obj.technology,
            "type": req.body.obj.type,
            "cell_id": req.body.obj.cell_id,
            "rru_output_db": req.body.obj.rru_output_db,
            "attenuation_db": req.body.obj.attenuation_db,
            "real_time_signal": req.body.obj.real_time_signal,
            "comments": req.body.obj.comments,
            "utilization": req.body.obj.utilization,
            "enabled_date": req.body.obj.enabled_date
        }
    }, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
});

router.delete('/deletebench/:id', (req, res) => {
    var id = req.params.id;
    db.collection('benches').remove({
        _id: ObjectId(id)
    }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
