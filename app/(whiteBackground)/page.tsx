import { getStylesByRandom } from "@/actions/beerStyles";
import Hero from "@/components/home/Hero";

const HomePage = async () => {
    const { styles } = await getStylesByRandom();

    const stylesArray = styles
        ? styles.map((style) => {
              return style.name;
          })
        : ["Lager", "Pale Ale", "Stout", "Sour"];

    return (
        <>
            <Hero styles={stylesArray} />
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
                debitis quasi aspernatur placeat sunt voluptates! Aliquid,
                corporis! Obcaecati omnis, quia, facere assumenda porro
                officiis, rem placeat eum laboriosam quidem expedita accusantium
                id sint ea aliquid? Modi earum asperiores voluptatem, ea
                accusantium temporibus, unde facilis ratione, sequi corrupti
                ipsa itaque? Dignissimos vero, quis magnam, dolor cum quam ullam
                voluptatem enim cumque minima repellat dolore, exercitationem a
                obcaecati temporibus dolorum quibusdam! Tempore dolore accusamus
                placeat cupiditate assumenda. Minus, optio id quidem voluptate
                aliquam provident nostrum cumque, a velit aut nulla odit quae
                harum fuga incidunt sapiente repellendus sunt. Perspiciatis
                assumenda ut id molestiae optio velit ad quasi distinctio,
                quibusdam, deleniti a laborum, dolor harum omnis accusamus?
                Quibusdam beatae officia facere vel, tempora dignissimos impedit
                eius ducimus dolorum ipsa iusto, autem fugiat voluptate est
                doloribus suscipit velit, delectus labore odio. Quisquam
                eligendi inventore nulla doloremque! Corrupti quod est voluptate
                consectetur sed ipsum minima. Quis reprehenderit porro officia
                recusandae tempore asperiores, nobis dolorum cum repellendus
                corporis eveniet odit sed. Quos dolore odit mollitia accusantium
                maiores quaerat excepturi dolores voluptas vero, dignissimos
                corrupti vitae accusamus labore possimus minus quibusdam
                assumenda inventore porro. Ratione alias quis maiores optio!
                Dolorem, reiciendis corporis optio esse quidem earum aliquam
                magnam distinctio illo nulla nam autem aut molestias quibusdam
                quis hic voluptatibus error fuga cupiditate quas alias,
                voluptatem possimus. Officia molestiae quae ea dicta aut itaque
                voluptates et architecto exercitationem a aperiam obcaecati
                labore eligendi assumenda maxime tempore eveniet pariatur fuga
                incidunt consequuntur, saepe iusto. Fugiat ab quisquam officia
                ducimus sequi deserunt porro et consectetur doloribus est quasi
                dolore eum labore, eos temporibus. Harum voluptatem placeat
                voluptatibus magnam quod debitis expedita eveniet ducimus ipsam
                aliquam dignissimos quae omnis, tempore perferendis ut amet
                quibusdam deleniti repellat alias quia consequuntur ea illum
                possimus perspiciatis. Cum, officia facilis, sit accusantium
                tempore fugit ad voluptate pariatur provident hic magnam!
                Delectus nulla eligendi error voluptatibus rem quo officia eos
                ullam nam porro impedit, laudantium, mollitia harum.
                Dignissimos, eum ipsum illo quo ipsam laborum? Corporis vero
                voluptates soluta magnam dolores molestiae quaerat, asperiores
                fuga inventore cupiditate. Veniam beatae nihil sunt doloremque
                temporibus nemo quibusdam quia quasi excepturi id, laborum
                distinctio. Nostrum reiciendis eius ex, dignissimos recusandae
                nihil aliquam blanditiis molestias ab quos voluptas eaque!
                Voluptates laborum, fuga odit dolores impedit incidunt minus
                distinctio quis voluptas dolorem minima deserunt! Nemo quam,
                possimus nostrum, molestias nobis dolorem tempora explicabo
                velit quasi minima distinctio officia! Libero impedit explicabo
                nulla recusandae illo provident consequatur odio magnam sint
                fuga eius, magni doloremque inventore excepturi repellat quis,
                consequuntur suscipit fugiat eos quae debitis esse
                necessitatibus soluta. Doloribus quod laboriosam magni sint
                voluptatibus optio fugit deleniti saepe quo, iusto autem at quos
                itaque delectus incidunt eos, alias explicabo facilis, nisi
                porro! Officia porro laudantium aut accusantium saepe ad autem
                aliquid cupiditate commodi modi, unde blanditiis, ab illo
                corrupti rem sed repellat, ratione assumenda eaque repudiandae
                sequi doloribus est! Id natus vitae ipsum ab sed voluptas
                temporibus laudantium perspiciatis repellat delectus facere
                tenetur commodi ex exercitationem dolorem cumque soluta nulla,
                maxime illo, aliquam fugit.
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
                debitis quasi aspernatur placeat sunt voluptates! Aliquid,
                corporis! Obcaecati omnis, quia, facere assumenda porro
                officiis, rem placeat eum laboriosam quidem expedita accusantium
                id sint ea aliquid? Modi earum asperiores voluptatem, ea
                accusantium temporibus, unde facilis ratione, sequi corrupti
                ipsa itaque? Dignissimos vero, quis magnam, dolor cum quam ullam
                voluptatem enim cumque minima repellat dolore, exercitationem a
                obcaecati temporibus dolorum quibusdam! Tempore dolore accusamus
                placeat cupiditate assumenda. Minus, optio id quidem voluptate
                aliquam provident nostrum cumque, a velit aut nulla odit quae
                harum fuga incidunt sapiente repellendus sunt. Perspiciatis
                assumenda ut id molestiae optio velit ad quasi distinctio,
                quibusdam, deleniti a laborum, dolor harum omnis accusamus?
                Quibusdam beatae officia facere vel, tempora dignissimos impedit
                eius ducimus dolorum ipsa iusto, autem fugiat voluptate est
                doloribus suscipit velit, delectus labore odio. Quisquam
                eligendi inventore nulla doloremque! Corrupti quod est voluptate
                consectetur sed ipsum minima. Quis reprehenderit porro officia
                recusandae tempore asperiores, nobis dolorum cum repellendus
                corporis eveniet odit sed. Quos dolore odit mollitia accusantium
                maiores quaerat excepturi dolores voluptas vero, dignissimos
                corrupti vitae accusamus labore possimus minus quibusdam
                assumenda inventore porro. Ratione alias quis maiores optio!
                Dolorem, reiciendis corporis optio esse quidem earum aliquam
                magnam distinctio illo nulla nam autem aut molestias quibusdam
                quis hic voluptatibus error fuga cupiditate quas alias,
                voluptatem possimus. Officia molestiae quae ea dicta aut itaque
                voluptates et architecto exercitationem a aperiam obcaecati
                labore eligendi assumenda maxime tempore eveniet pariatur fuga
                incidunt consequuntur, saepe iusto. Fugiat ab quisquam officia
                ducimus sequi deserunt porro et consectetur doloribus est quasi
                dolore eum labore, eos temporibus. Harum voluptatem placeat
                voluptatibus magnam quod debitis expedita eveniet ducimus ipsam
                aliquam dignissimos quae omnis, tempore perferendis ut amet
                quibusdam deleniti repellat alias quia consequuntur ea illum
                possimus perspiciatis. Cum, officia facilis, sit accusantium
                tempore fugit ad voluptate pariatur provident hic magnam!
                Delectus nulla eligendi error voluptatibus rem quo officia eos
                ullam nam porro impedit, laudantium, mollitia harum.
                Dignissimos, eum ipsum illo quo ipsam laborum? Corporis vero
                voluptates soluta magnam dolores molestiae quaerat, asperiores
                fuga inventore cupiditate. Veniam beatae nihil sunt doloremque
                temporibus nemo quibusdam quia quasi excepturi id, laborum
                distinctio. Nostrum reiciendis eius ex, dignissimos recusandae
                nihil aliquam blanditiis molestias ab quos voluptas eaque!
                Voluptates laborum, fuga odit dolores impedit incidunt minus
                distinctio quis voluptas dolorem minima deserunt! Nemo quam,
                possimus nostrum, molestias nobis dolorem tempora explicabo
                velit quasi minima distinctio officia! Libero impedit explicabo
                nulla recusandae illo provident consequatur odio magnam sint
                fuga eius, magni doloremque inventore excepturi repellat quis,
                consequuntur suscipit fugiat eos quae debitis esse
                necessitatibus soluta. Doloribus quod laboriosam magni sint
                voluptatibus optio fugit deleniti saepe quo, iusto autem at quos
                itaque delectus incidunt eos, alias explicabo facilis, nisi
                porro! Officia porro laudantium aut accusantium saepe ad autem
                aliquid cupiditate commodi modi, unde blanditiis, ab illo
                corrupti rem sed repellat, ratione assumenda eaque repudiandae
                sequi doloribus est! Id natus vitae ipsum ab sed voluptas
                temporibus laudantium perspiciatis repellat delectus facere
                tenetur commodi ex exercitationem dolorem cumque soluta nulla,
                maxime illo, aliquam fugit.
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
                debitis quasi aspernatur placeat sunt voluptates! Aliquid,
                corporis! Obcaecati omnis, quia, facere assumenda porro
                officiis, rem placeat eum laboriosam quidem expedita accusantium
                id sint ea aliquid? Modi earum asperiores voluptatem, ea
                accusantium temporibus, unde facilis ratione, sequi corrupti
                ipsa itaque? Dignissimos vero, quis magnam, dolor cum quam ullam
                voluptatem enim cumque minima repellat dolore, exercitationem a
                obcaecati temporibus dolorum quibusdam! Tempore dolore accusamus
                placeat cupiditate assumenda. Minus, optio id quidem voluptate
                aliquam provident nostrum cumque, a velit aut nulla odit quae
                harum fuga incidunt sapiente repellendus sunt. Perspiciatis
                assumenda ut id molestiae optio velit ad quasi distinctio,
                quibusdam, deleniti a laborum, dolor harum omnis accusamus?
                Quibusdam beatae officia facere vel, tempora dignissimos impedit
                eius ducimus dolorum ipsa iusto, autem fugiat voluptate est
                doloribus suscipit velit, delectus labore odio. Quisquam
                eligendi inventore nulla doloremque! Corrupti quod est voluptate
                consectetur sed ipsum minima. Quis reprehenderit porro officia
                recusandae tempore asperiores, nobis dolorum cum repellendus
                corporis eveniet odit sed. Quos dolore odit mollitia accusantium
                maiores quaerat excepturi dolores voluptas vero, dignissimos
                corrupti vitae accusamus labore possimus minus quibusdam
                assumenda inventore porro. Ratione alias quis maiores optio!
                Dolorem, reiciendis corporis optio esse quidem earum aliquam
                magnam distinctio illo nulla nam autem aut molestias quibusdam
                quis hic voluptatibus error fuga cupiditate quas alias,
                voluptatem possimus. Officia molestiae quae ea dicta aut itaque
                voluptates et architecto exercitationem a aperiam obcaecati
                labore eligendi assumenda maxime tempore eveniet pariatur fuga
                incidunt consequuntur, saepe iusto. Fugiat ab quisquam officia
                ducimus sequi deserunt porro et consectetur doloribus est quasi
                dolore eum labore, eos temporibus. Harum voluptatem placeat
                voluptatibus magnam quod debitis expedita eveniet ducimus ipsam
                aliquam dignissimos quae omnis, tempore perferendis ut amet
                quibusdam deleniti repellat alias quia consequuntur ea illum
                possimus perspiciatis. Cum, officia facilis, sit accusantium
                tempore fugit ad voluptate pariatur provident hic magnam!
                Delectus nulla eligendi error voluptatibus rem quo officia eos
                ullam nam porro impedit, laudantium, mollitia harum.
                Dignissimos, eum ipsum illo quo ipsam laborum? Corporis vero
                voluptates soluta magnam dolores molestiae quaerat, asperiores
                fuga inventore cupiditate. Veniam beatae nihil sunt doloremque
                temporibus nemo quibusdam quia quasi excepturi id, laborum
                distinctio. Nostrum reiciendis eius ex, dignissimos recusandae
                nihil aliquam blanditiis molestias ab quos voluptas eaque!
                Voluptates laborum, fuga odit dolores impedit incidunt minus
                distinctio quis voluptas dolorem minima deserunt! Nemo quam,
                possimus nostrum, molestias nobis dolorem tempora explicabo
                velit quasi minima distinctio officia! Libero impedit explicabo
                nulla recusandae illo provident consequatur odio magnam sint
                fuga eius, magni doloremque inventore excepturi repellat quis,
                consequuntur suscipit fugiat eos quae debitis esse
                necessitatibus soluta. Doloribus quod laboriosam magni sint
                voluptatibus optio fugit deleniti saepe quo, iusto autem at quos
                itaque delectus incidunt eos, alias explicabo facilis, nisi
                porro! Officia porro laudantium aut accusantium saepe ad autem
                aliquid cupiditate commodi modi, unde blanditiis, ab illo
                corrupti rem sed repellat, ratione assumenda eaque repudiandae
                sequi doloribus est! Id natus vitae ipsum ab sed voluptas
                temporibus laudantium perspiciatis repellat delectus facere
                tenetur commodi ex exercitationem dolorem cumque soluta nulla,
                maxime illo, aliquam fugit.
            </p>
        </>
    );
};
export default HomePage;
