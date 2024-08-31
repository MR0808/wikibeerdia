const { PrismaClient } = require('@prisma/client');
const countries = require('./countries.json');
const prisma = new PrismaClient();

async function main() {
    for (const country of countries) {
        const countryDb = await prisma.country.create({
            data: {
                isoCode: country.iso2,
                name: country.name,
                currency: country.currency
            }
        });
        console.log(countryDb.id, countryDb.name);

        for (const state of country.states) {
            const stateDb = await prisma.state.create({
                data: {
                    isoCode: state.state_code,
                    name: state.name,
                    countryId: countryDb.id
                }
            });
            console.log(stateDb.id, stateDb.name);
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
