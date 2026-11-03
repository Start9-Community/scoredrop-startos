// Thruster listens here (HTTP_PORT); the image runs as uid 1000, so it must be unprivileged.
export const uiPort = 8080

export const uiUsername = 'admin'
export const randomPassword = { charset: 'a-z,A-Z,0-9', len: 32 }
