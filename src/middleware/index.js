//@ts-check
const { checkPagination } = require("./pagination");
const { validationResult, checkSchema } = require("express-validator");

/**
 *
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 * @returns
 */
function validateReq(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array()).end();
  } else {
    next();
  }
}

/**
 *
 * @typedef {Object} SchemaValidator
 * @property {import('express-validator').Schema} schema
 * @property {import('express-validator').Location} location
 */

/**
 * @param {Array<SchemaValidator>} schemaValidators
 * @param {boolean} allowExtraFields
 */
function validateSchema(schemaValidators, allowExtraFields = false) {
  return async (req, res, next) => {
    if (
      !allowExtraFields &&
      (await checkIfExtraFields(schemaValidators, req))
    ) {
      res
        .status(400)
        .json([{ type: "field", msg: "not allowed extra fields" }])
        .end();

      return;
    }

    for (const { schema, location } of schemaValidators) {
      const results = await checkSchema(schema, [location]).run(req);

      if (!results.every((r) => r.isEmpty())) {
        res
          .status(400)
          .json(results.map((r) => r.array()).flat())
          .end();
        return;
      }
    }

    next();
  };
}

/**
 *
 * @param {Array<SchemaValidator>} schemaValidators
 * @param {ExpressRequest} req
 * @returns
 */
function checkIfExtraFields(schemaValidators, req) {
  for (const validator of schemaValidators) {
    const keys = Object.keys(req[validator.location]);

    if (keys.find((key) => Object.keys(validator.schema).indexOf(key) == -1))
      return true;
  }

  console.error(`${req.ip} try to make a invalid request`);
  return false;
}

function handleNoRowsAffected(err, req, res, next) {
  console.log("handleNoRowsAffected", err);
  if (err.message === "NoRowsAffected") {
    err.code = "NoRowsAffected";
    err.status = 404;
    err.message = "Resource not found";
  }
  next(err);
}

module.exports = {
  checkPagination,
  validateReq,
  validateSchema,
  handleNoRowsAffected,
};
