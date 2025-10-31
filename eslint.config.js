import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@mui/[^/]+$' }],
        },
      ],
    },
  },
)
