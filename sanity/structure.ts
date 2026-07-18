import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('콘텐츠 관리')
    .items([
      S.documentTypeListItem('dancer').title('무용수'),

      S.documentTypeListItem('performance').title('작품'),
    ])