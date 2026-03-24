import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({name: 'slug', title: 'Slug', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'locationId', title: 'Location ID', type: 'string'}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'address', title: 'Address', type: 'text', validation: (r) => r.required()}),
    defineField({name: 'phone', title: 'Phone', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'hours', title: 'Hours', type: 'text', validation: (r) => r.required()}),
    defineField({name: 'menuUrl', title: 'eMenu URL', type: 'string'}),
    defineField({name: 'directionsUrl', title: 'Directions URL', type: 'string'}),
    defineField({name: 'mapEmbedUrl', title: 'Map Embed URL (iframe src)', type: 'string'}),
    defineField({name: 'directionsUrlLong', title: 'Directions URL (Long)', type: 'text'}),
    defineField({name: 'mapEmbedUrlLong', title: 'Map Embed URL (Long iframe src)', type: 'text'}),
    defineField({name: 'rating', title: 'Rating', type: 'number'}),
    defineField({name: 'ratingCount', title: 'Rating Count', type: 'string'}),
    defineField({name: 'displayOrder', title: 'Display Order', type: 'number'}),
    defineField({name: 'isActive', title: 'Is Active', type: 'boolean'}),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
  preview: {select: {title: 'name'}},
})
