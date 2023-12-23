/** @type {import('./src/generator.schema.js').GeneratorSchema} */
module.exports = {
  output: 'src/model.ts',

  generate: {
    naming: {
      column: 'camelCase',
      table: 'pascalCase',
      enum: 'pascalCase',
      enumLabel: 'constantCase',
    },
  },

  database: {
    dialect: 'postgres',
    url: process.env['DATABASE_URL'],
    schemas: ['public'],
  },

  plugin: {
    zod: {
      scalar: {
        int_positive: 'z.number().int().positive()',
        int_nonpositive: 'z.number().int().nonpositive()',
        int_negative: 'z.number().int().negative()',
        int_nonnegative: 'z.number().int().nonnegative()',
        citext: './domains.js#citext',
        timestamp: 'z.union([z.string().datetime(), z.date()])',
        timestamptz: 'z.union([z.string().datetime(), z.date()])',
        text: './domains.js#text',
        url: "z.string().url().catch('').transform((value) => decodeURIComponent(value) || null)",
        rating: 'z.number().positive().lte(5).transform((value) => value.toFixed(1))',
        // numeric(8, 2)
        measurement: 'z.number().positive().lte(99999999.99).transform((value) => value.toFixed(2))',
      },
      override: {
        public: {},
      },
    },
  },
};
