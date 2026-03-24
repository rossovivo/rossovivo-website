import { defineField, defineType } from "sanity";

export const menuItemType = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
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
      subtitle: "category",
    },
  },
});
