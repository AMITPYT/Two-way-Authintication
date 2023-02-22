
const express = require("express");
const router = express.Router();
const Details = require("../Schema/Details_Mod");
const { validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');

router.post( "/generalinformatrion",fetchuser,async (req, res) => {
    try {
      const { full_name,headline } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(full_name == "" || headline == ""){
       return  res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        full_name,
        headline,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "General Information Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post( "/experince",fetchuser,async (req, res) => {
    try {
      const { comapany_name,position,date_of_join, date_of_resign,work_description,used_skill  } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(comapany_name == "" || position == "" || date_of_join == "" || date_of_resign == "" || work_description == "" || used_skill == ""){
       return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        comapany_name,position,date_of_join, date_of_resign,work_description,used_skill,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "Experince Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post( "/skills",fetchuser,async (req, res) => {
    try {
      const {  skill_name,experince } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(skill_name == "" || experince == ""){
        return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        skill_name,experince,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": " Skills Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.post( "/addproject",fetchuser,async (req, res) => {
    try {
      const {  project_title,project_url, project_description, project_duration } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(project_title == "" || project_url == "" || project_description == "" || project_duration == ""){
        return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        project_title,project_url, project_description, project_duration,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "addproject Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post( "/addlicensescertifications",fetchuser,async (req, res) => {
    try {
      const {  name,issue_organigation, certificate_link, issue_date } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(name == "" || issue_organigation == "" || certificate_link == "" || issue_date == ""){
        return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        name,issue_organigation, certificate_link, issue_date,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "addlicensescertifications Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.post( "/addcourse",fetchuser,async (req, res) => {
    try {
      const {  name1,issue_organigation1 } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(name1 == "" || issue_organigation1 == "" ){
        return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        name1,issue_organigation1, 
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "addcourse Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post( "/contentinfo",fetchuser,async (req, res) => {
    try {
      const {  email, phone, skype_id } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if(email == "" || phone == "" || skype_id == "" ){
        return res.json({msg: "Empty Field not allowed"})
      }
      const note = new  Details ({
        email, phone, skype_id,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json({"Success": "contentinfo Added Successfully",savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get('/fetchalldetails', fetchuser, async (req, res) => {
    try {
        const getallfollower = await  Details .find({ user: req.user.id });
        res.json(getallfollower)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



 module.exports = router;
 