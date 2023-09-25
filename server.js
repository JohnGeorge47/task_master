import {app} from "./src/index.js"
import {sequelize} from "./databse/db.js";

const port = process.env.PORT || '8080'

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(port,()=>{
    console.log("The app is listening on port: ",port)
})