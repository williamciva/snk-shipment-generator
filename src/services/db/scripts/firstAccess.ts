import db from '../db'
import fs from 'fs';

export const firstAccess = (): boolean => {
    let isFirstAccess = true;
    db.exec(
        fs.readFileSync(__dirname + '/sql/firtsAcess.sql').toString(),
        (error) => error !== null ? console.log(error) : null
    )
    db.get('SELECT COUNT(*) as QTD FROM ACCESS', (__, res) => {
        const qtd = res as {
            QTD: number;
        }
        qtd.QTD === 0 ? isFirstAccess = true : isFirstAccess = false
    })
    return isFirstAccess
}