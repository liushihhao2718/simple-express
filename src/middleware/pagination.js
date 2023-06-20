//@ts-check


/**
 * @type {import('../middleware').SchemaValidator}
 */
module.exports.checkPagination = {
  schema: {
    limit: {
      optional: true,
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
