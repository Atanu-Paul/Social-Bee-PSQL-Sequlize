const jwt = require("jsonwebtoken");
const asyncHandler = require("./async_handler");
const ErrorResponse = require("../utils/error_response");
const User = require("../models/user_models/user");

//Protect Routes

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //converting the bearer-token to an array and checking
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.coookies.token;
  }

  //Making sure Token exists
  if (!token) {
    return next(new ErrorResponse("Not Authorised to Access this Route!", 401));
  }

  try {
    //Verify token from palyload inside token,
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    console.log(decodedToken);

    //req.user will have the details of a user which shall be utilized by suceeding route-handler
    req.user = await User.findOne({ where: { id: decodedToken.id } });
    next();
  } catch (err) {
    return next(new ErrorResponse("Not Authorised to Access this Route!", 401));
  }
});
