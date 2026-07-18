import type {SchemaTypeDefinition} from 'sanity'

import {dancerType} from './dancerType'
import {performanceType} from './performanceType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [dancerType, performanceType],
}