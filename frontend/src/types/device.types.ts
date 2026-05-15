export type DeviceStatus = '1使用中' | '2未使用' | '3破棄' | '4使用不可' | '5不明';
export type DeviceCategory = '1Desktop' | '2NotePC' | '3Mac' | '4Surface' | '5Tablet';
export type DeviceClassification = '1営業管理部' | '2現場貸出' | '3開発サーバー' | '4社内開発' | '5貸出(社内開発)' | '6貸出(現場)' | '7本社待機者' | '8新人教育';
export type DevicePurpose = '1営業PC' | '2サーバー' | '3入館チェック' | '4会議室' | '5開発PC' | '6開発MAC' | '7現場用';
export type DeviceLocation = '1本社' | '2本社(開発室)' | '3本社(開発室-PCラック)' | '4現場' | '5自宅';
export type RamAmount = '4GB' | '8GB' | '12GB' | '16GB' | '32GB' | '64GB' | '128GB';

export interface Device {
  id: string;                           // G: 番号
  name: string;                         // H: PC名 
  status: DeviceStatus;                 // C: 状況
  classification: DeviceClassification; // D: 分類
  purpose: DevicePurpose;               // E: 用途
  category: DeviceCategory;             // F: 区分
  currentUser: string;                  // I: 現在使用者
  employmentStatus: string;             // J: 在/退職
  previousUser: string;                 // K: 以前使用者
  location: DeviceLocation;             // L: 場所
  condition: string;                    // M: 状態
  notes: string;                        // N: 備考
  loanDate: string;                     // O: 貸出日
  loanSlip: string;                     // P: 貸出証
  manufacturer: string;                 // Q: 製造社
  modelName: string;                    // R: モデル名
  cpu: string;                          // S: CPU
  ram: RamAmount;                       // T: RAM
  purchaseDate: string;                 // U: 購入日
  osName: string;                       // V: OS名
  osLicense: string;                    // W: OS License
  backup: string;                       // X: バックアップ
  loginAccount: string;                 // Y: ログインアカウント
  office: string;                       // Z: Office情報
  ip: string;                           // AA: IP
}

export interface DeviceUpdatePayload {
  id: string;
  status: DeviceStatus;
  classification: DeviceClassification;
  purpose: DevicePurpose;
  category: DeviceCategory;
  location: DeviceLocation;
  currentUser: string;
}

export interface DeviceHistory {
  deviceId: string;
  updatedAt: string;
  updatedBy: string;
  changes: Partial<Device>; //partial type to represent only the fields that were changed
}
