export const RESERVATION_API_SERVER = process.env.REACT_APP_RESERVATION_API_URL ? process.env.REACT_APP_RESERVATION_API_URL : 'http://127.0.0.1:5000';

export const inventoryCodes = [
  // 出庫
  { name: '員購出庫', inventoryCode: -1, inventoryType: -1 },
  { name: '調貨出庫', inventoryCode: -2, inventoryType: -1 },
  { name: '行銷出庫', inventoryCode: -3, inventoryType: -1 },
  { name: '其他出庫', inventoryCode: -4, inventoryType: -1 },
  // 入庫
  { name: '調貨入庫', inventoryCode: 1, inventoryType: 1 },
  { name: '商品入庫', inventoryCode: 2, inventoryType: 1 },
  { name: '退貨入庫', inventoryCode: 3, inventoryType: 1 },
  { name: '其他入庫', inventoryCode: 4, inventoryType: 1 },
];

export const inventoryCodeNameMap = inventoryCodes.reduce((accumulator, currentValue) => (
  { ...accumulator, [currentValue.inventoryCode]: currentValue.name }), {});

export const permissionGroupMap = {
  admin: 'Admin',
  workstation: '工位數量',
  fix_order: '維修工單',
  reservation: '預約單',
  week_schedule: '一週來客狀態',
};

export const monthStrArray = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export const durationObjectArray = [
  { title: '12:00', startTime: '12:00:00', endTime: '13:00:00' },
  { title: '13:00', startTime: '13:00:00', endTime: '14:00:00' },
  { title: '14:00', startTime: '14:00:00', endTime: '15:00:00' },
  { title: '15:00', startTime: '15:00:00', endTime: '16:00:00' },
  { title: '16:00', startTime: '16:00:00', endTime: '17:00:00' },
  { title: '17:00', startTime: '17:00:00', endTime: '18:00:00' },
  { title: '18:00', startTime: '18:00:00', endTime: '19:00:00' },
  { title: '19:00', startTime: '19:00:00', endTime: '20:00:00' },
  { title: '20:00', startTime: '20:00:00', endTime: '21:00:00' },
];
