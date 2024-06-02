import { API } from "@/constants/index";
import axios from "axios";
import https from "https";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiODZjMWRlNGYtYzM4Ny00YTMwLThhYzgtNzNhMzcxNmI3ODMzIiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcxNzI5ODE1NX0.f0TzSAT5hMN5HFQKqrXhCxEbNePnM9Ynu3q1zxEm0_KrRNJznyuLWk_mABeEZKGwChsw1pAZ6gQBgj1x0F_jgvxLNudpmChMuTCqWCj0ne95bspesV1u5GU1xzsp7zcFQkOxIZjhCFU10pZt7IiMuihdZT3n6AaHV2CXeUSgVUPhhEeXQ1JHPbMKxe3x_96LqoROs-zamji0z_F7tJcfD5FTQYbAKV6biI3zen-bG_NkSVhA-QSxxjXOmmZvpbRCFLNB6AXZMccwWcb1SvvC2bdiuYSdzZWBeZEOqOQb8YUqbGC96eD_II5nO_Wy2ioPUUeniAhjXJv_QifwSjqGavzVsVxVOroatKIb56rt6KqDvfhwMrupdHx7aaLDUeSbTUrtP3XRNlagsql0Z8Gd7CGA1_fxJ6PeDLTwA8qalMPfz1ED-0dDeonhbKKsZuKV3PhCF5Aga3ppFu0xhZeLKRZIQQuS7PElsNrC23ThK8zqxbR0Y-43Ft5_EPYFHMT84obcEDlAHqQlzG6eLHoyrDXoEzC_UCJouuc1xB7HbwX_MXgkIwgDDisMvmk3IFpdTXxYUnAjnpYVekY9JcgmSmwA3M0CrG-6W7_fSXiTwokVfP1_DNasAVvQ24XgAkUc7Wxia6m90YJpyZHxsxkhhyNJG86XWVJDYiXfbf1DFck";

export const Api = axios.create({
  baseURL: API,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Authorization: "Bearer " + token,
  },
});
