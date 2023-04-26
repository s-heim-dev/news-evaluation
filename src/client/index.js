import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { notEmpty, isUrl } from './js/urlChecker'
import { handleSubmit } from './js/formHandler'
import { displayResult, markUrlInputInfo } from './js/resultDisplay'

export {
    handleSubmit,
    notEmpty,
    isUrl,
    displayResult,
    markUrlInputInfo
}
