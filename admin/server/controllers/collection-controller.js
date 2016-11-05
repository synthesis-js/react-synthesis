// collection-controller.js
const Collection = require('../models/collection');

let collectionController = {};

// creating the collection on mongo
collectionController.createCollection = (req, res) => {
  let bodyObj = req.body;
  let newCollection = new Collection();

  newCollection.title = bodyObj.title;
  newCollection.collection_properties = bodyObj.properties;
  newCollection.user_id = bodyObj.user_id;

  newCollection.save(function(err){
    if (err) throw err;
  });

  return res.sendStatus(200);
};

//listing all the collection
collectionController.getAllCollections = (req, res) => {
  Collection.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};


//deleting collection by id
collectionController.deleteCollectionById = (req, res) => {
  Collection.findByIdAndRemove(req.params.collection_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('collection deleted!');
  });
};

module.exports = collectionController;
