// Loading Data
const actionsDB = require("../data/helpers/actionModel");
const projectsDB = require("../data/helpers/projectModel");

// Creating Router
const router = require("express").Router();

/**************** POST ****************/
router.post("/:id", validateProjectID, (req, res) => {
  actionsDB
    .insert({ project_id: req.params.id, ...req.body })
    .then((response) => res.status(201).json({ data: response }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

/* GET */
router.get("/", (req, res) => {
  actionsDB
    .get()
    .then((response) => res.status(200).json({ data: response }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

router.get("/:id", validateProjectID, (req, res) => {
  actionsDB
    .get(req.params.id)
    .then((response) => res.status(200).json({ data: response }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

router.get("/:id/actions", validateProjectID, (req, res) => {
  projectsDB
    .getProjectActions(req.params.id)
    .then((response) => res.status(200).json({ data: response }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

/*PUT */
router.put("/:id", validateActionID, (req, res) => {
  actionsDB
    .update(req.params.id, req.body)
    .then((response) => res.status(200).json({ data: response }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

/*DELETE*/
router.delete("/:id", validateActionID, (req, res) => {
  actionsDB
    .remove(req.params.id)
    .then(() => res.status(200).json({ data: "Project Deleted" }))
    .catch(() => res.status(500).json({ message: "Internal Error" }));
});

/*Custom Middleware */
function validateProjectID(req, res, next) {
  projectsDB
    .get(req.params.id)
    .then((response) => {
      if (!response) return res.status(400).json({ data: response });
      next();
    })
    .catch(() => res.status(500).json({ message: "Internal Error" }));
}

function validateActionID(req, res, next) {
  actionsDB
    .get(req.params.id)
    .then((response) => {
      if (!response) return res.status(400).json({ data: response });
      next();
    })
    .catch(() => res.status(500).json({ message: "Internal Error" }));
}

module.exports = router;
// const express = require("express");

// const router = express.Router();

// const Actions = require("../data/helpers/actionModel");
// const Projects = require("../data/helpers/projectModel");

// router.get("/", (req, res) => {
//   Actions.get()
//     .then((actions) => {
//       res.status(200).json({ actions });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Error retrieving the posts",
//       });
//     });
// });

// // router.post("/projects/:id", validateProjectId, validateAction, (req, res) => {
// //   const id = req.params.id;
// //   const newAction = { ...req.body, project_id: id };
// //   Actions.insert(newAction)
// //     .then((action) => {
// //       res.status(201).json(action);
// //     })
// //     .catch((error) => {
// //       res.status(500).json({
// //         message: "Error adding the action",
// //       });
// //     });
// // });

// router.post("/", (req, res) => {
//   Actions.get()
//     .then((action) => {
//       if (!req.body.project_id || !req.body.description || req.body.completed) {
//         res.status(400).json({
//           Message: "Make sure all fields have an entry",
//         });
//       } else {
//         Actions.insert(req.body)
//           .then((action) => {
//             res.status(201).json(action);
//           })
//           .catch((err) => {
//             res.status(500).json({
//               Message: "Post failed",
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ Message: "Something went wrong!" });
//     });
// });

// // router.put("/:id", (req, res) => {
// //   const changes = req.body;
// //   Actions.update(req.params.id, changes)
// //     .then((updated) => {
// //       res.status(200).json(updated);
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //       res
// //         .status(500)
// //         .json({ message: " There was an error updating the action" });
// //     });
// // });

// router.put("/:id", (req, res) => {
//   Actions.get(req.params.id)
//     .then((action) => {
//       if (action.length === 0) {
//         res.status(404).json({
//           Message: "Post failed",
//         });
//       } else if (
//         !req.body.project_id ||
//         !req.body.description ||
//         !req.body.completed
//       ) {
//         res.status(400).json({
//           Message: "Make sure all fields have an entry",
//         });
//       } else {
//         Actions.update(req.params.id, req.body)
//           .then((action) => {
//             res.status(201).json(req.body);
//           })
//           .catch((err) => {
//             res.status(500).json({
//               Message: "Post failed",
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ Message: "Something is wrong. Error" });
//     });
// });

// // router.delete("/:id", (req, res) => {
// //   Actions.remove(req.params.id)
// //     .then((count) => {
// //       if (count > 0) {
// //         res.status(200).json({ message: "The action has been removed" });
// //       } else {
// //         res.status(404).json({ message: "The action could not be found" });
// //       }
// //     })
// //     .catch((error) => {
// //       res.status(500).json({
// //         message: "Error removing the action",
// //       });
// //     });
// // });

// router.delete("/:id", (req, res) => {
//   Actions.remove(req.params.id).then((action) => {
//     res
//       .status(200)
//       .json({ Message: "Project has been deleted", project: req.action });
//   });
// });
// //middleware
// function validateAction(req, res, next) {
//   const action = req.body;
//   if (!action) {
//     res.status(400).json({ message: "missing action data" });
//   } else if (!action.notes) {
//     res.status(400).json({ message: "missing required name field" });
//   } else if (!action.description) {
//     res.status(400).json({ message: "missing required description field" });
//   } else if (action.description.length > 128) {
//     res.status(400).json({ message: "description's character exceeds 128" });
//   } else {
//     next();
//   }
// }

// function validateProjectId(req, res, next) {
//   Projects.get(req.params.id)
//     .then((project) => {
//       if (project !== null) {
//         next();
//       } else {
//         res.status(400).json({ message: "Invalid project ID" });
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "Can't connect to database", error: err });
//     });
// }

// module.exports = router;
