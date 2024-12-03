# Bakery Hub API

## Todo

- [ ] Create routes for bakery info

## Notes

I am using this project to learn the following

- _Authentication_
  - Access token (exp: 15min) with Refresh token (exp: 30d)
  - Cookie settings for prod should include:

```typescript
  {
    httpOnly: true,
    secure: NODE_ENV === 'production' // true
    sameSite: 'lax'
    path: '/'
    domain: NODE_ENV === 'production' ? `.${process.env.DOMAIN}` : "",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
}
```

When using a fetch request, use { credentials: 'include' } to pass the cookies down to the api easily

- Postgres and [Drizzle orm](https://orm.drizzle.team) for Database access

## Routes

### Me

- User Info
- Update my info
- Delete
- Logout of all devices (delete refresh tokens)
- Change password (for email logins)
  Me/Bakery
- Update bakery tables
- Send invites to bakery
- Delete bakery
- Manage products

### Info/Products / Info/Bakeries / Info/Recipes

- Get products and bakeries and recipes

### Auth

- Auth routes
