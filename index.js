const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' everytime u call this it will generate a unique id
// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Optional: Set the views directory if it's not in the default path ("views")
const path = require('path');
app.set('views', path.join(__dirname, '/views'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuidv4(),
        username: 'skylar',
        comment: 'the danger herself'
    },
    {
        id: uuidv4(),
        username: 'sk8erboi',
        comment: 'skyyyyyy die lit'
    },
    {
        id: uuidv4(),
        username: 'dogy',
        comment: 'cvvv ss'
    },
    {
        id: uuidv4(),
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
    comments.push({username, comment, id: uuidv4()});
    res.redirect('/comments'); //GET by default
})
app.get('/comments/:id',(req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    console.log(comment);
    res.render('comments/show', {comment: comment})
})
app.patch('/comments/:id',(req,res)=>{
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newComment = req.body.comment;
    foundComment.comment = newComment;
    res.redirect('/comments');
})
app.get('/comments/:id/edit',(req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {
        comment: comment,
    })
})
app.delete('/comments/:id',(req,res)=>{
    const { id } = req.params;
    comments = comments.filter(comm => comm.id !== id);
    res.redirect('/comments');
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