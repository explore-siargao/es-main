import type { Field } from "payload/types"

export const content: Field = {
  name: "content",
  label: false,
  type: "group",
  fields: [
    {
      type: "textarea",
      name: "locationGuide",
      label: "How to get there?",
      required: true,
    },
    {
      type: "group", // Nested group for swellDirection, windDirection, and tide
      name: "idealCondtions",
      label: "Ideal Conditions",
      fields: [
        {
          type: "text",
          name: "swellDirection",
          label: "Swell Direction",
          required: true,
        },
        {
          type: "text",
          name: "windDirection",
          label: "Wind Direction",
          required: true,
        },
        {
          type: "text",
          name: "tide",
          label: "Tide",
          required: true,
        },
        {
          type: "group", // Nested group for swellDirection, windDirection, and tide
          name: "waveDifficulty",
          label: "Wave Difficulty",
          fields: [
            {
              type: "number",
              name: "scale",
              label: "Scale (1-10)",
              max: 10,
              min: 1,
              required: true,
            },
            {
              name: "level", // required
              type: "select", // required
              hasMany: false,
              admin: {
                isClearable: true,
              },
              options: [
                {
                  label: "Bad",
                  value: "Bad",
                },
                {
                  label: "Medium",
                  value: "Medium",
                },
                {
                  label: "Good",
                  value: "Good",
                },
              ],
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              required: true,
            },
          ],
        },
        {
          type: "group", // Nested group for swellDirection, windDirection, and tide
          name: "waveQuality",
          label: "Wave Quality",
          fields: [
            {
              type: "number",
              name: "scale",
              label: "Scale (1-10)",
              max: 10,
              min: 1,
              required: true,
            },
            {
              name: "level", // required
              type: "select", // required
              hasMany: false,
              admin: {
                isClearable: true,
              },
              options: [
                {
                  label: "Bad",
                  value: "Bad",
                },
                {
                  label: "Medium",
                  value: "Medium",
                },
                {
                  label: "Good",
                  value: "Good",
                },
              ],
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              required: true,
            },
          ],
        },
        {
          type: "group", // Nested group for swellDirection, windDirection, and tide
          name: "crowdFactor",
          label: "Crowd Factor",
          fields: [
            {
              type: "number",
              name: "scale",
              label: "Scale (1-10)",
              max: 10,
              min: 1,
              required: true,
            },
            {
              name: "level", // required
              type: "select", // required
              hasMany: false,
              admin: {
                isClearable: true,
              },
              options: [
                {
                  label: "Bad",
                  value: "Bad",
                },
                {
                  label: "Medium",
                  value: "Medium",
                },
                {
                  label: "Good",
                  value: "Good",
                },
              ],
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "point",
      name: "location",
      label: "Windy",
      required: true,
    },
  ],
}
