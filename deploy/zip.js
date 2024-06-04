const compressing = require('compressing');

const zip = async (url) => {
    try {
      await compressing.zip.compressDir(`${url}/dist`,
       `${url}/dist.zip`);
       return true;
     } catch (err) {
      console.error('zip error',err);
      return false;
     }
  }

  module.exports = zip;