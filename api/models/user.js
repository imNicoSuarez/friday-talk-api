module.exports = function(db, api){
  that = this;

  var attrAccessor = 'users.id, users.first_name, users.last_name,' +
                     ' users.email, users.photo';
  var table = 'users'

  /**
    * Gets all users.
    *
    * @callback resultsCallback
    *
    * @param {object} err, Is the erros information.
    * @param {object} results, Data to return.
  */
  that.getUsers = function(resultsCallback) {
    db.select(attrAccessor)
      .get(table, function(err, results, fields) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        }
    });
  }

  /**
    * Ger user.
    *
    * @param {numeric} id, User identifier.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.getUser = function(id, resultsCallback) {
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
    * Create user.
    *
    * @param {object} attr, Attributes for create user.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.createUser = function(attr, resultsCallback){
    db.insert('users', formatAttr(api, attr), function(err, results, fields){
      if (!err) {
        that.getUser(results.insertId, function(err, results){
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
    * Update user.
    *
    * @param {numeric} id, User identifier.
    * @param {object} attr, Attributes for create user.
    *
    * @callback resultsCallback
    *
    *   @param {object} err, Is the erros information.
    *   @param {object} results, Data to return.
  */
  that.updateUser = function(id, attr, resultsCallback){
    db.where({ id: id })
      .update(table, attr, function(err, results) {
      if (!err) {
        that.getUser(id, function(err, results){
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
    * Delete user.
    *
    * @param {numeric} id, User identifier.
    *
    * @callback resultCallback
    *
    *   @param {object} err, Is the erros information.
  */
  that.deleteUser = function(id, resultsCallback){
    db.where({ id: id })
      .delete(table, function(err) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err);
        }
    });
  }

  that.getUserByAuth = function(email, passwors, resultsCallback){
    token = api.md5(email + password);
    encripted = api.md5(token + api.stringSegurity);

    db.select(attrAccessor)
      .where({ encripted_password: encripted })
      .get(table, function(err, results, fields) {
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, results);
        } else {
          return results;
        }
    });
  }

  /* ---- Private ---- */

  var formatAttr = function(api, body){
    user = body;
    token = api.md5(user.email + user.password);
    console.log('Auth Token: ' + token);
    user.password = api.md5(user.password);
    user.encripted_password = api.md5(token + api.stringSegurity);
    user.created_at = api.getDateTime();
    return user;
  }
}