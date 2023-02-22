const mongoose = require("mongoose");
const { Schema } = mongoose;

const Details = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  full_name: {
    type: String,
   
    
   
  },
  headline: {
    type: String,
   
    
 
  },
  comapany_name: {
    type: String,
   
    
   
  },
  position: {
    type: String,
   
    
   
  },
  date_of_join: {
    type: String,
   
    
  
  },
  date_of_resign: {
    type: String,
   
    
  
  },
  work_description: {
    type: String,
   
    
   
  },
  used_skill: {
    type: String,
   
    
   
  },
  skill_name: {
    type: String,
   
    
  
  },
  experince: {
    type: String,
   
    

  },
  project_title: {
    type: String,
   
    
  
  },
  project_url: {
    type: String,
   
    
   
  },
  project_description: {
    type: String,
   
    
  
  },
  project_duration: {
    type: String,
   
    
 
  },
  name: {
    type: String,
   
    
 
  },
  issue_organigation: {
    type: String,
   
    
  
  },
  certificate_link: {
    type: String,
   
    
   
  },
  issue_date: {
    type: String,
   
    
   
  },
  name1: {
    type: String,
   
    
  
  },
  issue_organigation1: {
    type: String,
   
    
  
  },
  email: {
    type: String,
   
    
  
  },
  phone: {
    type: String,
   
    min: 10,
  },
  skype_id: {
    type: String,
    

  },
  date: {
    type: Date,
    default: Date.now,

  },
});

module.exports = mongoose.model("Details", Details);
