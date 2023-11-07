import {groq} from 'next-sanity'
import {z} from 'zod'

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug) && defined(dateSelection.year)]{
  _id,
  "refs": count(*[references(^._id)]),
  "slug": slug.current,
}
[refs > 0][0..100]
`

export const AllArtworkSlugsSchema = z.array(
  z.object({
    slug: z.string(),
  })
)
