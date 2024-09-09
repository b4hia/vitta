module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [':memo:', ':sparkles:', ':bug:', ':recycle:', ':heavy_plus_sign:', ':lock:',':hammer:']],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};

