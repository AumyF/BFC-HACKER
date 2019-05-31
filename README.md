# BFC-HACKER

Mastodonインスタンス「 [best-friends.chat](https://best-friends.chat/) 」のハッカー絵文字をパレットから打つのが非常に面倒なので作りました
[GreasyFork](https://greasyfork.org/ja/scripts/382420-bfc-hacker)
[GitHubリポジトリ](https://github.com/MominisJapan/BFC-HACKER)

## 更新情報

### v7.1

- HACKER処理のたびに縦棒とコロンの開閉の状態がリセットされるようになった。説明が難しすぎるがともかくそういうことだ。

### v7

- __エスケープに使用する文字を変更し、セミコロン(;)から縦棒(|)に変更しました。__
- HACKER処理で、ゼロ幅スペースに対してさらにゼロ幅スペースを追加する問題を解決した。
- HACKER処理開始時に文字列が500文字を超えている場合、処理を行わないように変更した。
  - これにより、HACKERボタンを連打したときに文字数が指数関数的に(？)増えて<s>兵庫県警</s>ブラクラを招く問題を解決した。

## つかいかた

1. トゥート!の下に
___HACKER!___
という<s>令和を迎えられなさそうな</s>ボタンが用意されているので…
1. a~zの文字をトゥート欄に入力して
___HACKER!___
を押すと:hacker_a: などに変わります
1. ___トゥート!___

### 記法について

- 半角セミコロン(;)で囲まれた文字はHACKER化から除外します、URLを囲むと便利です
- 変換対象のアルファベットは __小文字__ です。大文字は変換されません
- :hacker_a:などの絵文字は前後にスペース記号が必要になるので、ゼロ幅スペース(U+200B)を挿入しています
- 半角スペースはHACKER絵文字に対して小さいので、全角スペース(U+3000)に置換されます
- 不具合とかあったら[@mn@best-friends.chat](https://best-friends.chat/@mn)にメンションをお願いします

## ライセンス

[__Do What The Fuck You Want To Public License (WTFPL)__](http://www.wtfpl.net/)

意訳:_勝手にしやがれ！_
