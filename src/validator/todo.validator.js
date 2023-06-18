/**
 * @type {import('../middleware').SchemaValidator}
 */
const TodoId_schema = {
  schema: {
    id: {
      isInt: true,
      toInt: true,
    },
  },
  location: "params",
};
/**
 * @type {import('../middleware').SchemaValidator}
 */
const TodoCreateItemReq_schema = {
  schema: {
    description: {
      isString: true,
      optional: false,
    },
    completed: {
      isBoolean: true,
      optional: false,
    },
  },
  location: "body",
};
/**
 * @type {import('../middleware').SchemaValidator}
 */
const TodoUpdateItemReq_schema = {
  schema: {
    description: {
      isString: true,
      optional: true,
    },
    completed: {
      isBoolean: true,
      optional: true,
    },
  },
  location: "body",
};

module.exports = {
  TodoId_schema,
  TodoCreateItemReq_schema,
  TodoUpdateItemReq_schema,
};
