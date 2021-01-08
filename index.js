const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(express.json());


app.use(cors({"origin": "*"}))

app.get('/', (req, res) => {
    readDB().then(data => {
        res.send(data)
    }).catch(() => {
        res.sendStatus(500)
        res.send({status: false})
    })
});

app.get('/rooms', (req, res) => {
    if (req.query && req.query.roomName && req.query.roomName.length > 0) {
        // respond requested room
        readDB("rooms").then(data => {
            res.send(data.find(v => v.roomName === req.query.roomName))
        }).catch(() => {
            res.sendStatus(500)
        })
    } else {
        // if there is no query respond all rooms,else respond requested room
        readDB("rooms").then(data => {
            res.send(data)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
});

app.patch('/rooms', (req, res) => {
    // if query exist
    if (req.query && req.query.roomName && req.query.roomName.length > 0) {


        // read database
        readDB().then(data => {

            // find the index of requested room in rooms array
            const roomIndex = data["rooms"].findIndex(v => v.roomName === req.query.roomName);

            // ex. {temperature:42, lights:"close"}
            data["rooms"][roomIndex] = patch(data["rooms"][roomIndex], req.body)

            // send promise to updated data
            return data
        }).then((data) => {
            writeDB(data).then(() => {
                res.status(200)
                res.send({status: true, message: "Updated Successfully"})
            }).catch((e) => {
                res.sendStatus(400)
            })
        }).catch((e) => {
            res.sendStatus(400)
        })

    } else {
        // respond bad resquest if there is no roomName query
        res.sendStatus(400)
    }
});


async function readDB(slug) {
    try {
        const data = await fs.readFileSync('db.json', 'utf-8');
        return slug ? JSON.parse(data)[slug] : JSON.parse(data)
    } catch (e) {
        throw new Error(e)
    }
}

async function writeDB(data) {
    try {
        await fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
        return "WriteCompleted"
    } catch (e) {
        throw new Error(e)
    }
}

function patch(target, src) {
    const res = {};
    Object.keys(target)
        .forEach(k => {
            if (src[k]) {
                res[k] = src[k]
            } else {
                res[k] = target[k]
            }
        });
    return res;
}


//   http://localhost:9000 (api works on port 9000)
app.listen("9000")
