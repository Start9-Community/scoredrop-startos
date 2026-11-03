# Scoredrop

## Documentation

- [Scoredrop README](https://github.com/martinbarilik/scoredrop/blob/main/README.md) — the pages, settings, team slugs, and how notifications are triggered.
- [ntfy documentation](https://docs.ntfy.sh) — subscribing to a topic on your phone or desktop, and running your own ntfy server.

## What you get on StartOS

Scoredrop's web interface, protected by a password StartOS generates for you. Your settings, subscriptions, and match history are included in your StartOS backups.

Scoredrop needs an ntfy server to deliver notifications to. You can use the public `https://ntfy.sh`, or install ntfy on this server from the marketplace.

## Getting set up

1. Run the **Set Web Interface Password** task. Save the username and password it shows you.
2. Start Scoredrop and open the **Web Interface**. Sign in with those credentials.
3. On **Settings**, enter your ntfy server URL and a topic, choose which events notify you, and save.
4. Subscribe to the same topic in the ntfy app on your phone.
5. On **Browse teams**, pick a league and subscribe to the teams you follow. Check a slug with **Verify a slug** before subscribing to it.

## Using Scoredrop

### Web interface

**Subscriptions** shows your teams, their tracked matches, and when Scoredrop last polled. **Browse teams** adds and removes teams, and **Settings** holds your ntfy server and notification choices. Changes apply on the next poll, without a restart.

### Actions

- **Reset Web Interface Password** — generates a new password and shows it once. The old password stops working immediately.

### Connections Scoredrop makes

Scoredrop fetches fixtures from sportscore.com, the NHL, and HockeySlovakia, and publishes to your ntfy server. If you publish Scoredrop through a tunnel to keep your home IP private, send its outbound traffic through that tunnel too, or those sites see your home IP. If you use a tunnel for another reason, there is nothing to change.
