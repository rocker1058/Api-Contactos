import express, { urlencoded } from 'express'
const app = express();

import indexRoutes from './routes/index'

//middleware

app.use(express.json());
app.use(urlencoded({extended: false}))


app.use(indexRoutes);

app.listen(3000, () => {
    console.log('Server on port', 3000)
})

module.exports =app;