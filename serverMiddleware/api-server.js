export default async (req, res, _next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, '');
  url = url.split('/');
  const method = url.pop();
  const controller = url.slice(1).join('/');
  const api = require(`../api/${controller}.ts`);
  const result = await api[method](req.params);
  res.end(JSON.stringify(result));
};
