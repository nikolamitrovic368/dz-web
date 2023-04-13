import {ComposeIcon, MasterDetailIcon, SearchIcon} from '@sanity/icons'
import {defineArrayMember,defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: MasterDetailIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeIcon, default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'dzHero',
          title: 'Hero',
          type: 'dzHero',
        }),
        defineArrayMember({
          name: 'dzCard',
          title: 'Card',
          type: 'dzCard',
        }),
        defineArrayMember({
          name: 'dzRichText',
          title: 'RichText',
          type: 'dzRichText',
        }),
        defineArrayMember({
          name: 'dzImage',
          title: 'Image',
          type: 'dzImage',
        }),
      ],
    }),

  ],
})