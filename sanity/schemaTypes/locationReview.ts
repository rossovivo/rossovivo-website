import { defineField, defineType } from "sanity";

export const locationReviewType = defineType({
  name: "locationReview",
  title: "Location Review",
  type: "document",
  fields: [
    defineField({
      name: "locationId",
      title: "Location ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ratingCount",
      title: "Rating Count",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "locationId",
      subtitle: "ratingCount",
    },
    prepare(selection) {
      const rating =
        typeof selection.subtitle === "string" ? selection.subtitle : "";
      return {
        title: selection.title || "Location Review",
        subtitle: rating ? `Rating count: ${rating}` : "",
      };
    },
  },
});
