import { sorter } from '../helpers';

const DrawerLocale = {
  header: {
    searchPlaceholder: 'Search for Assualt, Dundas, etc...',
    sortItems: [
      { name: 'Newest', type: sorter.types.DATE_ASC },
      { name: 'Oldest', type: sorter.types.DATE_DESC },
      { name: 'A-Z', type: sorter.types.ALPHABET_ASC },
      { name: 'Z-A', type: sorter.types.ALPHABET_ASC },
    ],
  },
};

export default DrawerLocale;
