const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');


// Local Database for development purposes
// mongoose.connect('mongodb://localhost:27017/passwordsDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(()=>{
//     console.log(`Connected to the Local MongoDB Database at Port 27017`);
// }).catch((e) =>{
//     console.log(`Failed to Connect to the Database ${e}`);
// });



// cloud database for production purposes
let password = 'nUUKNlA4DeTMNiWV';
let link = `mongodb+srv://affan:${password}@users.mq3loit.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// creating express app
const app = express();


app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());


app.post('/api/login', async (request, response) => {
    console.log(request.body);

    const { username, password} = request.body;

    try{
        const res = await User.create({
            username, password
        })
        console.log("User Created Successfully", res);
        return response.json(
            {status: 'OK'}
        )
    }
    catch(error){
        if(error.code === 11000)
        {
            return response.json({status: 'error', error: 'Username Already Exists'})
        }
        throw error
    }


});


app.listen(9999, () => {
    console.log('Server is Running at Port 9999');
});