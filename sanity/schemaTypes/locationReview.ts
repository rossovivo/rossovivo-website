import {defineField, defineType} from 'sanity'

export const locationReview = defineType({
  name: 'locationReview',
  title: 'Location Review',
  type: 'document',
  fields: [
    defineField({name: 'locationId', title: 'Location ID', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'rating', title: 'Rating', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'ratingCount', title: 'Rating Count', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'locationId', subtitle: 'ratingCount'}},
})
