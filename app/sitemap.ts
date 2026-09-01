import type { MetadataRoute } from "next";
import postsData from "@/lib/posts.json";

const BASE_URL = "https://endurodriftbosnien.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const locales = ["de", "en"];

    const staticPaths = [
        "",
        "anmeldung",
        "galerie",
        "reisefuhrer",
        "blog",
        "gastebuch",
        "kontakt",
        "termine",
    ];

    const urls: MetadataRoute.Sitemap = [];

    // Root "/" se preusmjerava na /de (next-intl localePrefix: always), pa ga ne
    // stavljamo u sitemap – u njemu idu samo konacni URL-ovi s canonicalom.

    for (const locale of locales) {
        for (const path of staticPaths) {
            const url =
                path === "" ? `${BASE_URL}/${locale}` : `${BASE_URL}/${locale}/${path}`;

            urls.push({
                url,
                lastModified: now,
                changeFrequency: "weekly",
                priority: path === "" ? 0.9 : 0.7,
            });
        }
    }

    for (const locale of locales) {
        const posts = (postsData as any)[locale] as
            | Array<{ slug: string; date?: string }>
            | undefined;

        if (Array.isArray(posts)) {
            for (const post of posts) {
                urls.push({
                    url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                    lastModified: post.date ? new Date(post.date) : now,
                    changeFrequency: "monthly",
                    priority: 0.6,
                });
            }
        }
    }

    return urls;
}