// const validationError = (error) => {
//   return error.errors.slice(0).map(({ message, type, path }) => {
//     return { domain: path, reason: type, message: message };
//   });
// };

// dispay error
exports.validationErrors = (error) => {
  return {
    code: 404,
    message: error.message,
    errors: error.errors.slice(0).map(({ message, type, path }) => {
      return { domain: path, reason: type, message: message };
    }),
  };
};

// display custom error
exports.validationErrorForSingleUser = (error) => {
  return {
    code: 404,
    message: error.message,
    errors: error.errors,
  };
};

// custom error throw
exports.idNullValidater = (user) => {
  if (user === null)
    throw {
      message: "id not found",
      errors: [
        { error: "not found", message: "id not found", type: "id error" },
      ],
    };
};
