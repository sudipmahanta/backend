require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send("http//:bohiba.com");
})

app.listen(port, ()=> {
    console.log(`Server working ${port}`);
});