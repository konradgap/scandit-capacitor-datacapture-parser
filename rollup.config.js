import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import modify from 'rollup-plugin-modify';

export default [{
  input: 'src/index.ts',
  external: ['@capacitor/core', 'scandit-capacitor-datacapture-core', 'scandit-datacapture-frameworks-core'],
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      name: 'capacitorScanditParserPlugin',
      globals: {
        '@capacitor/core': "require('@capacitor/core')",
      },
      sourcemap: true,
      inlineDynamicImports: true,
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript()
  ],
},
{
  input: './dist/index.js',
  output: {
    file: './dist/index.js',
    format: 'esm'
  },
  plugins: [
    modify({
      'scandit-datacapture-frameworks-core': 'scandit-capacitor-datacapture-core/dist/core'
    })
  ]
}];
