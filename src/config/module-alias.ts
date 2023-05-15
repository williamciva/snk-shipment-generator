import { join } from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({ 
    '@': join(__dirname, '..'),
    '@db': join(__dirname, '../services/db') 
})