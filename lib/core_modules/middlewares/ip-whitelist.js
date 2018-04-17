const cache = require('cache-flex');
const IpFilter = require('express-ipfilter').IpFilter;


module.exports = function() {
  return (req, res, next) => {
    const whitelist = cache.getSync('ip-whitelist');
    if (!whitelist || !whitelist.length) next();
    else {
      IpFilter(whitelist, {mode: 'allow', log: false})(req, res, next);
    }
  };
};
