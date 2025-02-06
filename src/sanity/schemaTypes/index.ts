import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import blog from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, blog],
}
