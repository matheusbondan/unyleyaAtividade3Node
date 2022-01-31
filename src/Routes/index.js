const express = require("express");
const Urls = require("../model/url");
const router = express.Router();
const path = require("path");


/**
 * @swagger
 * "/":
    get:
      tags:
        - Short
      summary: Retorna a lista com todas as URLs cadastradas.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/URLObject'
 */
router.get("/", async (req, res) => {
  const list = await Urls.find({});
  return res.status(200).json(list);
});


/**
 * @swagger
 * /{short}:
    get:
      tags:
        - Short
      summary: Retorna URL pela URL short.
      parameters:
        - name: short
          in: path
          required: true
          description: "Short da URL encurtada"
          schema:
            type: string
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/URLObject'
        "404":
          description: Não encontrou resultados
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        "500":
          description: Internal Server Error
 */
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

  if (!id) return res.status(404).end({ error: "Não foi encontrada nenhuma URL com esse id!" });

  try {
    const url = await Urls.find({ _id: id });
    return res.status(200).json(url);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar o Id" });
  }
});

router.post("/date", async (req, res) => {
  let date = req.body.date;

  if (!date) return res.status(404).end({ error: "Não foi encontrada nenhuma URL com essa data!" });

  try {
    const gt = `${date}T00:00:00.000Z`
    const lt = `${date}T23:59:59.000Z`

    const url = await Urls.find({
      'created': { $gt: gt,
      $lt: lt}
    })
    return res.status(200).json(url);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar a data" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Urls.findOneAndDelete(id);
  return res.status(200).send({ message: "Url Deleted" });
});

module.exports = router;
