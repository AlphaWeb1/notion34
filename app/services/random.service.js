
exports.getNumber = (length) => {
    try{
        let number = '';
        const pool = '0123456789';
        const arrayPool = pool.split('');
        if (length > 1) {
            for ( var i = 0; i < Math.ceil(length/2) ; i++ ) {
                number = ((length % 2) == 1 && (length - i) == 1) ?
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}` :
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
            }
        } else {
            number = `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
        }
        return number;
    } catch (error) {
        console.log('[!] Failed to create OTP:', error);
        return null;
    }
}

exports.getToken = (length) => {
    try{
        let number = '';
        const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabdcefghijklmnopqrstuvwxyz';
        const arrayPool = pool.split('');
        if (length > 1) {
            for ( var i = 0; i < Math.ceil(length/2) ; i++ ) {
                number = ((length % 2) == 1 && (length - i) == 1) ?
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}` :
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
            }
        } else {
            number = `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
        }
        return number;
    } catch (error) {
        console.log('[!] Failed to create OTP:', error);
        return null;
    }
}

exports.getTokenStrict = (length) => {
    try{
        let number = '';
        const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const arrayPool = pool.split('');
        if (length > 1) {
            for ( var i = 0; i < Math.ceil(length/2) ; i++ ) {
                number = ((length % 2) == 1 && (length - i) == 1) ?
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}` :
                    `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
            }
        } else {
            number = `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
        }
        return number;
    } catch (error) {
        console.log('[!] Failed to create OTP:', error);
        return null;
    }
}

exports.getTokenSymbolic = (length) => {
    try{
        let number = '';
        const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabdcefghijklmnopqrstuvwxyz~!@#$%^&*()_+{}|?=-`<>,.:;\'\"\\/';
        const arrayPool = pool.split('');
        for ( var i = 0; i < Math.ceil(length/2) ; i++ ) {
            number = ((length % 2) == 1 && (length - i) == 1) ?
                `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}` :
                `${number}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}${arrayPool[Math.floor(Math.random() * arrayPool.length)]}`;
        }
        return number;
    } catch (error) {
        console.log('[!] Failed to create OTP:', error);
        return null;
    }
}