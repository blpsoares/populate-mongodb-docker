import Chance from 'chance';
const chance = new Chance();

export const generateSimpleDocument = () => ({
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email(),
  phoneNumber: chance.phone(),
  city: chance.city(),
  birthDate: chance.date(),
  profession: chance.profession(),
  company: chance.company(),
  address: chance.address(),
  salary: chance.floating({ min: 30000, max: 100000, fixed: 2 }),
});

export const generateComplexDocument = () => {
  const complexDocument = {
    companyName: chance.company(),
    companyAddress: chance.address(),
    foundingDate: chance.date(),
    ceoName: chance.name(),
    industry: chance.word(),
    financials: {},
    stockPrice: chance.floating({ min: 10, max: 500, fixed: 2 }),
    description: chance.sentence(),
  };

  for (let year = 2019; year <= 2022; year++) {
    complexDocument.financials[`year${year}`] = {
      Q1: chance.floating({ min: 1000, max: 1000000, fixed: 2 }),
      Q2: chance.floating({ min: 1000, max: 1000000, fixed: 2 }),
      Q3: chance.floating({ min: 1000, max: 1000000, fixed: 2 }),
      Q4: chance.floating({ min: 1000, max: 1000000, fixed: 2 }),
    };
  }

  return complexDocument;
};
