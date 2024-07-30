

const convertMonth = (month) => {
    let newX = 0

    switch (month) {
        case 'Январь': newX = 1
            break
        case 'Февраль': newX = 2
            break
        case 'Март': newX = 3
            break
        case 'Апрель': newX = 4
            break
        case 'Май': newX = 5
            break
        case 'Июнь': newX = 6
            break
        case 'Июль': newX = 7
            break
        case 'Август': newX = 8
            break
        case 'Сентябрь': newX = 9
            break
        case 'Октябрь': newX = 10
            break
        case 'Ноябрь': newX = 11
            break
        case 'Декабрь': newX = 12
            break

    }
    return newX
}


module.exports = convertMonth