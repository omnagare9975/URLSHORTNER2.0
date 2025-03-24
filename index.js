const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path')
const { UrlModel } = require('./Models/url');
const router = require('./Routes/UrlRoute');
const StaticRoute = require('./Routes/StaticRoute');
const  UserSingUp = require('./Routes/userSingUp')
const loginRoute = require('./Routes/Login')
const {restrictToLoggedinUserOnly} = require('./Middleware/auth')
const  mongoose  = require('mongoose');





app.set('view engine' , 'ejs');
app.set('views' , path.resolve("./views"))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/urlshortner' , restrictToLoggedinUserOnly , StaticRoute)
app.use('/signup' , UserSingUp)
app.use('/Login' ,loginRoute )
app.get('/test', async (req, res) => {
    const results = await UrlModel.find({}); // Returns an array

    if (results.length === 0) {
        return res.send("<h2>No data found</h2>");
    }

    // return res.render('main' , {urls : results});
});

app.get('/url/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const FindTheId = await UrlModel.findOneAndUpdate(
            { ShortURL: shortId },  
            { $push: { VistedHistory: { timestamp: Date.now() } } },  
        );

        if (!FindTheId) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(FindTheId.ReDirect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use('/url', router);

app.get('/anylatics/:shortId' , async( req , res)=>{
    const shortId = req.params.shortId

    const result =  await UrlModel.findOne({
        ShortURL: shortId
    })
    return res.json({TotalClick: result.VistedHistory.length , analytics: result.VistedHistory
    } )
})


app.get('/' ,async (req , res)=>{
    setTimeout(()=>{
       res.send('USER CREATED ')
    } ,1000)


})

mongoose.connect('mongodb://localhost:27017/urlshortner')
.then(()=> console.log('DB IS CONNECTED !! '))
.catch(()=>  console.log(`DB is Failed to connect`))

app.listen(8000, () => console.log(`Listening on Port 8000`));





