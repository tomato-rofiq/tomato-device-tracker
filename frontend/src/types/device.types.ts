export type DeviceStatus = 'active' | 'inactive' | 'disposed' | 'unknown';

export type DeviceCategory = 'desktop' | 'laptop' | 'tablet' | 'mac';

export interface Device {
  id: string;              // G: 番号
  name: string;            // H: PC名
  status: DeviceStatus;    // C: 状況
  classification: string;  // D: 分類
  purpose: string;         // E: 用途
  category: DeviceCategory;// F: 区分
  currentUser: string;     // I: 現在使用者
  employmentStatus: string;// J: 在/退職
  previousUser: string;    // K: 以前使用者
  location: string;        // L: 場所
  condition: string;       // M: 状態
  notes: string;           // N: 備考
  loanDate: string;        // O: 貸出日
  loanSlip: string;        // P: 貸出証
  manufacturer: string;    // Q: 製造社
  modelName: string;       // R: モデル名
  cpu: string;             // S: CPU
  ram: string;             // T: RAM
  purchaseDate: string;    // U: 購入日
  osName: string;          // V: OS名
  os: string;              // W: OS
  backup: string;          // X: バックアップ
  loginAccount: string;    // Y: ログインア
  office: string;          // Z: Office情報
  ip: string;              // AA: IP
}

export interface DeviceUpdatePayload {
  id: string;
  status: DeviceStatus;
  classification: string;
  purpose: string;
  category: DeviceCategory;
  location: string;
  currentUser: string;
}

export interface DeviceHistory {
  deviceId: string;
  updatedAt: string;
  updatedBy: string;
  changes: Partial<Device>; //partial type to represent only the fields that were changed
}
