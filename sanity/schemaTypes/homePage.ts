import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitleHighlight",
      title: "Hero Title Highlight",
      type: "string",
    }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
    defineField({
      name: "heroPrimaryLabel",
      title: "Hero Primary Button Label",
      type: "string",
    }),
    defineField({
      name: "heroPrimaryHref",
      title: "Hero Primary Button Link",
      type: "string",
    }),
    defineField({
      name: "heroSecondaryLabel",
      title: "Hero Secondary Button Label",
      type: "string",
    }),
    defineField({
      name: "heroSecondaryHref",
      title: "Hero Secondary Button Link",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "heroVideo", title: "Hero Video", type: "file" }),
    defineField({ name: "heroVideoUrl", title: "Hero Video URL", type: "url" }),
    defineField({
      name: "locationsSectionTitle",
      title: "Locations Section Title",
      type: "string",
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "location" }] }],
    }),
    defineField({
      name: "cateringTeaserEyebrow",
      title: "Catering Teaser Eyebrow",
      type: "string",
    }),
    defineField({
      name: "cateringTeaserTitle",
      title: "Catering Teaser Title",
      type: "string",
    }),
    defineField({
      name: "cateringTeaserDescription",
      title: "Catering Teaser Description",
      type: "text",
    }),
    defineField({
      name: "cateringTeaserEventTypes",
      title: "Catering Event Type List",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cateringTeaserImage",
      title: "Catering Teaser Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "eventFormTitle", title: "Event Form Title", type: "string" }),
    defineField({
      name: "eventFormSubtitle",
      title: "Event Form Subtitle",
      type: "text",
    }),
    defineField({
      name: "eventFormImage",
      title: "Event Form Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "socialSectionHandle",
      title: "Social Section Handle",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "internalName",
      subtitle: "heroTitle",
      media: "heroImage",
    },
  },
});
