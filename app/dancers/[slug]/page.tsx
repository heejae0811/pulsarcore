import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Dancer = {
  _id: string;
  name: string;
  englishName?: string;
  role?: string;
  biography?: any;
  instagram?: string;

  profileImage?: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  };

  gallery?: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  }[];

  slug: {
    current: string;
  };
};

const dancerQuery = `
*[
  _type == "dancer" &&
  slug.current == $slug &&
  isActive == true
][0]{
  _id,
  name,
  englishName,
  role,
  biography,
  instagram,
  profileImage,
  gallery,
  slug
}
`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(`
    *[_type=="dancer" && defined(slug.current)]{
      slug
    }
  `);

  return slugs.map((item) => ({
    slug: item.slug.current,
  }));
}

export default async function DancerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dancer: Dancer | null = await client.fetch(dancerQuery, { slug });

  if (!dancer) {
    notFound();
  }

  const profileImage =
    dancer.profileImage?.asset?._ref &&
    urlFor(dancer.profileImage)
      .width(1000)
      .height(1300)
      .fit("crop")
      .auto("format")
      .url();

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">

        <Link
          href="/dancers"
          className="text-sm uppercase tracking-[0.25em] text-white/50 hover:text-white transition"
        >
          ← Back to Dancers
        </Link>

        <div className="mt-14 grid gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">

              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={dancer.profileImage?.alt || dancer.name}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/25">
                  No Image
                </div>
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col">

            <p className="uppercase tracking-[0.3em] text-sm text-white/40">
              {dancer.role}
            </p>

            <h1 className="mt-4 text-5xl md:text-6xl font-light">
              {dancer.englishName || dancer.name}
            </h1>

            {dancer.englishName && (
              <p className="mt-3 text-xl text-white/55">
                {dancer.name}
              </p>
            )}

            <div className="mt-12 prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white">

              {dancer.biography && (
                <PortableText value={dancer.biography} />
              )}

            </div>

            {dancer.instagram && (
              <a
                href={dancer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-block text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition"
              >
                Instagram →
              </a>
            )}

          </div>

        </div>

        {/* Gallery */}

        {dancer.gallery && dancer.gallery.length > 0 && (

          <section className="mt-28">

            <h2 className="mb-10 text-3xl font-light">
              Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              {dancer.gallery.map((image, index) => {

                if (!image.asset?._ref) return null;

                return (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden bg-neutral-900"
                  >
                    <Image
                      src={urlFor(image)
                        .width(700)
                        .height(700)
                        .fit("crop")
                        .auto("format")
                        .url()}
                      alt={image.alt || ""}
                      fill
                      className="object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                );

              })}

            </div>

          </section>

        )}

      </section>
    </main>
  );
}