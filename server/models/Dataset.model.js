import { Schema,model } from "mongoose";
const datasetSchema = new Schema({
    end_year:{
        type: Number
    },
    intensity:{
        type: Number
    },
    sector:{
        type: String
    },
    insight:{
        type: String
    },
    url:{
        type: String
    },
    start_year:{
        type: Number,
    },
    impact:{
        type: Number,
    },
    added:{
        type: String,
    },
    published:{
        type: Date,
    },
    country:{
        type: String,
    },
    pestle:{
        type: String,
    },
    source:{
        type: String,
    },
    title:{
        type: String,
    }, 
    likelihood:{
        type: Number,
    },
})
const Dataset = new model('Dataset',datasetSchema);
export {Dataset}