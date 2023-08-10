export interface IChar {
    email: string;
    name: string;
    base_level: number;
    job_level: number;
    last_map: string;
    last_x: number;
    last_y: number;
    char_id: number;
    account_id: number;
    last_ip: string;
    end_date_ban: Date | null;
    end_date_bg_lock: Date | null;
    end_date_woe_lock: Date | null;
    is_ban: boolean;
    is_bg_lock: boolean;
    is_woe_lock: boolean;
    start_date_ban: Date | null;
    start_date_bg_lock: Date | null;
    start_date_woe_lock: Date | null;
}
