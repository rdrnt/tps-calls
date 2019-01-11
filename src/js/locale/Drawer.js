import { sorter } from '../helpers';

const DrawerLocale = {
  header: {
    searchPlaceholder: 'Search for Assualt, Dundas, etc...',
    sortItems: [
      { name: 'Newest', type: sorter.types.DATE_ASC, iconName: 'New' },
      { name: 'Oldest', type: sorter.types.DATE_DESC, iconName: 'Back' },
      { name: 'A-Z', type: sorter.types.ALPHABET_ASC, iconName: 'AlphaDown' },
      { name: 'Z-A', type: sorter.types.ALPHABET_DESC, iconName: 'AlphaUp' },
    ],
  },
};

export default DrawerLocale;
