// plugin-item-controller.js
const PluginItem = require('../models/plugin-item');

let pluginItemController = {};

// creating the plugin item on mongo
pluginItemController.createPluginItem = (req, res) => {
  let bodyObj = req.body;
  let newPluginItem = new PluginItem();

  newPluginItem.data_values = bodyObj.data_values;

  newPluginItem.save(function(err){
    if (err) throw err;
  });

  return res.sendStatus(200);
};

//listing all the plugin items
pluginItemController.getAllPluginItems = (req, res) => {
  PluginItem.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

//listing plugin items by id
pluginItemController.getPluginItemById = (req, res) => {
  PluginItem.findById(req.params.plugin_item_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

//updating plugin item by id
pluginItemController.updatePluginItemById = (req, res) => {
  PluginItem.findByIdAndUpdate(req.params.plugin_item_id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

// deleting plugin item by id
pluginItemController.deletePluginItemById = (req, res) => {
  PluginItem.findByIdAndRemove(req.params.plugin_item_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('plugin item deleted!');
  });
};

module.exports = pluginItemController;
