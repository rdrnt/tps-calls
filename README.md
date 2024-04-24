# tps-calls

Real-time mapping of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests, gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.

Built with TypeScript, React, Redux, react-mapbox-gl & styled-components.

<a href='https://ko-fi.com/X8X1X9WW7' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Support me on ko-fi.com' /></a>

## API

tpscalls now offers a REST API anyone can use! For more information and details, check out [API.md](https://github.com/rdrnt/tps-calls/API.md).

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

PORT=8080
```

4. In the `.npmrc` (required for types), put the following:

```plain
//npm.pkg.github.com/:_authToken=YOUR_GIVEN_TOKEN
@rdrnt:registry=https://npm.pkg.github.com
```

## Contributions

Contributions are always appreciated! If you would like to get started, please send me an email.

## License

[GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html).
