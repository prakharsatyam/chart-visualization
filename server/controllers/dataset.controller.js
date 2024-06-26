import { Dataset } from "../models/Dataset.model.js";
const getBaseController=(req,res)=>{
    res.send("Standard api response to get the data hit the other data points ")
}
const getDataController= async (req,res)=>{
    const data =await Dataset.find();
    
    res.json(data);
}
const getIntensityController= async (req,res)=>{
    const data = await Dataset.aggregate([
        {
            
                $group: {
                  _id: "$intensity",
                  articles:{$push: '$$ROOT'}
                },
        }
    ])
    res.send(data)
}

export {getDataController,getBaseController,getIntensityController}


