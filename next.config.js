/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk'],
  },
  transpilePackages: [
    'react-markdown',
    'remark-gfm',
    'unified',
    'bail',
    'is-plain-obj',
    'trough',
    'vfile',
    'vfile-message',
    'unist-util-stringify-position',
    'mdast-util-from-markdown',
    'mdast-util-to-string',
    'mdast-util-gfm',
    'micromark',
    'micromark-util-combine-extensions',
    'micromark-extension-gfm',
    'decode-named-character-reference',
    'character-entities',
    'mdast-util-to-hast',
    'trim-lines',
    'unist-util-is',
    'unist-util-visit',
    'unist-util-visit-parents',
    'hast-util-to-jsx-runtime',
    'hast-util-whitespace',
    'property-information',
    'space-separated-tokens',
    'comma-separated-tokens',
    'remark-rehype',
  ],
};

module.exports = nextConfig;
