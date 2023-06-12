


/**
 * @type {import('../middleware').SchemaValidator}
 */
module.exports.checkPagination = {
  schema: {
    limit: {
      isInt: {
        options: {
          min: 0,
          max: 100,
        },
      },
      toInt: true,
    },
    offset: {
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
