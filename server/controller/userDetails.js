const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const result = await getUserDetailsFromToken(token);

    if (result.expired) {
      return response.status(401).json({
        message: "Token expired. Please login again.",
        error: true
      });
    }

    if (result.logout) {
      return response.status(401).json({
        message: "Session expired. Please login again.",
        error: true
      });
    }

    return response.status(200).json({
      message: "User details",
      data: result
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true
    });
  }
}

module.exports = userDetails;
