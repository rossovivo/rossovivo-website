import {defineField, defineType} from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'price', title: 'Price', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
  preview: {select: {title: 'name', subtitle: 'category'}},
})
