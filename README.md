# React Material Passport

## Features

- React with JWT authentication with Redux Thunk and Material UI
- Express with Mongoose
- Passport with Local, JWT, Facebook and Google strategies

## Installation

Install backend dependencies with:

```
npm install
```

Install client dependencies with:

```
cd client
npm install
```

In the `/config` folder you need to create `dev.js` config file with the following:

```javascript
module.exports = {
  mongoURI: "mongodb://localhost:27017/react-material-passport-path-to-db",
  googleClientID: "your google client id",
  googleClientSecret: "your google secret",
  googleCallbackURL: "/auth/google/callback",
  facebookAppID: "your facebook app id",
  facebookSecret: "your facebook secret",
  facebookCallbackURL: "/auth/facebook/callback",
  secretOrKey: "secret string for jwt",
  successRedirectURL: "https://localhost:3000"
};
```

Create certificates with:

```
cd security
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

Then run the nodemon server with:

```
npm run server
```

The server will be available on `https://localhost:5000`

Run the client with:

```
cd client
npm run start
```

The client will be available on `https://localhost:3000`

or run the both with:

```
npm run dev
```

## Backend

For Facebook OAuth to work it requires https on local server so we make use of built in https server with:

```javascript
const port = process.env.PORT || 5000;

const httpsOptions = {
  key: fs.readFileSync("./security/cert.key"),
  cert: fs.readFileSync("./security/cert.pem")
};

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log("https server running at " + port);
});
```

As you can see for this to work we must generate `cert.key` and `cert.pem` certificates in `security` folder, we do that by navigating to `/security` and executing:

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

In the `/security/req.cnf` put something like this:

```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = GE
ST = State
L = Location
O = Organization Name
OU = Organizational Unit
CN = www.localhost.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.localhost.com
DNS.2 = localhost.com
DNS.3 = localhost
```

Now we can specify `https://localhost:5000/auth/facebook/callback` for callback url in Facebook app settings.

We also mount two static folders, one `/static` for the images and other assets needed by React, the other one `/client/build` is used in the production is for serving React's assets and for the all other routes we return `/client/build/index.html` and let the React do the routing.

```javascript
// Use Routes
app.use("/", authRoutes);
app.use("/", apiRoutes);
app.use("/static", express.static(__dirname + "/static"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
...
```

We make use of https server only in development because for example Heroku wont let us run it on a free plan on the port 5000 so in the production we does the usual on port 80. And it is accessible on https url by default so we can have https callback url.

```javascript
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started on port ${port}`));
```

### Passport configuration

In the `/services` folder we have all the Passport strategies, only the local strategy does flashing the error messages. It does it without session, we don't use session because we use JWT token in the `x-auth-token` header to auth API calls. For the flashing messages to work we make custom callback in `middleware/requireLocalAuth.js`:

```javascript
const requireLocalAuth = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info); // flash the error message
    }
    req.user = user;
    next();
  })(req, res, next);
};
```

After user signs in Facebook redirects him to the specified callback route from which we have to both redirect and generate and send JWT token. We do that by sending token via cookie and redirect to home page. That is the only time we use cookie. After that React parses token from the cookie, deletes the cookie and stores it in the local storage and from now on sends it via header.

```javascript
router.get(
  keys.facebookCallbackURL,
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = tokenFromUser(req.user);
    res.cookie("x-auth-cookie", token);
    res.redirect(keys.successRedirectURL);
  }
);
```

We does the same with other two strategies, Google and Local so we could have unified interface for authentication. Don't forget to pass `email` scope in the `authenticate` call so the user is prompted to give us the email also.

```javascript
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);
```

We make use of two auth middlewares, `requireLocalAuth` which is called when user tries to log in with email and password and `requireJwtAuth` which is used for all other API calls in the `/routes/api.js` routes.

## Frontend

### Logging in

First we assume that user just log on and has cookie so we parse the token from cookie and call `const response = await axios.get("/api/user", { headers });`. If that succeeds token is valid and we set the token in the local storage and delete the cookie.

The other scenario is that the user is already authenticated and has the token in the local storage so we again we call `/api/user` route and if it succeeds token is valid and we put the user in the store.

```javascript
export const logInUser = () => async (dispatch, getState) => {
  try {
    // register
    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt) {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": cookieJwt
      };

      const response = await axios.get("/api/user", { headers });
      localStorage.setItem("token", cookieJwt);
      Cookies.remove("x-auth-cookie"); //delete just that cookie

      dispatch({
        type: LOGIN_USER,
        payload: response.data.user
      });
      return;
    }
    // logged in
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": token
      };

      const response = await axios.get("/api/user", { headers });
      dispatch({
        type: LOGIN_USER,
        payload: response.data.user
      });
      return;
    }
  } catch (err) {
    localStorage.removeItem("token");
    Cookies.remove("x-auth-cookie");
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    });
  }
};
```

That action creator is called in the `/client/src/layout/Navbar.js` component in the `componentDidMount()` method.

For the Local strategy is used Register/Login form which design is used from the `Devias.io` [repo](https://github.com/devias-io/react-material-dashboard).
