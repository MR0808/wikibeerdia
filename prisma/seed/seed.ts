import { PrismaClient } from "@prisma/client";
import { Country, State, City } from "country-state-city";

const prisma = new PrismaClient();

async function main() {
  const countries = Country.getAllCountries();
  for (const country of countries) {
    const countryDb = await prisma.country.create({
      data: {
        isoCode: country.isoCode,
        name: country.name,
        currency: country.currency,
      },
    });
    console.log(countryDb.id, countryDb.name);
    const states = State.getStatesOfCountry(country.isoCode);

    for (const state of states) {
      const stateDb = await prisma.state.create({
        data: {
          isoCode: state.isoCode,
          name: state.name,
          countryId: countryDb.id,
        },
      });
      console.log(stateDb.id, stateDb.name);

      const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      for (const city of cities) {
        const cityDb = await prisma.city.create({
          data: {
            name: city.name,
            stateId: stateDb.id,
          },
        });
        console.log(cityDb.id, cityDb.name);
      }
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//     model Country {
//   id        Int    @id @default(autoincrement())
//   isoCode   String
//   name      String
//   currency  String
//   states    State[]
// }

// model State {
//   id        Int    @id @default(autoincrement())
//   isoCode   String
//   name      String
//   country   Country @relation(fields: [countryId], references: [id])
//   countryId Int
// }
