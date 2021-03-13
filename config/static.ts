import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  /*
  | The static files are served from the `public` directory.
  | You can override the default path inside `.adonisrc.json`
  */
  enabled: true,

  /*
  | - ignore: Behave as if the file doesn't exists. Results in 404.
  | - deny: Deny access to the file. Results in 403.
  | - allow: Serve the file contents
  */
  dotFiles: 'ignore',

  /*
  | Handle whether or not to generate etags for the files. Etag allows browser
  | to utilize the cache when file hasn't been changed.
  */
  etag: true,

  /*
  | Whether or not to set the `Last-Modified` header in the response. Uses
  | the file system's last modified value.
  */
  lastModified: false,
}

export default staticConfig
