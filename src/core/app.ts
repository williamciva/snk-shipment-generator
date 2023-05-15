import { home, firstLogin } from '@/views'

import { firstAccess } from '@db/scripts'


if (firstAccess()) {
    firstLogin()
} else {
    home()
}
