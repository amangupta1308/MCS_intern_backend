const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
require('./src/db/conn');
const PORT = 8000 || process.env.PORT;
const Task = require('./src/models/Task');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post('/api', async (req, res)=>{
    try{
        let result = new Task(req.body);
        result = await result.save();
        res.status(201).send(result);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.get('/api', async (req, res)=>{
    try{
        const data = await Task.find();
        res.status(200).send(data);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.delete('/api/:id', async (req, res)=>{
    try{
        const _id = req.params.id;
        const result = await Task.findByIdAndDelete({_id}, {new: true});
        res.status(200).send(_id);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.patch('/api/:id', async (req, res)=>{
    try{
        const _id = req.params.id;
        const result = await Task.findByIdAndUpdate({_id}, req.body);
        res.status(200).send(result);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.get('/api/:id', async (req, res)=>{
    try{
        const _id = req.params.id;
        const result = await Task.findOne({_id});
        res.status(200).send(result);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.patch('/api/:id', async (req, res)=>{
    try{
        const _id = req.params.id;
        const result = await Task.findByIdAndUpdate({_id}, req.body);
        res.status(200).send(result);
    } catch(e) {
        return res.json({"error": e.message});
    }
})

app.listen(PORT, ()=>console.log(`Listening at port ${PORT}`));
