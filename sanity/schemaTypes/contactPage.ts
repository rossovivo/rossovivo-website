import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({name: 'internalName', title: 'Internal Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'string'}),
    defineField({name: 'heroHighlight', title: 'Hero Highlight', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text'}),
    defineField({name: 'infoTitle', title: 'Info Section Title', type: 'string'}),
    defineField({name: 'socialTitle', title: 'Social Section Title', type: 'string'}),
    defineField({name: 'formTitle', title: 'Form Title', type: 'string'}),
    defineField({name: 'formSubtitle', title: 'Form Subtitle', type: 'text'}),
    defineField({name: 'formSubmitLabel', title: 'Form Submit Label', type: 'string'}),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
    }),
  ],
  preview: {select: {title: 'internalName'}},
})
