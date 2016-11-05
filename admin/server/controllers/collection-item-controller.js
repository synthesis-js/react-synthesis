// collection-item-controller.js
const CollectionItem = require('../models/collection-item');

let collectionItemController = {};

// creating the collection on mongo
collectionItemController.createCollectionItem = (req, res) => {
  let bodyObj = req.body;
  let newCollectionItem = new CollectionItem();

  newCollectionItem.item_properties = bodyObj.item_properties;
  newCollectionItem.collection_id = bodyObj.collection_id;
  newCollectionItem.user_id = bodyObj.user_id;

  newCollectionItem.save(function(err){
    if (err) throw err;
  });

  return res.sendStatus(200);
};

//listing all the collection
collectionItemController.getAllCollectionItems = (req, res) => {
  CollectionItem.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};


//deleting collection by id
collectionItemController.deleteCollectionItemById = (req, res) => {
  CollectionItem.findByIdAndRemove(req.params.item_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('collection deleted!');
  });
};

collectionItemController.deleteCollectionItemsById = (req, res) => {
  CollectionItem.remove({collection_id: req.params.collection_id}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('collection deleted!');
  });
};

module.exports = collectionItemController;
