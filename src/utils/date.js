// date.js
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    let dateArr = dateStr.split(separator);
    let year = parseInt(dateArr[0]);
    let month;
    //处理月份为04这样的情况
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    let day = parseInt(dateArr[2]);
    let date = new Date(year, month - 1, day);
    return date;
}

export function getRelativeTimeByHours(hours = 0, dateStr = Date.now()) {
    // 获取相对于dateStr的相对小时 时间
    if (typeof dateStr !== 'number') dateStr = Date.now()
    return new Date(dateStr + hours * 60 * 60 * 1000)
}

export function getRelativeTimeByMonths(months = 0, date = new Date()) {
    // 获取相对于date的相对月 时间
    if (typeof date === 'number') date = new Date(date || "")
    date.setMonth(date.getMonth() + months)
    return date
}