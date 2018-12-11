const ModalLocale = {
  networkError: {
    title: 'Uh Oh!',
    description:
      'An error occured when trying to fetch the data from the Toronto Police. Either come back later or you can report it to to contact@rileyyy.com.',
  },
  projectInfo: {
    title: 'About',
    body: [
      {
        heading: 'What is this?',
        description:
          'tpscalls.live is a real-time map of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests, gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.',
      },
      {
        heading: 'I have a suggestion/I found a bug',
        description:
          'I really appreciate feedback and help towards improving the site. If you would like to get in contact, you can find places to reach me below.',
      },
      {
        heading: 'Extras',
        links: [
          {
            title: 'Project Github',
            url: 'https://github.com/rdrnt/tps-calls',
          },
          {
            title: 'Email',
            url: 'mailto:contact@rileyyy.com',
          },
          {
            title: 'Tweet at me',
            url: 'https://twitter.com/onlineriley',
          },
          {
            title: 'Inspiration for the project',
            url: 'https://c4s.torontopolice.on.ca/',
          },
        ],
      },
    ],
  },
};

export default ModalLocale;
