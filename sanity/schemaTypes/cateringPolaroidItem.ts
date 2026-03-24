import {defineField, defineType} from 'sanity'

export const cateringPolaroidItem = defineType({
  name: 'cateringPolaroidItem',
  title: 'Catering Polaroid Item',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'tag', title: 'Tag', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'isBestseller', title: 'Is Bestseller', type: 'boolean'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {select: {title: 'internalName'}},
})
