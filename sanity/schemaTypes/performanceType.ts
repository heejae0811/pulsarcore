import {defineField, defineType} from 'sanity'

export const performanceType = defineType({
  name: 'performance',
  title: '작품',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: '작품명',
      type: 'string',
      validation: (rule) =>
        rule.required().error('작품명을 입력해 주세요.'),
    }),

    defineField({
      name: 'englishTitle',
      title: '영문 작품명',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: '페이지 주소',
      type: 'slug',
      description: 'Generate 버튼을 누르면 자동으로 생성됩니다.',
      options: {
        source: 'englishTitle',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().error('페이지 주소를 생성해 주세요.'),
    }),

    defineField({
      name: 'category',
      title: '작품 분류',
      type: 'string',
      options: {
        list: [
          {title: '레퍼토리', value: 'repertoire'},
          {title: '신작', value: 'new'},
          {title: '공연 예정', value: 'upcoming'},
          {title: '지난 공연', value: 'archive'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'coverImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '대체 텍스트',
          type: 'string',
          description: '이미지를 설명하는 짧은 문장을 입력해 주세요.',
        }),
      ],
    }),

    defineField({
      name: 'shortDescription',
      title: '목록용 짧은 소개',
      type: 'text',
      rows: 3,
      description: '작품 목록에 표시되는 짧은 소개입니다.',
    }),

    defineField({
      name: 'description',
      title: '작품 상세 소개',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),

    defineField({
      name: 'performanceDate',
      title: '공연 시작일',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),

    defineField({
      name: 'endDate',
      title: '공연 종료일',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.performanceDate

          if (
            typeof endDate === 'string' &&
            typeof startDate === 'string' &&
            endDate < startDate
          ) {
            return '종료일은 시작일보다 빠를 수 없습니다.'
          }

          return true
        }),
    }),

    defineField({
      name: 'venue',
      title: '공연 장소',
      type: 'string',
      placeholder: '예: 예술의전당 자유소극장',
    }),

    defineField({
      name: 'runningTime',
      title: '러닝타임',
      type: 'string',
      placeholder: '예: 70분',
    }),

    defineField({
      name: 'choreographer',
      title: '안무 / 연출',
      type: 'string',
    }),

    defineField({
      name: 'cast',
      title: '출연 무용수',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'dancer'}],
        },
      ],
    }),

    defineField({
      name: 'gallery',
      title: '갤러리 사진',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '대체 텍스트',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'videoUrl',
      title: '영상 주소',
      type: 'url',
      description: 'YouTube 또는 Vimeo 영상 주소를 입력해 주세요.',
    }),

    defineField({
      name: 'ticketUrl',
      title: '예매 주소',
      type: 'url',
    }),

    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      description: '숫자가 작은 작품부터 먼저 표시됩니다.',
      initialValue: 1,
      validation: (rule) => rule.min(0).integer(),
    }),

    defineField({
      name: 'isActive',
      title: '홈페이지에 공개',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      media: 'coverImage',
      performanceDate: 'performanceDate',
    },

    prepare(selection) {
      const {title, subtitle, media, performanceDate} = selection

      const dateText = performanceDate
        ? new Date(performanceDate).toLocaleDateString('ko-KR')
        : '날짜 미정'

      return {
        title,
        subtitle: [dateText, subtitle].filter(Boolean).join(' · '),
        media,
      }
    },
  },

  orderings: [
    {
      title: '표시 순서',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: '공연일 최신순',
      name: 'performanceDateDesc',
      by: [{field: 'performanceDate', direction: 'desc'}],
    },
  ],
})