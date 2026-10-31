// Port Thruster listens on inside the container (HTTP_PORT env in main.ts).
// The image runs as uid 1000, so it must be unprivileged.
export const uiPort = 8080
