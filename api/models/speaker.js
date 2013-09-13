module.exports = function(db, api){
  that = this;

  var attrAccessor = 'speakers.id, speakers.first_name, speakers.last_name,' +
                     ' speakers.email, speakers.description, speakers.photo';
  var table = 'speakers'

  /**
    * Gets all speakers.
    *
    * @callback resultsCallback
    *
    * @param {object} err, Is the erros information.
    * @param {object} results, Data to return.
  */
  that.getSpeakers = function(resultsCallback) {
    db.select(attrAccessor)
      .get(table, function(err, results, fields) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        }
    });
  }

  /**
    * Ger speaker.
    *
    * @param {numeric} id, Speaker identifier.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.getSpeaker = function(id, resultsCallback) {
    db.select(attrAccessor)
      .where({ id: id })
      .get(table, function(err, results, fields) {
        if (results.length == 0) {
          err = true
          if (resultsCallback && typeof(resultsCallback === "function")) {
            resultsCallback(err, results);
          }
        } else {
          if (resultsCallback && typeof(resultsCallback === "function")) {
            resultsCallback(err, results);
          }
        }
    });
  }

  /**
    * Create speaker.
    *
    * @param {object} attr, Attributes for create speaker.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.createSpeaker = function(attr, resultsCallback){
    db.insert(table, formatAttr(api, attr), function(err, results, fields){
      if (!err) {
        that.getSpeaker(results.insertId, function(err, results){
          if (resultsCallback && typeof(resultsCallback === "function")) {
            resultsCallback(err, results);
          }
        })
      } else {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        }
      }
    });
  }

  /**
    * Update speaker.
    *
    * @param {numeric} id, Speaker identifier.
    * @param {object} attr, Attributes for create speaker.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.updateSpeaker = function(id, attr, resultsCallback){
    db.where({ id: id })
      .update(table, attr, function(err, results) {
      if (!err) {
        that.getSpeaker(id, function(err, results){
          if (resultsCallback && typeof(resultsCallback === "function")) {
            resultsCallback(err, results);
          }
        });
      } else {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        }
      }
    });
  }

  /**
    * Delete speaker.
    *
    * @param {numeric} id, Speaker identifier.
    *
    * @callback resultCallback
    *
    *   @param {object} err, Is the erros information.
  */
  that.deleteSpeaker = function(id, resultsCallback){
    db.where({ id: id })
      .delete(table, function(err) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err);
        }
    });
  }
}