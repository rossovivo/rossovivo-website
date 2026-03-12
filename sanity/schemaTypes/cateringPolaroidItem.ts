import { defineField, defineType } from "sanity";

export const cateringPolaroidItemType = defineType({
  name: "cateringPolaroidItem",
  title: "Catering Polaroid Item",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tag", title: "Tag", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "isBestseller",
      title: "Is Bestseller",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      subtitle: "tag",
      media: "image",
    },
  },
});
