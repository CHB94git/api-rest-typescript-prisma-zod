import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${ __dirname }`

const router = Router()

const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift()
}

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanedName = cleanFileName(filename)

  if (cleanedName !== 'index') {
    import(`./${ cleanedName }`)
      .then((moduleRouter) => {
        router.use(`/${ cleanedName }`, moduleRouter.router)
      })
  }
})

export default router