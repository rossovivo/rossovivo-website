import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'string'}),
    defineField({name: 'heroHighlight', title: 'Hero Highlight', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero Image', type: 'image'}),
    defineField({name: 'storyHeading', title: 'Story Heading', type: 'string'}),
    defineField({
      name: 'storyBody',
      title: 'Story Body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
    defineField({name: 'storySignatureLabel', title: 'Story Signature Label', type: 'string'}),
    defineField({name: 'storySignatureName', title: 'Story Signature Name', type: 'string'}),
    defineField({name: 'storyImage', title: 'Story Image', type: 'image'}),
    defineField({name: 'ctaTitle', title: 'CTA Title', type: 'string'}),
    defineField({name: 'ctaHighlight', title: 'CTA Highlight', type: 'string'}),
    defineField({name: 'ctaPrimaryLabel', title: 'CTA Primary Label', type: 'string'}),
    defineField({name: 'ctaPrimaryHref', title: 'CTA Primary Link', type: 'string'}),
    defineField({name: 'ctaSecondaryLabel', title: 'CTA Secondary Label', type: 'string'}),
    defineField({name: 'ctaSecondaryHref', title: 'CTA Secondary Link', type: 'string'}),
  ],
  preview: {select: {title: 'internalName'}},
})
