import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import path from 'path'
import fs from 'fs'

import File from 'App/Models/File'

export default class FilesController {

  public async store ({ request }: HttpContextContract) {

    const uploadSchema = schema.create({
      model_name: schema.string(),
      model_id: schema.number(),
      image: schema.file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      }),
    })

    const data = await request.validate({ schema: uploadSchema })

    const model = { model_name: data.model_name }
    const id    = { model_id:   data.model_id }

    const file = await File.firstOrCreate(model, id)

    const uploadsPath = Application.tmpPath('uploads')

    if (file && file.file_name) {
      const imagePath = path.join(uploadsPath, file.file_name)
      const imageExists = fs.existsSync(imagePath)

      if (imageExists) await fs.promises.unlink(imagePath)
    }

    const name = `${new Date().getTime()}.${data.image.extname}`

    await data.image.move( uploadsPath, { name })

    file.file_name = name

    await file.save()

    return 'File uploaded successfully'
  }

  async show ({ params, response }) {
    return response.download(Application.tmpPath(`uploads/${params.path}`))
  }

}
