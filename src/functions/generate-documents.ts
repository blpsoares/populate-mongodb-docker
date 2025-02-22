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
    financials: { yearlyRevenue: {} },
    stockPrice: chance.floating({ min: 10, max: 500, fixed: 2 }),
    description: chance.sentence(),
  };

  for (let j = 1; j <= 4; j++) {
    complexDocument.financials[`year${2018 + j}`] = {};
    for (let k = 1; k <= 5; k++) {
      complexDocument.financials[`year${2018 + j}`][`Q${k}`] = chance.floating({
        min: 1000,
        max: 1000000,
        fixed: 2,
      });
    }
  }

  return complexDocument;
};
