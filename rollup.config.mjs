// @ts-check
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import tsPlugin from '@rollup/plugin-typescript';
import glob from 'fast-glob';
import dtsPlugin from 'rollup-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const entrypoints = await glob([`src/**/index.ts`], {
  cwd: __dirname,
  absolute: false,
});

const testPatterns = ['**/*.spec.ts', '**/*.test.ts'];

export default () => {
  return [
    libBuildOptions({
      format: 'esm',
      extension: 'mjs',
      entrypoints,
      outDir: 'dist',
      sourcemap: false,
    }),
    libBuildOptions({
      format: 'cjs',
      extension: 'js',
      entrypoints,
      outDir: 'dist',
      sourcemap: false,
    }),
    declarationOptions({
      entrypoints,
      outDir: 'dist',
    }),
  ];
};

/**
 * @type {(options: {
 *   entrypoints: string[];
 *   format: 'esm' | 'cjs';
 *   extension: 'js' | 'cjs' | 'mjs';
 *   outDir: string;
 *   sourcemap: boolean;
 * }) => import('rollup').RollupOptions}
 */
function libBuildOptions({ entrypoints, extension, format, outDir, sourcemap }) {
  const isESM = format === 'esm';

  return {
    input: mapInputs(entrypoints),
    plugins: [
      alias({
        entries: [
          { find: /^node:(.+)$/, replacement: '$1' },
        ],
      }),
      tsPlugin({
        exclude: [...testPatterns],
        compilerOptions: {
          sourceMap: sourcemap,
          inlineSources: sourcemap || undefined,
          removeComments: !sourcemap,
          declaration: false,
        },
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
    ],
    output: {
      format,
      dir: outDir,
      ...fileNames(extension),
      // Using preserveModules disables bundling and the creation of chunks,
      // leading to a result that is a mirror of the input module graph.
      preserveModules: isESM,
      sourcemap,
      generatedCode: 'es2015',
      // Hoisting transitive imports adds bare imports in modules,
      // which can make imports by JS runtimes slightly faster,
      // but makes the generated code harder to follow.
      hoistTransitiveImports: false,
    },
  };
}

/**
 * @type {(options: {entrypoints: string[]; outDir: string}) => import('rollup').RollupOptions}
 */
function declarationOptions({ entrypoints, outDir }) {
  return {
    plugins: [dtsPlugin()],
    input: mapInputs(entrypoints),
    output: [
      {
        format: 'esm',
        dir: outDir,
        generatedCode: 'es2015',
        ...fileNames('d.mts'),
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        format: 'cjs',
        dir: outDir,
        generatedCode: 'es2015',
        ...fileNames('d.ts'),
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
  };
}

/** @type {(srcFiles: string[]) => Record<string, string>} */
function mapInputs(srcFiles) {
  return Object.fromEntries(
    srcFiles.map(file => [file.replace(/^(\.\/)?src\//, '').replace(/\.[cm]?(js|ts)$/, ''), join(__dirname, file)]),
  );
}

function fileNames(extension = 'js') {
  return {
    entryFileNames: `[name].${extension}`,
    chunkFileNames: `_chunk/[name]-[hash:6].${extension}`,
  };
}
