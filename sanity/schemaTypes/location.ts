import { defineField, defineType } from "sanity";

export const locationType = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "locationId", title: "Location ID", type: "string" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      validation: (rule) => rule.required(),
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "text",
      validation: (rule) => rule.required(),
      rows: 3,
    }),
    defineField({ name: "menuUrl", title: "eMenu URL", type: "url" }),
    defineField({ name: "directionsUrl", title: "Directions URL", type: "url" }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL (iframe src)",
      type: "url",
    }),
    defineField({
      name: "directionsUrlLong",
      title: "Directions URL (Long)",
      type: "text",
    }),
    defineField({
      name: "mapEmbedUrlLong",
      title: "Map Embed URL (Long iframe src)",
      type: "text",
    }),
    defineField({ name: "rating", title: "Rating", type: "number" }),
    defineField({ name: "ratingCount", title: "Rating Count", type: "string" }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug",
      media: "gallery.0",
    },
  },
});
