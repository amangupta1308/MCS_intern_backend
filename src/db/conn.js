const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connection successful")).catch((e)=>console.log(e));