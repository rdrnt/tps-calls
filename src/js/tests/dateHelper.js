/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

// import component to test
import { dateHelper } from '../helpers';

const exampleDateFromApi = '2018.02.10 07:22:12';

describe('Date Helper Convert', () => {
  const convertedDate = dateHelper.convert(exampleDateFromApi);
  console.log('convetedDate', convertedDate);
  it(`Should return a converted date`, () => {
    expect(convertedDate).toEqual('l');
  });
});
