# Local Storage のテスト
お試しページ: https://stakiran.github.io/test_localstorage/

## 感想
- シンプルな key-value ストア。使いやすい
- ストア先はドメイン単位で分かれる
  - ローカルで実行すると `file:///C:/work/.../localstorage_test/index.html` ← この単位がドメイン
  - リモートで実行するとドメインはルート単位
    - X http://html5.imedia-web.net/sample/webstrage/post_2.html
    - O http://html5.imedia-web.net/ ← この単位
- 上限サイズは環境次第だが 10MB くらい。もっと少ないことも。MB 以上はあまり想定しない方がよい？

## License
[MIT License](LICENSE)

## Author
[stakiran](https://github.com/stakiran)
