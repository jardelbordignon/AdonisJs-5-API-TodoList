declare module '@ioc:Adonis/Core/Request' {

  interface RequestContract {
    country?: string
    requestBody: any
  }

}
