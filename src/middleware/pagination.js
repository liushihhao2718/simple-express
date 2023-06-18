


/**
 * @type {import('../middleware').SchemaValidator}
 */
module.exports.checkPagination = {
  schema: {
    limit: {
      optional: true,
      default: 10,
      isInt: {
        options: {
          min: 0,
          max: 100,
        },
      },
      toInt: true,
    },
    offset: {
      optional: true,
      default: 0,
      isInt: {
        options: {
          min: 0,
          max: 100,
        },
      },
      toInt: true,
    },
  },
  location: "query",
};
