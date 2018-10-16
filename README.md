# tps-calls

Real-time mapping of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests,gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.

Built with React + Redux + react-map-gl + material-ui.

# Contributions

I would love contributions! The **TODO** list below has more information on what I need help with.

When commiting, please try your best to use [this](http://karma-runner.github.io/2.0/dev/git-commit-msg.html) format for your commit messages.

# TODO

## UI

- Information (what the project is, what does it do, etc)
- Add Creator information (i.e link to Github page, Email, etc)
- Ward Overlay (When the wards change)
- Animation on first load
- Color code incidents
- Geofencing (if an incident happens within _x_ km the user will receive a push notifcation)

## Core

- Ability to download/cache map of the GTA
- Improve map performance
- Store incidents since the start of project (Maybe)

## Other

- Error reporting with Sentry (semi-implemented)
- Mapbox API key in props

# Libraries

[styled-components](https://www.styled-components.com/)

[react-map-gl](https://uber.github.io/react-map-gl/#/Documentation/getting-started/get-started)

[viewport-mercator-project](http://uber-common.github.io/viewport-mercator-project/#/documentation/overview)

[Material-UI](https://material-ui.com/)

[react-arcgis](https://github.com/nicksenger/react-arcgis)

# Notes

[Base design](https://medium.muz.li/map-location-ui-inspiration-6eb9d6b5a99b)

# License

[GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html).
