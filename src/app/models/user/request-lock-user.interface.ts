export interface IRequestLockUser {
    account_id: number;
    is_bg_lock: boolean;
    start_date_bg_lock: Date | null;
    end_date_bg_lock: Date | null;
    is_woe_lock: boolean;
    start_date_woe_lock: Date | null;
    end_date_woe_lock: Date | null;
    is_ban: boolean;
    start_date_ban: Date | null;
    end_date_ban: Date | null;
    admin: string;
}