//Project Router

const express = require("express");

const router = express.Router();

//import user database and import post database
const Projects = require("../data/helpers/projectModel");

//GET router
router.get("/", (req, res) => {
  //get request
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: " There was an error getting the project." });
    });
});

router.get("/:id", (req, res) => {
  Projects.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Project ID could not be found" });
    });
});

router.post("/", (req, res) => {
  Projects.insert({ name: req.body.name, description: req.body.description })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Project could not be created" });
    });
});

//update request
router.put("/:id", (req, res) => {
  const changes = req.body;
  Projects.update(req.params.id, changes)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: " There was an error updating the project" });
    });
});

//delete request done
router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      res.status(204).json({ message: `${project} deleted` });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was an error deleting the project" });
    });
});

//middleware

module.exports = router;
