const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '10736504',
        database: 'smartbrain'
    }
});

// console.log(postgres.select('*').from('users'));
// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(express.json());
app.use(cors())

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', signin.handleSignin(db, bcrypt)) //this way of doing it is exactly the same as below (just a little cleaner)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
    // bcrypt.compareSync("bacon", hash); // true
    // bcrypt.compareSync("veggies", hash); // false

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    // database.users.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     // password: password,
    //     entries: 0,
    //     joined: new Date()
    // })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})


/*

Planning what we are going to do

NEED THE FOLLOWING ENDPOINTS FOR THE APP;
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image endpoint --> PUT --> user(return the updated user object)

*/