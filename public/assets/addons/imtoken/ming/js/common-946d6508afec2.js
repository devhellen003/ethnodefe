//fun
function copyText(text, callback) {
    try {
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999);
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            if (callback) {
                callback();
            }
        }
        document.body.removeChild(input);
    } catch (e) {
        toast(e);
    }
}

function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHIZKLMNOPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function getTimeString(time) {
    //var date = new Date(time);
    var date = new Date(time * 1000);
    var year = date.getFullYear() + '-';
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var dates = date.getDate() + ' ';
    var hour = date.getHours() + ':';
    var min = date.getMinutes() + ':';
    var second = date.getSeconds();
    return year + month + dates + hour + min + second;
}

function getQueryString(name) {
    let iframe = self == top ? window : window.parent;
    let reg = `(^|&)${name}=([^&]*)(&|$)`
    let r = iframe.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}