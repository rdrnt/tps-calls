# tps-calls

Real-time mapping of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests,gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.

Built with TypeScript, React, Redux, react-mapbox-gl & styled-components.

## Contributions

I would love contributions! The **TODO** list below has more information on what I need help with.

When commiting, please try your best to use [this](http://karma-runner.github.io/2.0/dev/git-commit-msg.html) format for your commit messages.

## TODO

### UI

- Color code incidents
- Geofencing (if an incident happens within _x_ km the user will receive a push notifcation)
- Add @TPSOperations related tweet to the selected incident. (Hint, there's an associated ID)
- Toast
  - Invalid location

## Building

1. Create a `.sentryclirc, .env, .npmrc` at the root of the project

2. (Building for production) In the `.sentryclirc, put:

```plain
[defaults]
project=getprojectnamefromowner
org=getorgfromowner
```

3. In the `.env`, make sure you have the following keys:

```plain
REACT_APP_MAPBOX_API_KEY

REACT_APP_GANALYTICS_KEY

REACT_APP_SENTRY_DSN
```

4. In the `.npmrc` (required for types), put the following:

```plain
//npm.pkg.github.com/:_authToken=YOUR_GIVEN_TOKEN
@rdrnt:registry=https://npm.pkg.github.com
```

## License

[GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html).
