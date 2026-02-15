import * as Create from "./Create";
import * as GetAll from "./GetAll";
import * as Update from "./Update";
import * as GetById from "./GetById";
import * as Delete from "./Delete"

export const categoryController = {
    ...Create, ...GetAll, ...Update, ...GetById, ...Delete
}