module.exports = {
  rules: {
    'type-enum': [
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
  },
  extends: ['@commitlint/config-conventional'],
};
