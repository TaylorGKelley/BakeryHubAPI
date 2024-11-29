# Bakery Hub API

## Todo

- [ ] Create routes for bakery info

## Notes

I am using this project to learn the following

- Clean Architecture principles [ref: Medium post regarding Clean Architecture](https://medium.com/@deivisonisidoro_94304/revolutionizing-software-development-unveiling-the-power-of-clean-architecture-with-typescript-5ee968357d35)
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
