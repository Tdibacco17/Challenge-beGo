export interface EnviromentInterface {
    PORT: string | undefined,
    HOST: string | undefined,
    MONGODB_URI: string | undefined,
    MONGODB_PASS_AUTH: string | undefined,
    JWT_SECRET: string | undefined,
    JWT_ALGORITHM: string | undefined,
    JWT_EXPIRE: string | undefined
}