const express = require("express");
const router = express.Router();
const Urls = require("../model/url");

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.send({ error: "url inválida" });

  if (await Urls.findOne({ url })) {
    let urlCreated = await Urls.find({ url }, "shortUrl");

    return res.status(200).json(urlCreated);
  }
  try {
    const newUrl = await Urls.create(req.body);

    return res.status(201).json(newUrl);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Ops! Ocorreu um erro" + err }); 
  }
});

module.exports = router;
