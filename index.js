const app = require('./app');
const db = require('./config/db')
const UserModel = require('./models/user.model')

const port = 3007;

app.get('/', (req, res)=>{
    res.send("http//:bohiba.com");
})

app.listen(port, ()=> {
    console.log(`Server working ${port}`);
});