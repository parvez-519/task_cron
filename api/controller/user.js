const appConst = require("../constants");
const userRepo = require("../entities/user");
const db = require("../../db");
// const cron = require('node-cron')

// ADD ONE DATA
const adduser = async (req, res) => {
  try {
    const resp = await userRepo.create(req.body);
    res.status(200).json({
      status: appConst.status.success,
      response: resp,
      message: "successfull",
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        status: appConst.status.fail,
        response: null,
        message: err.message,
      });
  }
};
//DELETE USER BASED ON CRONJOB
// const deleteuser = async (req, res) => {
//   try {
//     console.log("======-----");
//     const task = cron.schedule("0 0 */1 * * *", () => {
//       console.log("======111111-----");
//       const date = new Date();
//       console.log("-----successfully @@@----");
//       // userRepo.destroy({
//       //   where: {
//       //     expire: {
//       //       [Op.lt]: date
//       //     }
//       //   }
//       // })
//     });
//     task.start();
//     console.log("======2222222-----");
//     res.status(200).json({
//       status: appConst.status.success,
//       response: null,
//       message: "successfull",
//     });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(400)
//       .json({
//         status: appConst.status.fail,
//         response: null,
//         message: err.message,
//       });
//   }
// };

module.exports = { adduser };
