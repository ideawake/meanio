const cache = require('cache-flex');
const IpFilter = require('express-ipfilter').IpFilter;


module.exports = function() {
  return (req, res, next) => {
    const whitelist = cache.getSync('ip-whitelist');
    if (!whitelist || !whitelist.length) next();
    else {
      IpFilter(whitelist, { mode: 'allow', log: false, allowedHeaders: ['x-forwarded-for']})(req, res, next);
    }
  };
};
