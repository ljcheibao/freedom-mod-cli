let StoreManager = function () {
   let _store = {};
  return {
    _store: _store,
    get: get,
    set: set,
    clear: clear
  }
};

function get(key) {
  return this._store[key];
};

function set(key, value) {
  this._store[key] = value;
};

function clear() {
  this._store = {};
};

module.exports = new StoreManager();