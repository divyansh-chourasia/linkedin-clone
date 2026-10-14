# LinkedIn-style API

This repository is an API. There is no frontend. Express in `backend/` exposes `/api/v1/auth`, `/api/v1/users`, `/api/v1/posts`, `/api/v1/notifications`, and `/api/v1/connections`.

Signup takes a name, a username, an email, and a password of at least six characters. Usernames and emails have to be unique. The password is stored as a bcrypt hash. Login takes a username and password. Both set an httpOnly cookie named `jwt-linkedin`. The JWT expires in three days. Signup sets the cookie `maxAge` to `3 * 24 * 60 * 60`, and Express reads that as milliseconds, so the cookie lasts a little over four minutes. Login sets the same cookie for three days. The cookie is marked secure when `NODE_ENV` is `production`.

After signup, Mailtrap sends a welcome email whose subject is "Welcome to UnLinked". The link in that email is `CLIENT_URL` plus `/profile/` and the username. A new comment emails the post's author, and an accepted connection emails the person who sent the request. Those links are built the same way, from `CLIENT_URL`.

A profile holds a headline, location, about text, skills, experience, and education. The default headline is "Linkedin User" and the default location is "Earth". Updating a profile picture uploads it to Cloudinary. The banner upload is commented out, so a banner is stored as whatever string was sent. Suggested connections are up to three users you are not already connected to.

The feed is your posts plus posts from your connections. A post is text, an optional image uploaded to Cloudinary, likes, and comments. You can delete your own posts. Liking, commenting, and accepting a connection each write a notification of type `like`, `comment`, or `connectionAccepted`. Notifications can be listed, marked read, or deleted.

A connection request can be sent, accepted, rejected, listed, or removed. Accepting adds each person to the other's `connections` list.

## Run

From the repo root, `dotenv` reads `.env` in that directory:

```
PORT=5001
MONGO_URI=...
JWT_SECRET=...
NODE_ENV=development
CLIENT_URL=...

MAILTRAP_TOKEN=...
EMAIL_FROM=...
EMAIL_FROM_NAME=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

`PORT` falls back to 5001.

```bash
npm install
npm run dev
```

`npm start` runs the same server without nodemon.
