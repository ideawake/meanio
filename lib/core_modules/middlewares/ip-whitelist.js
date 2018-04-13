const cache = require('cache-flex');


module.exports = function() {
  const matchIP = function(ip) {
    console.log('matching: ', ip);
  
    let match = false;
    const ipArray = ip.split('.');
  
    whitelist.forEach(pattern => {
      let patternArray = pattern.split('.');
  
      if (patternArray.length !== ipArray.length) return;
  
      let allPartsMatch = true;
  
      patternArray.forEach((part, i) => {
        if (part === '*') return;
        if (ipArray[i] !== part) allPartsMatch = false;
      });
  
      if (allPartsMatch) match = true;
    });
  
    return match;
  }

  return (req, res, next) => {
    const whitelist = cache.getSync('ip-whitelist');
    if (!whitelist || !whitelist.length) next();
    else {
      // TODO: check ip here
      next();
    }
  };
};
