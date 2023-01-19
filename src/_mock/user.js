import { faker } from '@faker-js/faker';
import { sample } from 'lodash';


const users = [...Array(24)].map((_, index) => ({



  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: "Sammy",
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
  123,
   453,
   536,
   987,
    908,
    346,
   235,
   106,
   547,
   987,
  ]),
}));

export default users;
