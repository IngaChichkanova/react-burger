type TCookie<T> = T extends number ? number : (T extends Date ? Date : any);

export function setCookie(name: string, value: string, props?: { [prop in string]: TCookie<prop> }): void {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
    setCookie(name, '', { expires: -1 });
}

export function getCookie(name: string): string | undefined {
    const matchesAll = document.cookie.match(
        new RegExp('(?:|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)', 'g') //eslint-disable-line
    );
    if (matchesAll && matchesAll.length > 0) {
        const matches: any = matchesAll[matchesAll.length - 1].match(
            new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') //eslint-disable-line
        );
        
        return matches ? matches[1] : undefined
    } else {
        return undefined
    }
}