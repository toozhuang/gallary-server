module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'build',
        'chore',
        'ci',
        'doc',
        'perf',
      ],
    ],
  },
  extends: ['@commitlint/config-conventional'],
};
