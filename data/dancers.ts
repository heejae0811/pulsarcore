export type Dancer = {
  slug: string;
  name: string;
  englishName: string;
  role: string;
  shortIntroduction: string;
  biography: string;
  artisticStatement: string;
  portraitImage: string;
  coverImage: string;
  gallery: string[];
  videoUrl: string;
};

export const dancers: Dancer[] = [
  {
    slug: "kim-haneul",
    name: "김하늘",
    englishName: "Haneul Kim",
    role: "Artistic Director · Dancer",
    shortIntroduction:
      "압축된 감정과 에너지가 움직임으로 해방되는 순간을 탐구합니다.",
    biography:
      "김하늘은 신체 내부에 축적된 감정과 기억이 움직임으로 전환되는 과정에 관심을 두고 작업합니다. 국내외 창작 프로젝트와 협업 공연을 통해 컨템퍼러리 무용의 새로운 언어를 탐색하고 있습니다.",
    artisticStatement:
      "춤은 보이지 않는 힘을 가시화하는 일이라고 믿습니다. 서로 다른 신체가 충돌하고 밀어내며 새로운 궤도를 만들어가는 순간에 주목합니다.",
    portraitImage:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=85",
    coverImage:
      "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1600&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    slug: "lee-seoyun",
    name: "이서윤",
    englishName: "Seoyun Lee",
    role: "Dancer",
    shortIntroduction:
      "섬세한 호흡과 강한 추진력이 공존하는 움직임을 연구합니다.",
    biography:
      "이서윤은 즉흥과 구조 사이에서 발생하는 긴장을 중심으로 움직임을 발전시킵니다. 미세한 호흡과 신체의 방향 변화가 공간 전체에 미치는 영향을 탐구합니다.",
    artisticStatement:
      "작은 떨림 하나가 공간의 분위기를 바꿀 수 있다고 생각합니다. 움직임이 지나간 뒤 남는 잔상과 여백에 관심이 있습니다.",
    portraitImage:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    coverImage:
      "https://images.unsplash.com/photo-1495791185843-c73f2269f669?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1600&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    slug: "park-doyun",
    name: "박도윤",
    englishName: "Doyun Park",
    role: "Dancer",
    shortIntroduction:
      "중력과 속도, 충돌이 신체의 방향을 변화시키는 과정을 탐색합니다.",
    biography:
      "박도윤은 역동적인 움직임과 공간 구성을 중심으로 활동합니다. 떨어짐과 회복, 불균형과 안정이 반복되는 신체의 과정을 무대 위에 드러냅니다.",
    artisticStatement:
      "몸은 끊임없이 떨어지면서도 다시 균형을 찾습니다. 불완전한 균형에서 발생하는 에너지를 관객과 공유하고 싶습니다.",
    portraitImage:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    coverImage:
      "https://images.unsplash.com/photo-1479813183133-f2e9b38ed6c4?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1485883043639-365899a88709?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
];