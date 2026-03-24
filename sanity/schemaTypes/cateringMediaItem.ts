import {defineField, defineType} from 'sanity'

export const cateringMediaItem = defineType({
  name: 'cateringMediaItem',
  title: 'Catering Media Item',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'quote', title: 'Copy', type: 'text', validation: (r) => r.required()}),
    defineField({name: 'designation', title: 'Designation', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {select: {title: 'internalName'}},
})
