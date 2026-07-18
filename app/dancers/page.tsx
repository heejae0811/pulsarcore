import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Dancer = {
  _id: string;
  name: string;
  englishName?: string;
  role?: string;
  shortBio?: string;
  profileImage?: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  };
  slug?: {
    current?: string;
  };
};

const dancersQuery = `
  *[
    _type == "dancer" &&
    isActive == true &&
    defined(slug.current)
  ] | order(order asc) {
    _id,
    name,
    englishName,
    role,
    shortBio,
    profileImage,
    slug
  }
`;

export default async function DancersPage() {
  const dancers: Dancer[] = await client.fetch(dancersQuery);

  return (
    <main className="dancers-page">
      <section className="subpage-hero">
        <p className="page-eyebrow">Dancers</p>

        <h1>
          각자의 빛으로
          <br />
          하나의 파동을 만듭니다.
        </h1>

        <p>
          인물을 선택하면 무용수의 사진, 활동 이야기와 공연
          영상을 볼 수 있습니다.
        </p>
      </section>

      <section className="dancer-list-section">
        <div className="dancer-list">
          {dancers.length === 0 ? (
            <p className="empty-list-message">
              등록된 무용수가 없습니다.
            </p>
          ) : (
            dancers.map((dancer, index) => {
              const slug = dancer.slug?.current;

              const imageUrl = dancer.profileImage?.asset?._ref
                ? urlFor(dancer.profileImage)
                    .width(1000)
                    .height(1300)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null;

              if (!slug) {
                return null;
              }

              return (
                <Link
                  key={dancer._id}
                  href={`/dancers/${slug}`}
                  className="dancer-list-card"
                >
                  <div className="dancer-list-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="dancer-list-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          dancer.profileImage?.alt ||
                          dancer.name
                        }
                      />
                    ) : (
                      <div className="dancer-image-placeholder">
                        No image
                      </div>
                    )}

                    <div className="dancer-list-hover">
                      <span>View profile</span>
                      <span>↗</span>
                    </div>
                  </div>

                  <div className="dancer-list-information">
                    <p>{dancer.role || "Dancer"}</p>

                    <h2>
                      {dancer.englishName || dancer.name}
                    </h2>

                    {dancer.englishName && (
                      <span>{dancer.name}</span>
                    )}

                    {dancer.shortBio && (
                      <p>{dancer.shortBio}</p>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}