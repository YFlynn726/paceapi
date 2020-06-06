//const path = require("path");
const express = require("express");
const xss = require("xss");
const ItemsService = require("./items-service");

const itemsRouter = express.Router();
const jsonParser = express.json();

const serializeItem = (item) => ({
  id: item.id,
  date: item.date,
  pace: xss(item.pace),
  content: xss(item.content),

  user_id: item.user_id,
});

itemsRouter
  .route("/api/items")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ItemsService.getAllItems(knexInstance)
      .then((items) => {
        res.json(items.map(serializeItem));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { date, pace, user_id, content } = req.body;
    const newItem = { date, pace, user_id, content };

    for (const [key, value] of Object.entries(newItem)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }
    }

    ItemsService.insertItem(req.app.get("db"), newItem)
      .then((item) => {
        res.status(201).location(`/items/${item.id}`).json(serializeItem(item));
      })
      .catch(next);
  });

itemsRouter
  .route("/:item_id")
  .all((req, res, next) => {
    ItemsService.getById(req.app.get("db"), req.params.item_id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({
            error: { message: `item doesn't exist` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeItem(res.item));
  })
  .delete((req, res, next) => {
    ItemsService.deleteItem(req.app.get("db"), req.params.item_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { date, pace, user_id, content } = req.body;
    const itemToUpdate = { date, pace, user_id, content };

    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'pace', 'content'`,
        },
      });

    ItemsService.updateItem(req.app.get("db"), req.params.item_id, itemToUpdate)
      .then((numRowsAffected) => {
        res.status(201).json({
          json: numRowsAffected,
        });
      })
      .catch(next);
  });

module.exports = itemsRouter;
