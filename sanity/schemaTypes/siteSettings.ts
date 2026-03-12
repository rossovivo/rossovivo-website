import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logoLight",
      title: "Logo Light (for dark backgrounds)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "logoDark",
      title: "Logo Dark (for light backgrounds)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "tiktokUrl", title: "TikTok URL", type: "url" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({ name: "primaryPhone", title: "Primary Phone", type: "string" }),
    defineField({
      name: "secondaryPhone",
      title: "Secondary Phone",
      type: "string",
    }),
    defineField({ name: "primaryEmail", title: "Primary Email", type: "string" }),
    defineField({
      name: "secondaryEmail",
      title: "Secondary Email",
      type: "string",
    }),
    defineField({
      name: "addresses",
      title: "Addresses (One Per Line)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "footerLocationSummary",
      title: "Footer Location Summary",
      type: "string",
    }),
    defineField({
      name: "eMenuMediaCityUrl",
      title: "eMenu URL - Media City",
      type: "url",
    }),
    defineField({
      name: "eMenuBusinessBayUrl",
      title: "eMenu URL - Business Bay",
      type: "url",
    }),
    defineField({
      name: "orderNowPrimaryLabel",
      title: "Order CTA Primary Label",
      type: "string",
    }),
    defineField({
      name: "orderNowPrimaryHref",
      title: "Order CTA Primary Link",
      type: "string",
    }),
    defineField({
      name: "orderNowSecondaryLabel",
      title: "Order CTA Secondary Label",
      type: "string",
    }),
    defineField({
      name: "orderNowSecondaryHref",
      title: "Order CTA Secondary Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "internalName",
      subtitle: "footerLocationSummary",
    },
  },
});
