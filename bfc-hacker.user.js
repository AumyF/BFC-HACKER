// ==UserScript==
// @name             BFC-HACKER
// @namespace        https://github.com/mominisjapan
// @version          7.1
// @description      best-friends.chatのハッカー絵文字を簡単に入力
// @author           Mominis
// @match            https://best-friends.chat/*
// @grant            none
// @run-at           document-end
// @license          WTFPL
// ==/UserScript==
/*
Copyright (c) 2019 MominisJapan
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the License.txt file for more details.
*/
const version = "7.1";

window.addEventListener('load', main);


function main() {
    console.log(`%c BFC-HACKER ${version}\nBy Mominis(mn@best-friends.chat)`, 'font-weight:bold; font-size:150%');
    const hackerButton = document.createElement('button');
    hackerButton.innerHTML = `HACKER!`;
    hackerButton.style = `background-color:#000000; color:#FFFFFF; font-weight:bolder; font-style:italic; width:100%; font-size:200%;`;
    document.getElementsByClassName('compose-form')[0].appendChild(hackerButton);
    hackerButton.addEventListener('click', onClickHackerButton);
}

let onClickHackerButton = () => {
    let textarea = document.getElementsByClassName('autosuggest-textarea__textarea')[0];
    if(textarea.value.length > 500){
        console.warn('BFC-HACKER: 文字列が長すぎです…500文字超えてますよ…?');
        alert('文字列が長すぎです…500文字超えてますよ…?\nBFC-HACKERより');
    }else{
        console.group(`BFC-HACKER: …処理を開始します。変換前の文字列は… ${textarea.value} です。`);
        textarea.value = sift(textarea.value).join('');
        console.groupEnd();
        console.log(`BFC-HACKER: …処理を終了しました。変換後の文字列は… ${textarea.value}です。`);
    }
}

const sift = (str) => {
    let betweenBars = false;
    let betweenColons = false;
    let needsSpaceBefore = false;
    const space = () => needsSpaceBefore?`\u200b`:``;
    needsSpaceBefore = false;
    let hackedCharsArray = [];
    for(let i=0; i!=str.length; i++) {
        //急に気が触れたので、C#スタイルの波括弧を使い始める
        const charC = str.codePointAt(i);
        if(charC == 0x7c)
        {
            //|
            console.log(`BFC-HACKER: ${i}番目の文字列(${str[i]})は縦棒でした。`);
            if(betweenBars)
            {
                console.log(`BFC-HACKER: 縦棒囲みを閉じます。以降の文字はHACKER処理されます。`);
                hackedCharsArray[i] = `${space()}`;
                needsSpaceBefore = false;
                betweenBars = false;
            }
            else
            {
                console.log(`BFC-HACKER: 縦棒囲みを開きます。次の縦棒まで、文字はHACKER処理されません。`);
                hackedCharsArray[i] = ``;
                needsSpaceBefore = true;
                betweenBars = true;
            }
        }
        else if(charC == 0x3a)
        {
            console.log(`BFC-HACKER: ${i}番目の文字列(${str[i]})はコロンでした。`)
            if(betweenColons)
            {
                console.log(`BFC-HACKER: コロン囲みを閉じます。以降の文字はHACKER処理されます。`);
                hackedCharsArray[i] = `:`;
                needsSpaceBefore = false;
                betweenColons = false;
            }
            else
            {
                console.log(`BFC-HACKER: コロン囲みを開きます。次のコロンまで、文字はHACKER処理されません。`);
                hackedCharsArray[i] = `:`;
                needsSpaceBefore = true;
                betweenColons = true;
            }
        }
        else if(betweenBars)
        {
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})は、縦棒の間にあるため処理されません…`);
            hackedCharsArray[i] = str[i];
        }
        else if(betweenColons)
        {
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})は、コロンの間にあるため処理されません…`);
            hackedCharsArray[i] = str[i];
        }
        else if(charC >= 0x61 && charC <= 0x7a)
        {
            //latin small, "abcdefghijklmnopqrstuvwxyz"
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})は、ラテンアルファベット小文字です。HACKER処理されます。`);
            needsSpaceBefore = true
            hackedCharsArray[i] = `${space()}:hacker_${str[i]}:`;
        }
        else if(charC == 0x20)
        {
            //space, " " => ideographic space, "　" (全角スペース)
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})は半角スペースでした。全角スペースに置き換えておきます。`);
            needsSpaceBefore = false;
            hackedCharsArray[i] = `　`;
        } else if(charC == 0x200b)
        {
            // zero width space
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})はゼロ幅スペースでした。放っておきます。`);
            hackedCharsArray[i] = str[i];
        }
        else
        {
            //semicolon,latin small,spaceのどれでもない
            console.log(`BFC-HACKER: ${i}番目の文字(${str[i]})は対象外の文字でした。もしかして、${['ひらがなで', 'カタカナで', '漢字で', 'キリル文字で', 'ギリシャ文字で', '顔文字にマイナーな文字を使いま'][Math.floor(Math.random() * 6)]}したか？`);
            needsSpaceBefore = true;
            hackedCharsArray[i] = `${space()}${str[i]}`;
        }
    }
    return hackedCharsArray;
};

