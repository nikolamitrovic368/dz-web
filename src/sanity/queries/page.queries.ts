import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from './exhibition.queries'

const pageSimpleFields = groq`
  _id,
  _type,
  slug,
  title,
`

const pageComplexFields = groq`
   exhibition-> {
     ${exhibitionSimpleFields}
     ${exhibitionComplexFields}
   },
`
const pageBuilderFields = groq`
  _type,
  title,
  components[] {
    _type,
    title,
    components[] {
      ...,
      _type,
      title,
      'exhibition': content[ _type == 'exhibition']->{
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
      'artist': content[ _type == 'artist']->{..., },
      'artwork': content[ _type == 'artwork']->{
        ...,
        "artists": artists[]->
      },
      'book': content[ _type == 'book']->{
        ...,
        "authors": authors[]->,
        "artists": artists[]->,
      },
      'press': content[ _type == 'press']->{
        ...,
        "authors": authors[]->
      },

    }
  },
`

export const pageSlugs = groq`*[_type == "page" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const pageBySlug = groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageSimpleFields}
  ${pageComplexFields}
}`

export const homePage = groq`
*[_type == "home"] {
 ${pageBuilderFields}
}
`
