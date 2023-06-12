module.exports.datetimeStringConverter = datetimeStringConverter;


function datetimeStringConverter(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString("sv");
}
