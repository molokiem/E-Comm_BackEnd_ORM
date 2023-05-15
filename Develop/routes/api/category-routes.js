const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["product name", "price", "stock"],
      },
    ],
  });
  res.json(categories);
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  const category_id = req.params.id;
  const category = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ["product name", "price", "stock"],
      },
    ],
  });
  res.json(category);
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});

router.put("/:id", async (req, res) => {
  const results = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(results);
});

router.delete("/:id", async (req, res) => {
  const deleteId = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deleteId);
});

module.exports = router;
