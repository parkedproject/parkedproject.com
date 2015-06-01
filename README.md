# parkedproject.com

Server for serving Parked Project pages

## Required services

- Redis, for sessions
- RethinkDB, for data

Connection info must be provided by environment variables compatible with
[envigor][].

[envigor]: https://github.com/stuartpb/envigor

## Other environment variables to configure

- `SECRET_KEY_BASE` - should be specified for session security.
- `CANONICAL_HOST` - defaults to `www.parkedproject.com`.
