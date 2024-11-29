import { ErrorHandler } from '@src/shared/errors';

import { SessionTokenSchema } from '../schemas';

class SessionTokenDto {
  public user_id: bigint;
  public refresh_token: string;
  public refresh_token_expiration_date: Date;
  public ip_address: string;
  public device_info: string;
  public city?: string | null;
  public region?: string | null;
  public country?: string | null;

  constructor(
    user_id: bigint,
    refresh_token: string,
    refresh_token_expiration_date: Date,
    ip_address: string,
    device_info: string,
    city?: string | null,
    region?: string | null,
    country?: string | null
  ) {
    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.refresh_token_expiration_date = refresh_token_expiration_date;
    this.ip_address = ip_address;
    this.device_info = device_info;
    this.city = city;
    this.region = region;
    this.country = country;
  }

  static create(object: { [key: string]: any }): [string?, SessionTokenDto?] {
    const { error, data } = SessionTokenSchema.safeParse(object);

    if (error) return [ErrorHandler.validate(error)];

    const { user_id, refresh_token, refresh_token_expiration_date, ip_address, device_info, region, city, country } =
      data;

    return [
      undefined,
      new SessionTokenDto(
        user_id,
        refresh_token,
        new Date(refresh_token_expiration_date),
        ip_address,
        device_info,
        region,
        city,
        country
      )
    ];
  }
}

export default SessionTokenDto;
