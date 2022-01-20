const express = require('express');
const router = express.Router();
var moment = require('moment');
const { updateOne } = require('../models/bewerbungen.model');
const Bewerbungen = require('../models/bewerbungen.model')

router.post('/',async(req,res)=>{
    const compN = req.body.compN
    const compS = req.body.addr.split('|')[0]
    const compT = req.body.addr.split('|')[1]
    const bw = req.body.bw
    const status = req.body.status
    const anm = req.body.anm
    const c1 = req.body.color1
    const c2 = req.body.color2
    const bewe = await new Bewerbungen({compName: compN, compStreet: compS, compTown: compT, beworben: bw, status: status, anmerkungen: anm, color1:c1, color2:c2}).save()
    res.json({bewerbung: bewe})
})

router.get('/all', async(req,res)=>{ 
    const page = req.query.page
    const perPage = 10
    const bw = await Bewerbungen.find({}).sort({datum: 1}).limit(perPage).skip((page-1)*perPage)
    res.json(bw)
})

router.get('/pages', async(req,res)=>{
    const perPage = 10
    const pages = Math.floor((await Bewerbungen.count({}))/perPage)+1
    res.json({pages: pages})
})

router.post('/delete', async(req,res)=>{
    const id = req.body.id
    console.log(id);
    const del = await Bewerbungen.deleteOne({_id:id})
    res.json({del: del})
})

router.post('/getId', async(req,res)=>{
    const id=req.body.id
    const bw = await Bewerbungen.findOne({_id:id})
    res.json({bw:bw})
})

router.post('/update', async(req,res)=>{
    const values=req.body.bw
    const id = req.body.id
    const bw = await Bewerbungen.updateOne({_id:id},{$set:values})
    res.json({bw: bw})
})

// router.get('/deleteAll', async(req,res)=>{
//     await Bewerbungen.deleteMany({})
// })


module.exports=router;