import __ from 'lodash';

/**
 * You can extend Lodash with mixins
 * And use it as below
 * import _ from '@lodash'
 */
const _ = __.runInContext();

_.mixin({
    // Immutable Set for setting state
    setIn: (state, name, value) => {
        return _.setWith(_.clone(state), name, value, _.clone);
    }
});

_.mixin({
    findByValues: function(collection, property, values) {
      return _.filter(collection, function(item) {
        return _.includes(values, item[property]);
      });
    }
});

_.mixin({
    fillArray(value, len) {
      if (len === 0) return [];
      var a = [value];
      while (a.length * 2 <= len) a = a.concat(a);
      if (a.length < len) a = a.concat(a.slice(0, len - a.length));
      return a;
    }
})

export default _;
