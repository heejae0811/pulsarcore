export type Performance = {
  slug: string;
  title: string;
  koreanTitle: string;
  year: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  choreographer: string;
  dancers: string;
  premiere: string;
  duration: string;
  coverImage: string;
  gallery: string[];
  videoUrl: string;
};

export const performances: Performance[] = [
  {
    slug: "pulsar",
    title: "PULSAR",
    koreanTitle: "펄서",
    year: "2026",
    category: "Main Production",
    shortDescription:
      "서로 다른 극성을 지닌 신체가 밀어내고 끌어당기며 거대한 파동을 만드는 작품입니다.",
    fullDescription:
      "PULSAR는 별이 소멸한 이후 남은 고밀도의 에너지에서 출발합니다. 서로 다른 방향과 속도를 가진 무용수들은 가까워지고 멀어지기를 반복하며 하나의 거대한 움직임을 형성합니다. 충돌과 분리, 응축과 해방을 통해 관계 안에서 변화하는 신체를 탐구합니다.",
    choreographer: "김하늘",
    dancers: "김하늘, 이서윤, 박도윤",
    premiere: "2026년 예정",
    duration: "약 60분",
    coverImage:
      "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=1800&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    slug: "orbit",
    title: "ORBIT",
    koreanTitle: "궤도",
    year: "2025",
    category: "Repertory",
    shortDescription:
      "하나의 중심을 공유하면서도 서로 다른 궤도를 움직이는 신체에 대한 작품입니다.",
    fullDescription:
      "ORBIT는 관계 안에서 유지되는 거리와 방향을 탐구합니다. 무용수들은 같은 공간을 공유하지만 동일한 길을 걷지 않습니다. 각자의 궤도가 교차하는 짧은 순간을 통해 만남과 이별의 감각을 표현합니다.",
    choreographer: "김하늘",
    dancers: "이서윤, 박도윤",
    premiere: "2025년 9월",
    duration: "약 45분",
    coverImage:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1495791185843-c73f2269f669?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&w=1800&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    slug: "afterglow",
    title: "AFTERGLOW",
    koreanTitle: "잔광",
    year: "2024",
    category: "Archive",
    shortDescription:
      "움직임이 사라진 이후 공간과 기억에 남는 감정의 잔상을 탐구합니다.",
    fullDescription:
      "AFTERGLOW는 공연이 끝난 뒤에도 관객의 기억과 공간에 남아 있는 움직임에 관한 작품입니다. 반복되는 동작과 느린 변화, 빛과 그림자의 관계를 통해 사라지는 것과 남겨지는 것의 경계를 바라봅니다.",
    choreographer: "김하늘",
    dancers: "김하늘, 이서윤",
    premiere: "2024년 11월",
    duration: "약 50분",
    coverImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1479813183133-f2e9b38ed6c4?auto=format&fit=crop&w=1800&q=85",
      "https://images.unsplash.com/photo-1485883043639-365899a88709?auto=format&fit=crop&w=1800&q=85",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
];