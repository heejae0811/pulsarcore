import Image from 'next/image'
import Link from 'next/link'

import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'

type Dancer = {
  _id: string
  name: string
  englishName?: string
  role?: string
  shortBio?: string
  profileImage?: {
    asset?: {
      _ref?: string
    }
    alt?: string
  }
  slug?: {
    current: string
  }
}

const dancersQuery = `
  *[
    _type == "dancer" &&
    isActive == true
  ] | order(order asc) {
    _id,
    name,
    englishName,
    role,
    shortBio,
    profileImage,
    slug
  }
`

export default async function DancersPage() {
  const dancers: Dancer[] = await client.fetch(dancersQuery)

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50">
            Artists
          </p>

          <h1 className="text-5xl font-light tracking-tight md:text-7xl">
            Dancers
          </h1>
        </div>

        {dancers.length === 0 ? (
          <p className="text-white/60">등록된 무용수가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {dancers.map((dancer) => (
              <article key={dancer._id} className="group">
                {dancer.slug?.current ? (
                  <Link href={`/dancers/${dancer.slug.current}`}>
                    <DancerCard dancer={dancer} />
                  </Link>
                ) : (
                  <DancerCard dancer={dancer} />
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function DancerCard({dancer}: {dancer: Dancer}) {
  const imageUrl = dancer.profileImage
    ? urlFor(dancer.profileImage).width(900).height(1200).url()
    : null

  return (
    <>
      <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={dancer.profileImage?.alt || dancer.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/30">
            No image
          </div>
        )}
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-light">
              {dancer.englishName || dancer.name}
            </h2>

            {dancer.englishName && (
              <p className="mt-1 text-sm text-white/50">{dancer.name}</p>
            )}
          </div>

          {dancer.role && (
            <p className="pt-1 text-xs uppercase tracking-[0.18em] text-white/45">
              {dancer.role}
            </p>
          )}
        </div>

        {dancer.shortBio && (
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/60">
            {dancer.shortBio}
          </p>
        )}
      </div>
    </>
  )
}