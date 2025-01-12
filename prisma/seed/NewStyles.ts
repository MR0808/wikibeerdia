export type StyleType = {
    ParentStyle: string;
    Region: string;
    Style: string;
    Description: string;
    ABVLow: number;
    ABVHigh: number;
    IBULow: number;
    IBUHigh: number;
};

export const newStyles: StyleType[] = [
    {
        ParentStyle: "Lager",
        Region: "Germany, Czech Republic",
        Style: "Pale Lager",
        ABVLow: 4,
        ABVHigh: 6,
        IBULow: 8,
        IBUHigh: 30,
        Description:
            "Light, crisp, and highly carbonated with subtle malt flavors and minimal hop bitterness. Includes styles like Helles and Pilsner. This versatile style is perfect for hot summer days or casual gatherings, offering refreshing simplicity without overwhelming flavors. It's an approachable choice for both seasoned beer lovers and newcomers. Its subtle malt sweetness and clean finish make it a universal favorite, fitting any occasion."
    },
    {
        ParentStyle: "Lager",
        Region: "Germany, Czech Republic",
        Style: "Pilsner",
        ABVLow: 4.2,
        ABVHigh: 5.4,
        IBULow: 25,
        IBUHigh: 45,
        Description:
            "A pale lager with a noticeable hop bitterness and crisp finish. Czech Pilsners are malt-forward with a sweeter profile, while German Pilsners are drier and sharper. Celebrated for their balance and crispness, Pilsners have a heritage that resonates with both traditional and modern beer enthusiasts. Their versatility makes them a staple choice for many occasions, from casual settings to fine dining pairings."
    },
    {
        ParentStyle: "Lager",
        Region: "Germany, Central Europe",
        Style: "Dark Lager",
        ABVLow: 4,
        ABVHigh: 6,
        IBULow: 16,
        IBUHigh: 25,
        Description:
            "Medium to dark brown with roasted malt flavors, mild sweetness, and low bitterness. Smooth and approachable, dark lagers offer richness without the heaviness of stouts. Their nuanced flavors of caramel and light chocolate appeal to those seeking depth and subtlety. These beers are versatile, pairing well with roasted meats and hearty stews."
    },
    {
        ParentStyle: "Lager",
        Region: "Germany",
        Style: "Bock",
        ABVLow: 6,
        ABVHigh: 7.5,
        IBULow: 20,
        IBUHigh: 30,
        Description:
            "A strong lager with malty sweetness, caramel notes, and a smooth finish. Variants include Doppelbock, known for its intense maltiness, Maibock, a lighter springtime version, and Eisbock, which is freeze-concentrated for a robust flavor. Rich and satisfying, Bock styles are a testament to German brewing expertise. Their luxurious flavors make them ideal for sipping on cold winter nights or festive celebrations."
    },
    {
        ParentStyle: "Ales",
        Region: "England, United States",
        Style: "Pale Ale",
        ABVLow: 4.5,
        ABVHigh: 6.2,
        IBULow: 30,
        IBUHigh: 50,
        Description:
            "Balanced beer with moderate hop aroma, citrus or floral notes, and a light toasty malt backbone. English Pale Ales have earthy, herbal characteristics, while American versions are vibrant and hop-forward. Their versatility and broad appeal make them a cornerstone of the ale family. These beers are excellent companions to grilled foods and light appetizers."
    },
    {
        ParentStyle: "Ales",
        Region: "England, United States",
        Style: "India Pale Ale (IPA)",
        ABVLow: 5.5,
        ABVHigh: 7.5,
        IBULow: 40,
        IBUHigh: 70,
        Description:
            "Hop-forward with bold bitterness, often featuring citrus, pine, or tropical fruit flavors. Variants include West Coast IPAs, known for dry, bitter finishes, and New England IPAs, which are hazy and juicy. Double IPAs, also known as Imperial IPAs, amplify these characteristics with higher alcohol content and intense hop aromas, delivering a robust and powerful beer experience. Black IPAs add roasted malt complexity, creating a wide spectrum of flavors. IPAs have become a symbol of craft beer innovation, appealing to adventurous palates."
    },
    {
        ParentStyle: "Ales",
        Region: "England",
        Style: "Porter",
        ABVLow: 4,
        ABVHigh: 6.5,
        IBULow: 20,
        IBUHigh: 40,
        Description:
            "Dark ale with roasted malt flavors, chocolate or coffee notes, and a smooth body. A versatile beer with variations ranging from light and sessionable to bold and robust. Porters are the predecessors to stouts, bridging tradition with contemporary tastes. They pair well with desserts like chocolate cake or rich, savory dishes."
    },
    {
        ParentStyle: "Ales",
        Region: "Ireland, England",
        Style: "Stout",
        ABVLow: 4,
        ABVHigh: 8,
        IBULow: 30,
        IBUHigh: 50,
        Description:
            "Dark, rich ale with flavors of roasted barley, coffee, and chocolate. Styles include Dry Stouts like Guinness, Milk Stouts with added sweetness, and Imperial Stouts for a luxurious, high-alcohol experience. Their depth makes them ideal for savoring slowly. Stouts are also great for pairing with oysters or hearty stews, offering a rich culinary experience."
    },
    {
        ParentStyle: "Ales",
        Region: "England, United States",
        Style: "Brown Ale",
        ABVLow: 4,
        ABVHigh: 6.5,
        IBULow: 20,
        IBUHigh: 30,
        Description:
            "Malt-forward with flavors of caramel, nuts, and a hint of chocolate. English Brown Ales are more restrained and balanced, while American versions are often hoppier and more robust. A satisfying choice for those who appreciate malt complexity. Brown ales are versatile and pair well with roasted chicken, pork, or nutty desserts."
    },
    {
        ParentStyle: "Ales",
        Region: "Global",
        Style: "Dark Ale",
        ABVLow: 4.5,
        ABVHigh: 7.5,
        IBULow: 20,
        IBUHigh: 50,
        Description:
            "A broad category that includes richly flavored ales with roasted malt profiles. From the smoky notes of some Scottish ales to the deep caramel of English styles, Dark Ales offer a range of experiences for those seeking something bold. These beers complement grilled meats and smoky barbecue dishes."
    },
    {
        ParentStyle: "Ales",
        Region: "Germany, Belgium, United States",
        Style: "Wheat Beer",
        ABVLow: 4,
        ABVHigh: 5.5,
        IBULow: 10,
        IBUHigh: 25,
        Description:
            "Light, refreshing beer with a creamy texture. German Hefeweizen showcases banana and clove flavors, while Belgian Witbier adds orange peel and coriander for a zesty profile. American Wheat Beers often feature a cleaner, crisper finish."
    },
    {
        ParentStyle: "Ales",
        Region: "Germany",
        Style: "Kolsch",
        ABVLow: 4.4,
        ABVHigh: 5.2,
        IBULow: 18,
        IBUHigh: 30,
        Description:
            "A hybrid style that combines the clean, crisp characteristics of a lager with the subtle fruitiness of an ale. Originating in Cologne, it is light-bodied, with delicate hop bitterness and a smooth finish. Kolsch is best enjoyed fresh and pairs beautifully with light dishes like salads and seafood."
    },
    {
        ParentStyle: "Ales",
        Region: "England",
        Style: "ESB (Extra Special Bitter)",
        ABVLow: 4.6,
        ABVHigh: 6.2,
        IBULow: 30,
        IBUHigh: 50,
        Description:
            "A well-balanced ale with a malt-forward character complemented by moderate hop bitterness. Known for its caramel and biscuit-like malt flavors, ESBs are a quintessential English style with a harmonious profile. They are versatile beers that pair well with roast meats and hearty pies."
    },
    {
        ParentStyle: "Ales",
        Region: "Germany",
        Style: "Dunkelweizen",
        ABVLow: 4.3,
        ABVHigh: 5.6,
        IBULow: 10,
        IBUHigh: 20,
        Description:
            "A dark wheat beer with flavors of banana, clove, and caramel, offering a richer and more malty alternative to traditional Hefeweizens. Its smooth and creamy texture makes it a unique choice within the wheat beer family. Dunkelweizens are delightful with sausages and pretzels."
    },
    {
        ParentStyle: "Ales",
        Region: "Poland",
        Style: "Grodziskie",
        ABVLow: 2.5,
        ABVHigh: 3.5,
        IBULow: 20,
        IBUHigh: 35,
        Description:
            "A light, smoky wheat beer with a slightly tart finish. Historically brewed with oakGer-smoked wheat malt, Grodziskie is highly carbonated and refreshing, with a unique flavor profile that stands out among traditional beers. Perfect for pairing with smoked cheeses and meats."
    },
    {
        ParentStyle: "Ales",
        Region: "Germany",
        Style: "Kristallweizen",
        ABVLow: 4.5,
        ABVHigh: 5.5,
        IBULow: 10,
        IBUHigh: 15,
        Description:
            "A filtered version of Hefeweizen, resulting in a clear beer with the same refreshing flavors of banana and clove. Its sparkling appearance and clean taste make it a popular choice for warm weather. Enjoy Kristallweizen with seafood or fresh fruit."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "Belgium",
        Style: "Saison",
        ABVLow: 5,
        ABVHigh: 8,
        IBULow: 20,
        IBUHigh: 35,
        Description:
            "Farmhouse ale with fruity, spicy, and earthy notes, often dry and highly carbonated. Originally brewed for Belgian farm workers, modern Saisons showcase a range of flavors from peppery spice to bright citrus. They are versatile and pair well with a variety of foods, from cheese to grilled meats."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "Belgium, Netherlands, USA",
        Style: "Trappist Beers",
        ABVLow: 6,
        ABVHigh: 12,
        IBULow: 15,
        IBUHigh: 40,
        Description:
            "Beers brewed within Trappist monasteries, following strict guidelines. Styles include Dubbel (rich, malty, with dark fruit notes), Tripel (golden, spicy, and fruity with high carbonation), and Quadrupel (intense, with complex flavors of caramel, raisin, and toffee). Renowned for their quality and craftsmanship, Trappist beers are often regarded as benchmarks of excellence in brewing."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "Belgium, United States",
        Style: "Sour Beer",
        ABVLow: 3,
        ABVHigh: 7,
        IBULow: 5,
        IBUHigh: 30,
        Description:
            "Tart and acidic, with fruity or funky flavors. Includes Lambic, spontaneously fermented with wild yeast; Gueuze, a blend of aged and young Lambics; and Berliner Weisse, a light, effervescent sour. Each offers a refreshing departure from traditional beer styles."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "England, United States",
        Style: "Barleywine",
        ABVLow: 8,
        ABVHigh: 12,
        IBULow: 40,
        IBUHigh: 100,
        Description:
            "Strong ale with intense malt sweetness, caramel, and dried fruit flavors, balanced by robust hop bitterness. English versions are maltier, while American styles are hoppier and bolder. A complex and warming choice for special occasions, Barleywines age well, developing even greater depth over time."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "Global",
        Style: "Fruit Beer",
        ABVLow: 4,
        ABVHigh: 7,
        IBULow: 10,
        IBUHigh: 30,
        Description:
            "Infused with fruit flavors, showcasing natural sweetness or tartness. From raspberry ales to cherry stouts, these beers highlight creativity and innovation, offering something unique for adventurous drinkers."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "Global",
        Style: "Spiced/Herbed Beer",
        ABVLow: 4.5,
        ABVHigh: 9,
        IBULow: 10,
        IBUHigh: 40,
        Description:
            "Beers brewed with spices or herbs like ginger, cinnamon, or rosemary for unique profiles. Popular during holidays, these beers can evoke festive memories and create an immersive experience with warming spices and seasonal ingredients."
    },
    {
        ParentStyle: "Specialty Beers",
        Region: "United States",
        Style: "California Common",
        ABVLow: 4.5,
        ABVHigh: 5.5,
        IBULow: 30,
        IBUHigh: 45,
        Description:
            "A hybrid style also known as Steam Beer, combining lager yeast with warmer fermentation temperatures. It features a balanced profile of toasted malt and subtle hop bitterness. This historic style is synonymous with American brewing ingenuity and pairs well with grilled foods."
    },
    {
        ParentStyle: "Regional Styles",
        Region: "Belgium",
        Style: "Belgium Dubbel",
        ABVLow: 6,
        ABVHigh: 8,
        IBULow: 15,
        IBUHigh: 25,
        Description:
            "Rich, malty ale with flavors of dark fruit, caramel, and a slightly spicy yeast character. Often brewed by Trappist monasteries, Dubbels embody centuries of Belgian brewing tradition and are a hallmark of craftmanship."
    },
    {
        ParentStyle: "Regional Styles",
        Region: "United States",
        Style: "American Amber Ale",
        ABVLow: 4.5,
        ABVHigh: 6.2,
        IBULow: 25,
        IBUHigh: 40,
        Description:
            "Balanced ale with caramel malt flavors and moderate hop bitterness. A staple of the American craft beer movement, this style bridges the gap between pale ales and darker beers, offering balance and versatility."
    },
    {
        ParentStyle: "Regional Styles",
        Region: "Germany",
        Style: "Gose",
        ABVLow: 4,
        ABVHigh: 5,
        IBULow: 5,
        IBUHigh: 15,
        Description:
            "A sour wheat beer with a touch of salt and coriander, offering a tart and refreshing experience. Originating from Leipzig, Gose is a historic style experiencing a resurgence, celebrated for its unique profile and quenching quality."
    },
    {
        ParentStyle: "Unique and Hybrid Styles",
        Region: "United States",
        Style: "Brut IPA",
        ABVLow: 6,
        ABVHigh: 7.5,
        IBULow: 20,
        IBUHigh: 40,
        Description:
            "A dry, sparkling IPA with minimal residual sweetness and effervescent carbonation, inspired by Champagne. Typically showcases bright fruit or hop flavors with a crisp finish."
    },
    {
        ParentStyle: "Unique and Hybrid Styles",
        Region: "United States",
        Style: "Cream Ale",
        ABVLow: 4.2,
        ABVHigh: 5.6,
        IBULow: 8,
        IBUHigh: 20,
        Description:
            "Light-bodied ale with a smooth, slightly sweet malt flavor and low hop bitterness. Often brewed with adjuncts like corn or rice for added smoothness. Easy-drinking and perfect for casual occasions."
    },
    {
        ParentStyle: "Unique and Hybrid Styles",
        Region: "Global",
        Style: "Rye Beer",
        ABVLow: 4,
        ABVHigh: 7,
        IBULow: 20,
        IBUHigh: 50,
        Description:
            "Brewed with rye malt, offering spicy, dry, and earthy characteristics. Found in various styles, including Rye IPAs or Rye Porters, these beers add complexity to the base profile."
    },
    {
        ParentStyle: "Unique and Hybrid Styles",
        Region: "Eastern Europe",
        Style: "Kvass",
        ABVLow: 0.5,
        ABVHigh: 2,
        IBULow: 5,
        IBUHigh: 10,
        Description:
            "A low-alcohol, bread-based beverage traditionally brewed with rye bread, sugar, and yeast. Lightly carbonated, with sweet and tangy flavors, it�s often considered a beer alternative."
    },
    {
        ParentStyle: "Unique and Hybrid Styles",
        Region: "Germany",
        Style: "Smoke Beer (Rauchbier)",
        ABVLow: 4.5,
        ABVHigh: 6.5,
        IBULow: 20,
        IBUHigh: 30,
        Description:
            "Distinct smoky aroma and flavor from malt dried over an open flame. Common in Bamberg, Germany, this style pairs well with hearty, grilled foods."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Pale Ale",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 15,
        IBUHigh: 30,
        Description:
            "Delivers the hoppy bitterness and citrusy notes of traditional pale ales without the alcohol. Crafted to provide a full-flavored experience, these beers are ideal for IPA enthusiasts who prefer non-alcoholic options. They pair well with spicy dishes and casual snacks, making them versatile and approachable."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Lager",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 5,
        IBUHigh: 15,
        Description:
            "Brewed to mimic the crisp and clean qualities of standard lagers. Perfect for those seeking a classic beer-drinking experience without the alcohol. Non-alcoholic lagers offer the same refreshing simplicity and are excellent choices for any occasion, from casual barbecues to relaxing at home."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Stout",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 20,
        IBUHigh: 40,
        Description:
            "Combines the rich flavors of coffee, chocolate, and roasted malt with a smooth and creamy body, but without the alcohol. Non-alcoholic stouts are ideal for pairing with desserts like chocolate cake or for savoring on their own as a comforting treat."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Wheat Beer",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 10,
        IBUHigh: 20,
        Description:
            "Offers the creamy texture and fruity flavors characteristic of wheat beers, such as banana and clove, but with negligible alcohol content. Non-alcoholic wheat beers are refreshing and perfect for summer picnics or light meals."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic IPA",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 30,
        IBUHigh: 60,
        Description:
            "A bold and hop-forward beer that replicates the intensity of a standard IPA, featuring flavors like citrus, pine, and tropical fruits. These beers are crafted for hop enthusiasts who want the punch of an IPA without alcohol."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Sour Ale",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 5,
        IBUHigh: 15,
        Description:
            "A tart and refreshing beer style that balances sourness with subtle fruity or herbal notes. Perfect for those looking for a zesty, alcohol-free option that pairs well with light salads or seafood."
    },
    {
        ParentStyle: "Non-Alcoholic Beers",
        Region: "Global",
        Style: "Non-Alcoholic Specialty Beers",
        ABVLow: 0,
        ABVHigh: 0.5,
        IBULow: 10,
        IBUHigh: 100,
        Description:
            "Includes experimental and fruit-infused beers that push the boundaries of traditional non-alcoholic brewing. These beers often feature innovative flavor combinations, appealing to adventurous drinkers who want variety without alcohol."
    },
    {
        ParentStyle: "Low-Alcohol Beers",
        Region: "Global",
        Style: "Non-Alcoholic Pale Ale",
        ABVLow: 0.5,
        ABVHigh: 3.5,
        IBULow: 15,
        IBUHigh: 30,
        Description:
            "Retains the hop-forward character of traditional pale ales with a reduced alcohol content. Light and flavorful, these beers are perfect for those who enjoy the refreshing bitterness and citrusy notes of pale ales without the higher alcohol impact."
    },
    {
        ParentStyle: "Low-Alcohol Beers",
        Region: "Global",
        Style: "Non-Alcoholic Lager",
        ABVLow: 0.5,
        ABVHigh: 3.5,
        IBULow: 5,
        IBUHigh: 20,
        Description:
            "Crisp and clean, low-alcohol lagers provide the refreshing qualities of their full-strength counterparts. Ideal for warm days and extended social gatherings, they offer a light, easy-drinking experience."
    },
    {
        ParentStyle: "Low-Alcohol Beers",
        Region: "Global",
        Style: "Non-Alcoholic Wheat Beer",
        ABVLow: 0.5,
        ABVHigh: 3.5,
        IBULow: 10,
        IBUHigh: 20,
        Description:
            "Combines the creamy texture and fruity flavors of wheat beer with a lower alcohol content. These beers are perfect for summer picnics and casual settings."
    },
    {
        ParentStyle: "Low-Alcohol Beers",
        Region: "Global",
        Style: "Session IPA",
        ABVLow: 3,
        ABVHigh: 4,
        IBULow: 30,
        IBUHigh: 50,
        Description:
            "A low-alcohol version of the IPA, offering bold hop flavors with a lighter body and lower ABV. Great for long-lasting sessions without sacrificing taste."
    },
    {
        ParentStyle: "Low-Alcohol Beers",
        Region: "Global",
        Style: "Specialty Low-Alcohol Beers",
        ABVLow: 0.5,
        ABVHigh: 3.5,
        IBULow: 10,
        IBUHigh: 100,
        Description:
            "Specialty low-alcohol beers include fruit-infused styles, sour ales, and experimental brews that emphasize flavor innovation while keeping alcohol content minimal. These beers cater to a growing audience seeking creative and flavorful options with lower alcohol impact."
    }
];
