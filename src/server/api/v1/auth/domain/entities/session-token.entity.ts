class SessionTokenEntity {
  public user_id: bigint;
  public refresh_token: string;
  public ip_address: string;
  public device_info: string;
  public id?: bigint;
  public city?: string | null;
  public region?: string | null;
  public country?: string | null;
  public created_at?: Date;
  public enable?: boolean;

  constructor(
    user_id: bigint,
    refresh_token: string,
    ip_address: string,
    device_info: string,
    id?: bigint,
    city?: string | null,
    region?: string | null,
    country?: string | null,
    created_at?: Date,
    enable?: boolean
  ) {
    this.user_id = user_id;
    this.refresh_token = refresh_token;
    this.ip_address = ip_address;
    this.device_info = device_info;
    this.id = id;
    this.city = city;
    this.region = region;
    this.country = country;
    this.created_at = created_at;
    this.enable = enable;
  }
}

export default SessionTokenEntity;
