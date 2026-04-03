import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .schemaType('siteSettings')
        .child(S.documentTypeList('siteSettings').title('Site Settings')),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .schemaType('homePage')
        .child(S.documentTypeList('homePage').title('Home Page')),
      S.listItem()
        .title('About Page')
        .schemaType('aboutPage')
        .child(S.documentTypeList('aboutPage').title('About Page')),
      S.listItem()
        .title('Contact Page')
        .schemaType('contactPage')
        .child(S.documentTypeList('contactPage').title('Contact Page')),
      S.listItem()
        .title('Catering Page')
        .schemaType('cateringPage')
        .child(S.documentTypeList('cateringPage').title('Catering Page')),
      S.listItem()
        .title('Legal Pages')
        .schemaType('legalPage')
        .child(S.documentTypeList('legalPage').title('Legal Pages')),
      S.divider(),
      S.listItem()
        .title('Blog Posts')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Locations')
        .schemaType('location')
        .child(S.documentTypeList('location').title('Locations')),
      S.listItem()
        .title('Location Reviews')
        .schemaType('locationReview')
        .child(S.documentTypeList('locationReview').title('Location Reviews')),
      S.listItem()
        .title('Menu Items')
        .schemaType('menuItem')
        .child(S.documentTypeList('menuItem').title('Menu Items')),
      S.divider(),
      S.listItem()
        .title('Catering Polaroid Items')
        .schemaType('cateringPolaroidItem')
        .child(S.documentTypeList('cateringPolaroidItem').title('Catering Polaroid Items')),
      S.listItem()
        .title('Catering Feature Items')
        .schemaType('cateringFeatureItem')
        .child(S.documentTypeList('cateringFeatureItem').title('Catering Feature Items')),
      S.listItem()
        .title('Catering Media Items')
        .schemaType('cateringMediaItem')
        .child(S.documentTypeList('cateringMediaItem').title('Catering Media Items')),
    ])
