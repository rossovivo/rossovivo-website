import { defineField, defineType } from "sanity";

export const cateringMediaItemType = defineType({
  name: "cateringMediaItem",
  title: "Catering Media Item",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Copy",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "designation", title: "Designation", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      validation: (rule) => rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "image",
    },
  },
});
