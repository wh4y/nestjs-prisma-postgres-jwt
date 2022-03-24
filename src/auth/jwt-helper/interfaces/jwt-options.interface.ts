interface JwtSignOptions {
  expiresIn: string,
  secret: string
}

export interface JwtOptions {
  sign: {
    accessToken: JwtSignOptions,
    refreshToken: JwtSignOptions
  },
  verification: {
    accessSecret: string,
    refreshSecret: string
  }
}
