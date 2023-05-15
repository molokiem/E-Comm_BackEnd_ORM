const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tag = await Tag.finsAll({
    include: [
      {
        model: Product,
        attributes: ["product name", "price", "stock"],
      },
    ],
  });
  res.json(tag);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag_id = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["product name", "price", "stock"],
      },
    ],
  });
  res.json(tag_id);
});

router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const results = await Tag.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(results);
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deleteId = await Tag.destroy({
    where: { id: req.params.id },
  });
  res.json(deleteId);
});

module.exports = router;
