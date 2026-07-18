import {defineField, defineType} from 'sanity'

export const dancerType = defineType({
  name: 'dancer',
  title: '무용수',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (rule) => rule.required().error('이름을 입력해 주세요.'),
    }),

    defineField({
      name: 'englishName',
      title: '영문 이름',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: '페이지 주소',
      type: 'slug',
      description: 'Generate 버튼을 누르면 자동으로 생성됩니다.',
      options: {
        source: 'englishName',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'role',
      title: '직책 또는 역할',
      type: 'string',
      placeholder: '예: Artistic Director, Dancer',
    }),

    defineField({
      name: 'profileImage',
      title: '프로필 사진',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '대체 텍스트',
          type: 'string',
          description: '사진을 설명하는 짧은 문장을 입력해 주세요.',
        }),
      ],
    }),

    defineField({
      name: 'shortBio',
      title: '목록용 짧은 소개',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'biography',
      title: '상세 소개',
      type: 'array',
      of: [
        {
          type: 'block',
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
      name: 'instagram',
      title: 'Instagram 주소',
      type: 'url',
    }),

    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      description: '숫자가 작은 무용수부터 먼저 표시됩니다.',
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
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },

  orderings: [
    {
      title: '표시 순서',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})