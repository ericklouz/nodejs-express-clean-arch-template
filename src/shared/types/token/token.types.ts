export type GenerateToken = (_payload: object, _duration: string | number, _seed?: string) => Promise<string | null>;
export type ValidateToken<T> = (_token: string, _seed?: string) => Promise<T | null>;
