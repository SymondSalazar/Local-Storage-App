import {join, dirname} from 'node:path'

export const SAVE_DIR = join(dirname(new URL(import.meta.url).pathname).slice(1,),'SaveData')

