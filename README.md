# gulp_sass_pug_es6_flocss-template

## Usage

### インストール
` npm install `

### ディレクトリ構成

- `_dist` **変更不可** リリース用出力ファイル
  - `gulp dist`コマンドで出力
  - git管理対象
- `_dev` **変更不可** 開発用確認出力ファイル
  - `gulp`コマンドで開発モード
- `_src` 開発用ファイル
  - git管理対象
- `_styleguide` **変更不可**
  - スタイルガイド用ファイル
  - `overview.md`は必須


### Usage
- 開発は_srcディレクトリの中で行います。
- `gulp` コマンドで開発がスタートします。ファイルが更新されると、_devに出力されます。
  - 例）_src/index.pug → _dev/index.html
- コンパイル時にcss、jsファイルは結合されます。デフォルトで入っているものを利用すれば、コンパイル時の書き出しの設定をコメントにして入れています。
  - JavaScriptは必要となるモジュール用にファイルを作成し、`main.js`で`require`してください。コンパイル時`_dev/assets/js/bundle.js`に出力されます。
  - cssファイルは開発用にscssファイルが`_src/assets/css/`の中に入っています。吐き出し先は`dev/css/common.css`となり、同時にmapファイルが吐き出されます。
- リセットに`html5doctor.com Reset Stylesheet`を使用しています。
- リリース用ファイルは、 `gulp dist` コマンドを利用し、`_scr`内のファイルを元に、`_dist`のフォルダにHTML・CSS・JS・画像が出力されます。

### FLOU
- scss ディレクトリはFLOCSSをベースにしたFLOUで構成しています。
  - foundation
  - layout
  - object
  - utility
  - [FLOUについて](https://webnaut.jp/technology/20170407-2421/)
  - [FLOCSSについて](https://github.com/hiloki/flocss)

- Foundation
  - リセットCSS、NormarizeCSSなどの、すべてのベースとなるCSS
  - 基本的にコードは追加しない
  - `sass/foundation/`に記述
- Layout
  - パーツの配置や、ラッパーとしての幅や高さなどを決定するクラス
  - 接頭辞としてl-をつける
  - `sass/layout/`に記述
- Object
  - ページをまたいで使われる各種パーツを定義するクラス
  - そのパーツ内で常に同様の振る舞いをするものに関してのみスタイルを定義
  - `sass/object/`に記述
- Utility
  - 調整用のクラス
  - margin、padding、font-size、colorなどを付与するのに使用
  - 他種類のパーツ間の空き調整や、パーツとして認められないような、自由な振る舞いをする要素に対してはこちらのクラスを使用
  - 接頭辞としてu-をつける
  - `sass/utility/`に記述

## できること
- gulpを用いたタスクランナー機能
  - 画像最適化
    - gulp-imagemin
  - ブラウザー自動更新
    - browser-sync
    - browsersync-ssi
  - pugを用いたHTML作成
    - gulp-pug
  - sass
    - gulp-sass
    - gulp-sourcemaps
    - gulp-autoprefixer
    - gulp-group-css-media-queries
    - gulp-sass-glob
    - gulp-purgecss
- webpackを用いたes6開発
  - development mode
    - ソースマップ出力
  - production mode
    - ソースマップなし

## 依存アプリケーション等
- gulp
- sass
- pug
- webpack
- flocss

## Link

### BEM
- https://docs.emmet.io/filters/bem/
### Pug
- https://necosystem.hirokihomma.com/archives/121/