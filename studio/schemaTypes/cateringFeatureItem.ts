import { defineField, defineType } from "sanity";

export const cateringFeatureItemType = defineType({
  name: "cateringFeatureItem",
  title: "Catering Feature Item",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Lucide Icon Name",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[A-Za-z][A-Za-z0-9]+$/, {
          name: "pascalCase",
          invert: false,
        }),
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "copy",
      title: "Copy",
      type: "text",
      validation: (rule) => rule.required(),
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
      subtitle: "iconName",
    },
  },
});
