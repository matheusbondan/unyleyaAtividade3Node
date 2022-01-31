const express = require("express");
const Urls = require("../model/url");
const router = express.Router();
const path = require("path");


/**
 * @module Index
 */

/**
 * @typedef {Object} UrlsListResponse
 * @property {[Urls]} result
 */

//  {
//   "_id": "61f71951503e0dcf1505c87d",
//   "url": "http://microsoft.com",
//   "short": "4dRfV",
//   "created": "2022-01-30T23:03:45.133Z",
//   "shortUrl": "http://localhost:5000/4dRfV",
//   "__v": 0
// }

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UrlsListResponse>}
 */

router.get("/", async (req, res) => {
  const list = await Urls.find({});
  return res.json(list);
});

router.get("/:short", async (req, res) => {
  let short = req.params.short;

  if (!short) return res.status(403).end({ error: "Id inválido!" });

  try {
    const url = await Urls.find({ short }, "url");

    return res.status(301).redirect(url[0].url);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar o Id" });
  }
});

router.get("/id/:id", async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(403).end({ error: "Id inválido!" });

  try {
    const url = await Urls.find({ _id: id });
    return res.json(url);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar o Id" });
  }
});

router.post("/date", async (req, res) => {
  let date = req.body.date;

  if (!date) return res.status(403).end({ error: "Id inválido!" });

  try {
    console.log("Short", date)

    const gt = `${date}T00:00:00.000Z`
    const lt = `${date}T23:59:59.000Z`

    console.log("gt", gt)
    console.log("lt", lt)

    const url = await Urls.find({
      'created': { $gt: gt,
      $lt: lt}
    })
    return res.json(url);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar o Id" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Urls.findOneAndDelete(id);
  return res.send({ message: "Url Deleted" });
});

module.exports = router;
