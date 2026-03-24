import {defineField, defineType} from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'seoTitle', title: 'SEO Title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO Description', type: 'text'}),
    defineField({name: 'lastUpdated', title: 'Last Updated', type: 'date'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
    defineField({name: 'contactEmail', title: 'Contact Email', type: 'string'}),
  ],
  preview: {select: {title: 'internalName'}},
})
