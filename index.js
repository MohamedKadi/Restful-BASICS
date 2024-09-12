const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Optional: Set the views directory if it's not in the default path ("views")
const path = require('path');
app.set('views', path.join(__dirname, '/views'));


const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        username: 'skylar',
        comment: 'the danger herself'
    },
    {
        username: 'sk8erboi',
        comment: 'skyyyyyy die lit'
    },
    {
        username: 'dogy',
        comment: 'cvvv ss'
    },
    {
        username: 'onlysayswooof',
        comment: 'wooof'
    },
]

app.get('/comments',(req, res) => {
    res.render('comments/index',{comments: comments})
})
app.get('/comments/new',(req, res) => {
    res.render('comments/new')
})

app.post('/comments',(req, res) => {
    // console.log(req.body);
    const {username, comment} = req.body;
    comments.push({username, comment});
    res.redirect('/comments'); //GET by default
})











app.get('/',(req,res)=>{
    res.render('getpost');
})

app.get('/tacos',(req,res)=>{
    res.send("GET /tacos respond");
})
app.post('/tacos',(req,res)=>{
    console.log(req.body)
    res.send("POST /tacos respond");
})

app.listen(3000, ()=>{
    console.log("listening to the port 3000!!");
})