const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');

module.exports = async (req, res) => {
  const { url, viewport, width } = req.query;
  const secretKey = 'testJournalReport2024!';
  const accessKey = '662212c1945ea1aaf60b264d73e3b2ed';
  const md5SecretKey = CryptoJS.MD5(url + secretKey).toString();
  const apiUrl = `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${encodeURIComponent(url)}&viewport=${viewport}&width=${width}&secret_key=${md5SecretKey}&format=PNG`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching screenshot: ${response.statusText}`);
    }
    const blob = await response.buffer(); // use buffer() to handle binary data
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(blob);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to capture screenshot' });
  }
};
