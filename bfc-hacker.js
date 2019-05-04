// ==UserScript==
// @name             BFC-HACKER midnight
// @namespace        https://github.com/mominisjapan
// @version          4m.3
// @description      best-friends.chatのハッカー絵文字を簡単に入力
// @author           Mominis
// @match            https://best-friends.chat/*
// @grant            none
// @run-at           document-end
// ==/UserScript==
const version = "4m.3";
window.onload = () => {
    console.log(`BFC-HACKER ${version}\nBy Mominis(mn@best-friends.chat)`);
    const elm = document.createElement('button');
    elm.innerHTML = `HACKER!`;
    elm.style = `background-color:#000000;color:#FFFFFF;font-weight:bolder;font-style:italic;width:100%;font-size:200%;`;
    elm.onclick = `toHacker(document.getElementsByClassName('autosuggest-textarea__textarea')[0].innerText)`;
    document.getElementsByClassName('compose-form')[0].appendChild(elm);
    elm.addEventListener('click',hacking);
}
/*
const nanka = (str,i) => {
    if(str.codePointAt(0) >= 0x61 && str.codePointAt(0) <= 0x7a){
        //LATIN SMALL LETTER A~Z
        console.log('BFC-HACKER:LATIN SMALL LETTER A~Z, No.'+i);
        return `:hacker_${str}: `;
    }else if(str.codePointAt(0) == 0x20){
        //SPACE => IDEOGRAPHIC SPACE,いわゆる全角スペース
        console.log('BFC-HACKER:SPACE, '+i);
        return `　`;
    }
    else{
        console.log('BFC-HACKER:Other charactor, No.'+i);
        return str;
    }
};
const toHacker = () => {
    const tar = document.getElementsByClassName('autosuggest-textarea__textarea')[0],
          str = tar.innerHTML.toLowerCase();
    let ret = [];
    for(let i=0;i!=str.length;i++){
        ret[i] = nanka(str[i],i);
    }
    console.log(str);
    tar.value = ret.join('');
};
*/
const hacking = () => {
    let textarea = document.getElementsByClassName('autosuggest-textarea__textarea')[0]
    textarea.value = sift(textarea.innerHTML.toLowerCase()).join('');
}

let needsSpaceBefore = false;
const sift = (str) => {
    needsSpaceBefore = false;
    let hack = [];
    for(let i=0;i!=str.length;i++){
        if(str.codePointAt(i) >= 0x61 && str.codePointAt(i) <= 0x7a){
            //latin small, "abcdefghijklmnopqrstuvwxyz"
            console.log('BFC-HACKER:LATIN SMALL LETTER A~Z, No.'+i);
            needsSpaceBefore = true
            hack[i] = `${space()}:hacker_${str[i]}:`;
        }else if(str.codePointAt(i) == 0x20){
            //space, " " => ideographic space, "　" (全角スペース)
            console.log('BFC-HACKER:SPACE, No.'+i);
            needsSpaceBefore = false;
            hack[i] = `　`;
        }else{
            console.log('BFC-HACKER:Other charactor, No.'+i);
            needsSpaceBefore = true;
            hack[i] = `${space()}${str[i]}`;
        }
    }
    return hack;
};

const space = () => {
    if(needsSpaceBefore){
        return `\u200b`;//ZERO WIDTH SPACE
    }else{
        return ``;
    }
}