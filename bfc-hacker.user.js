// ==UserScript==
// @name             BFC-HACKER
// @namespace        https://github.com/mominisjapan
// @version          6
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
const version = "6m.2";
window.onload = () => {
    console.log(`BFC-HACKER ${version}\nBy Mominis(mn@best-friends.chat)`);
    const elm = document.createElement('button');
    elm.innerHTML = `HACKER!`;
    elm.style = `background-color:#000000;color:#FFFFFF;font-weight:bolder;font-style:italic;width:100%;font-size:200%;`;
    document.getElementsByClassName('compose-form')[0].appendChild(elm);
    elm.addEventListener('click',()=>{
        console.log(`---BFC-HACKER:IT'S TIME TO HACK THE WORLD!---`);
        let textarea = document.getElementsByClassName('autosuggest-textarea__textarea')[0];
        console.log(textarea.value);
        textarea.value = sift(textarea.value).join('');
    });
};

let needsSpaceBefore = false;
let isBetweenSemicolon = false;
const sift = (str) => {
    needsSpaceBefore = false;
    let hack = [];
    for(let i=0;i!=str.length;i++){
        const charC = str.codePointAt(i);
        if(charC==0x3b){
            //semicolon
            console.log(`BFC-HACKER:No.${i}(${str[i]}) is semicolon`);
            if(isBetweenSemicolon){
                hack[i] = `${space()}`;
                needsSpaceBefore = false;
                isBetweenSemicolon = false;
            }else{
                hack[i] = ``;
                needsSpaceBefore = true;
                isBetweenSemicolon = true;
            }
        }else if(isBetweenSemicolon){
            console.log(`BFC-HACKER:No.${i}(${str[i]}) is between semicolons`);
            hack[i] = str[i];
        }else if(charC >= 0x61 && charC <= 0x7a){
            //latin small, "abcdefghijklmnopqrstuvwxyz"
            console.log(`BFC-HACKER:No.${i}(${str[i]}) is LATIN SMALL LETTER a~z`);
            needsSpaceBefore = true
            hack[i] = `${space()}:hacker_${str[i]}:`;
        }else if(charC == 0x20){
            //space, " " => ideographic space, "　" (全角スペース)
            console.log(`BFC-HACKER:No.${i}(${str[i]}) is SPACE`);
            needsSpaceBefore = false;
            hack[i] = `　`;
        }else{
            //semicolon,latin small,spaceのどれでもない
            console.log(`BFC-HACKER:No.${i}(${str[i]}) is other charactor`);
            needsSpaceBefore = true;
            hack[i] = `${space()}${str[i]}`;
        }
    }
    return hack;
};

const space = () => needsSpaceBefore?`\u200b`:``;
