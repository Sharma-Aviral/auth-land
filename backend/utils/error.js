const capitalize = require("./capitalizeFirstString");

module.exports = (message) => {
    let errorObject = {
        errors: []
    }

    message.forEach((msg) => {
        errorObject.errors.push({"error": capitalize(msg)});
    });

    return errorObject;
}