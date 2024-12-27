export default function manifest() {
    return {
        name: "Wikibeerdia",
        short_name: "Wikibeerdia",
        description:
            "Everything you needed to know about beer and things you didn't realise you needed to know!",
        start_url: "/",
        display: "standalone",
        //   background_color: '#fff',
        //   theme_color: '#fff',
        icons: [
            {
                src: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png"
            },
            {
                src: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png"
            },
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    };
}
