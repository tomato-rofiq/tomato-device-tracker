export type DeviceStatus = '使用中' | '未使用' | '破棄' | '使用不可' | '不明';
export type DeviceCategory = 'Desktop' | 'NotePC' | 'Mac' | 'Surface' | 'Tablet';
export type DeviceClassification = '営業管理部' | '現場貸出' | '開発サーバー' | '社内開発' | '貸出(社内開発)' | '貸出(現場)' | '本社待機者' | '新人教育';
export type DevicePurpose = '営業PC' | 'サーバー' | '入館チェック' | '会議室' | '開発PC' | '開発MAC' | '現場用';
export type DeviceLocation = '本社' | '本社(開発室)' | '本社(開発室-PCラック)' | '現場' | '自宅';

export interface Device {
  id: string;              // G: 番号
  name: string;            // H: PC名 
  status: DeviceStatus;    // C: 状況
  classification: DeviceClassification;  // D: 分類
  purpose: DevicePurpose;         // E: 用途
  category: DeviceCategory;// F: 区分
  currentUser: string;     // I: 現在使用者
  employmentStatus: string;// J: 在/退職
  previousUser: string;    // K: 以前使用者
  location: DeviceLocation;        // L: 場所
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
  osLicense: string;              // W: OS License
  backup: string;          // X: バックアップ
  loginAccount: string;    // Y: ログインア
  office: string;          // Z: Office情報
  ip: string;              // AA: IP
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
