interface SessionToken {
  id?: bigint;
  user_id: bigint;
  refresh_token: string;
  ip_address: string;
  device_info: string;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  created_at?: Date;
  enable?: boolean;
}

export default SessionToken;
