/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
const router = new express.Router();
const User = require("../models/user");
const {ensureLoggedIn} = require("../middleware/auth")
const ExpressError = require("../expressError");



 router.get("/", async function(req, res, next) {
    try {
      const users = await User.all();
      return res.render("users_list.html", { users });
    } catch (err) {
      return next(err);
    }
  });


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username/", async function(req, res, next) {
    try {
      const user = await User.get(req.params.username);
  

  
      return res.render("user_detail.html", { user });
    } catch (err) {
      return next(err);
    }
  });


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
 router.get("/:username/to", async function(req, res, next) {
    try {
      const messagesTo = await User.messagesTo(req.params.username);
  

  
      return res.render("message_detail.html", { messagesTo });
    } catch (err) {
      return next(err);
    }
  });

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get("/:username/from", async function(req, res, next) {
    try {
      const messagesFrom = await User.messagesTo(req.params.username);
  

  
      return res.render("message_detail.html", { messagesFrom });
    } catch (err) {
      return next(err);
    }
  });

 module.exports = router;
