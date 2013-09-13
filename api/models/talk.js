module.exports = function(db, api){
  that = this;

  var attrAccessor = 'talks.id, talks.name, talks.description,' +
                     'talks.speaker_id, talks.talk_date';

  var table = 'talks'

  /**
    * Gets all talks.
    *
    * @callback resultsCallback
    *
    * @param {object} err, Is the erros information.
    * @param {object} results, Data to return.
  */
  that.getTalks = function(resultsCallback) {
    db.select(attrAccessor)
      .get(table, function(err, results, fields) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        }
    });
  }

  /**
    * Ger talk.
    *
    * @param {numeric} id, Talk identifier.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.getTalk = function(id, resultsCallback) {
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
    * Create talk.
    *
    * @param {object} attr, Attributes for create talk.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.createTalk = function(attr, resultsCallback){
    db.insert('talks', formatAttr(api, attr), function(err, results, fields){
      if (!err) {
        that.getTalk(results.insertId, function(err, results){
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
    * Update talk.
    *
    * @param {numeric} id, Talk identifier.
    * @param {object} attr, Attributes for create talk.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.updateTalk = function(id, attr, resultsCallback){
    db.where({ id: id })
      .update(table, attr, function(err, results) {
      if (!err) {
        that.getTalk(id, function(err, results){
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
    * Delete talk.
    *
    * @param {numeric} id, Talk identifier.
    *
    * @callback resultCallback
    *
    *   @param {object} err, Is the erros information.
  */
  that.deleteTalk = function(id, resultsCallback){
    db.where({ id: id })
      .delete(table, function(err) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err);
        }
    });
  }

}