import {defineField, defineType} from 'sanity'

export const cateringFeatureItem = defineType({
  name: 'cateringFeatureItem',
  title: 'Catering Feature Item',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      validation: (r) => r.required().regex(/^[A-Za-z][A-Za-z0-9]+$/, {name: 'PascalCase'}),
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'copy', title: 'Copy', type: 'text', validation: (r) => r.required()}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {select: {title: 'internalName'}},
})
