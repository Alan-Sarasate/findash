import * as GetAll from './GetAll'
import * as Create from './Create'
import * as GetById from './GetById'
import * as Update from './Update'
import * as Delete from './Delete'

export const transactionsController = { ...GetAll, ...GetById, ...Create, ...Update, ...Delete }