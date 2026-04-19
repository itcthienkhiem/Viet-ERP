
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  taxCode: 'taxCode',
  address: 'address',
  phone: 'phone',
  email: 'email',
  logo: 'logo',
  settings: 'settings',
  subscriptionTier: 'subscriptionTier',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  email: 'email',
  passwordHash: 'passwordHash',
  name: 'name',
  role: 'role',
  employeeId: 'employeeId',
  isActive: 'isActive',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  description: 'description',
  parentId: 'parentId',
  managerId: 'managerId',
  costCenterCode: 'costCenterCode',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PositionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  level: 'level',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BranchScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  address: 'address',
  phone: 'phone',
  email: 'email',
  isHeadquarters: 'isHeadquarters',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeCode: 'employeeCode',
  fullName: 'fullName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  idNumber: 'idNumber',
  idIssueDate: 'idIssueDate',
  idIssuePlace: 'idIssuePlace',
  taxCode: 'taxCode',
  socialInsuranceNumber: 'socialInsuranceNumber',
  socialInsuranceDate: 'socialInsuranceDate',
  phone: 'phone',
  personalEmail: 'personalEmail',
  workEmail: 'workEmail',
  permanentAddress: 'permanentAddress',
  currentAddress: 'currentAddress',
  bankAccount: 'bankAccount',
  bankName: 'bankName',
  bankBranch: 'bankBranch',
  departmentId: 'departmentId',
  positionId: 'positionId',
  branchId: 'branchId',
  directManagerId: 'directManagerId',
  hireDate: 'hireDate',
  probationEndDate: 'probationEndDate',
  status: 'status',
  resignationDate: 'resignationDate',
  resignationReason: 'resignationReason',
  avatar: 'avatar',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DependentScalarFieldEnum = {
  id: 'id',
  employeeId: 'employeeId',
  fullName: 'fullName',
  relationship: 'relationship',
  dateOfBirth: 'dateOfBirth',
  idNumber: 'idNumber',
  taxDeductionFrom: 'taxDeductionFrom',
  taxDeductionTo: 'taxDeductionTo',
  deductionDocument: 'deductionDocument',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContractScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  contractNumber: 'contractNumber',
  contractType: 'contractType',
  signedDate: 'signedDate',
  startDate: 'startDate',
  endDate: 'endDate',
  baseSalary: 'baseSalary',
  salaryType: 'salaryType',
  insuranceSalary: 'insuranceSalary',
  allowances: 'allowances',
  workSchedule: 'workSchedule',
  status: 'status',
  terminationDate: 'terminationDate',
  terminationReason: 'terminationReason',
  attachmentUrl: 'attachmentUrl',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  userEmail: 'userEmail',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  entityName: 'entityName',
  oldData: 'oldData',
  newData: 'newData',
  changes: 'changes',
  metadata: 'metadata',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.EmployeeChangeHistoryScalarFieldEnum = {
  id: 'id',
  employeeId: 'employeeId',
  fieldName: 'fieldName',
  oldValue: 'oldValue',
  newValue: 'newValue',
  changedBy: 'changedBy',
  changedAt: 'changedAt',
  reason: 'reason',
  effectiveDate: 'effectiveDate'
};

exports.Prisma.ShiftScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  shiftType: 'shiftType',
  startTime: 'startTime',
  endTime: 'endTime',
  breakStartTime: 'breakStartTime',
  breakEndTime: 'breakEndTime',
  breakMinutes: 'breakMinutes',
  workHoursPerDay: 'workHoursPerDay',
  lateGrace: 'lateGrace',
  earlyGrace: 'earlyGrace',
  otStartAfter: 'otStartAfter',
  nightShiftStart: 'nightShiftStart',
  nightShiftEnd: 'nightShiftEnd',
  isOvernight: 'isOvernight',
  color: 'color',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShiftAssignmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  shiftId: 'shiftId',
  startDate: 'startDate',
  endDate: 'endDate',
  isRecurring: 'isRecurring',
  daysOfWeek: 'daysOfWeek',
  isPrimary: 'isPrimary',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkScheduleScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  weeklySchedule: 'weeklySchedule',
  departmentId: 'departmentId',
  branchId: 'branchId',
  isDefault: 'isDefault',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HolidayScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  date: 'date',
  endDate: 'endDate',
  dayType: 'dayType',
  compensatoryDate: 'compensatoryDate',
  isRecurring: 'isRecurring',
  isNational: 'isNational',
  year: 'year',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  shiftId: 'shiftId',
  date: 'date',
  dayType: 'dayType',
  checkIn: 'checkIn',
  checkOut: 'checkOut',
  checkInSource: 'checkInSource',
  checkOutSource: 'checkOutSource',
  checkInLat: 'checkInLat',
  checkInLng: 'checkInLng',
  checkOutLat: 'checkOutLat',
  checkOutLng: 'checkOutLng',
  checkInAddress: 'checkInAddress',
  checkOutAddress: 'checkOutAddress',
  status: 'status',
  workHours: 'workHours',
  otHours: 'otHours',
  nightHours: 'nightHours',
  lateMinutes: 'lateMinutes',
  earlyMinutes: 'earlyMinutes',
  isManualEntry: 'isManualEntry',
  adjustedBy: 'adjustedBy',
  adjustmentNote: 'adjustmentNote',
  leaveRequestId: 'leaveRequestId',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OvertimeRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime',
  plannedHours: 'plannedHours',
  actualHours: 'actualHours',
  dayType: 'dayType',
  isNightShift: 'isNightShift',
  multiplier: 'multiplier',
  reason: 'reason',
  status: 'status',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  rejectionReason: 'rejectionReason',
  attachmentUrl: 'attachmentUrl',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceSummaryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  year: 'year',
  month: 'month',
  workingDays: 'workingDays',
  actualWorkDays: 'actualWorkDays',
  presentDays: 'presentDays',
  absentDays: 'absentDays',
  paidLeaveDays: 'paidLeaveDays',
  unpaidLeaveDays: 'unpaidLeaveDays',
  sickLeaveDays: 'sickLeaveDays',
  totalWorkHours: 'totalWorkHours',
  standardHours: 'standardHours',
  otWeekdayHours: 'otWeekdayHours',
  otWeekendHours: 'otWeekendHours',
  otHolidayHours: 'otHolidayHours',
  otNightHours: 'otNightHours',
  totalOtHours: 'totalOtHours',
  lateTimes: 'lateTimes',
  earlyLeaveTimes: 'earlyLeaveTimes',
  totalLateMinutes: 'totalLateMinutes',
  totalEarlyMinutes: 'totalEarlyMinutes',
  anomalyCount: 'anomalyCount',
  unresolvedAnomalies: 'unresolvedAnomalies',
  isLocked: 'isLocked',
  lockedAt: 'lockedAt',
  lockedBy: 'lockedBy',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceAnomalyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  attendanceId: 'attendanceId',
  employeeId: 'employeeId',
  type: 'type',
  severity: 'severity',
  description: 'description',
  detectedAt: 'detectedAt',
  detectedBy: 'detectedBy',
  isResolved: 'isResolved',
  resolvedAt: 'resolvedAt',
  resolvedBy: 'resolvedBy',
  resolution: 'resolution',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayrollConfigScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  bhxhEmployeeRate: 'bhxhEmployeeRate',
  bhxhEmployerRate: 'bhxhEmployerRate',
  bhytEmployeeRate: 'bhytEmployeeRate',
  bhytEmployerRate: 'bhytEmployerRate',
  bhtnEmployeeRate: 'bhtnEmployeeRate',
  bhtnEmployerRate: 'bhtnEmployerRate',
  insuranceSalaryCap: 'insuranceSalaryCap',
  personalDeduction: 'personalDeduction',
  dependentDeduction: 'dependentDeduction',
  pitBrackets: 'pitBrackets',
  otWeekdayRate: 'otWeekdayRate',
  otWeekendRate: 'otWeekendRate',
  otHolidayRate: 'otHolidayRate',
  otNightBonus: 'otNightBonus',
  standardWorkDays: 'standardWorkDays',
  standardWorkHours: 'standardWorkHours',
  isActive: 'isActive',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalaryComponentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  category: 'category',
  itemType: 'itemType',
  defaultAmount: 'defaultAmount',
  isPercentage: 'isPercentage',
  percentageBase: 'percentageBase',
  isTaxable: 'isTaxable',
  isInsuranceable: 'isInsuranceable',
  sortOrder: 'sortOrder',
  isSystem: 'isSystem',
  isActive: 'isActive',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayrollPeriodScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  year: 'year',
  month: 'month',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  status: 'status',
  calculatedAt: 'calculatedAt',
  approvedAt: 'approvedAt',
  approvedBy: 'approvedBy',
  paidAt: 'paidAt',
  totalEmployees: 'totalEmployees',
  totalGross: 'totalGross',
  totalDeductions: 'totalDeductions',
  totalNet: 'totalNet',
  totalEmployerCost: 'totalEmployerCost',
  isLocked: 'isLocked',
  lockedAt: 'lockedAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayrollScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  periodId: 'periodId',
  employeeId: 'employeeId',
  employeeCode: 'employeeCode',
  employeeName: 'employeeName',
  departmentName: 'departmentName',
  positionName: 'positionName',
  baseSalary: 'baseSalary',
  insuranceSalary: 'insuranceSalary',
  workDays: 'workDays',
  standardDays: 'standardDays',
  otHoursWeekday: 'otHoursWeekday',
  otHoursWeekend: 'otHoursWeekend',
  otHoursHoliday: 'otHoursHoliday',
  otHoursNight: 'otHoursNight',
  grossSalary: 'grossSalary',
  bhxhEmployee: 'bhxhEmployee',
  bhytEmployee: 'bhytEmployee',
  bhtnEmployee: 'bhtnEmployee',
  totalInsuranceEmployee: 'totalInsuranceEmployee',
  taxableIncome: 'taxableIncome',
  personalDeduction: 'personalDeduction',
  dependentDeduction: 'dependentDeduction',
  dependentCount: 'dependentCount',
  assessableIncome: 'assessableIncome',
  pit: 'pit',
  otherDeductions: 'otherDeductions',
  totalDeductions: 'totalDeductions',
  netSalary: 'netSalary',
  bhxhEmployer: 'bhxhEmployer',
  bhytEmployer: 'bhytEmployer',
  bhtnEmployer: 'bhtnEmployer',
  totalEmployerCost: 'totalEmployerCost',
  bankAccount: 'bankAccount',
  bankName: 'bankName',
  bankCode: 'bankCode',
  status: 'status',
  isPaid: 'isPaid',
  paidAt: 'paidAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayrollItemScalarFieldEnum = {
  id: 'id',
  payrollId: 'payrollId',
  componentId: 'componentId',
  name: 'name',
  code: 'code',
  category: 'category',
  itemType: 'itemType',
  amount: 'amount',
  quantity: 'quantity',
  rate: 'rate',
  multiplier: 'multiplier',
  isTaxable: 'isTaxable',
  isInsuranceable: 'isInsuranceable',
  isManual: 'isManual',
  adjustmentId: 'adjustmentId',
  sortOrder: 'sortOrder',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PayrollAdjustmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  year: 'year',
  month: 'month',
  name: 'name',
  category: 'category',
  itemType: 'itemType',
  amount: 'amount',
  isTaxable: 'isTaxable',
  status: 'status',
  createdBy: 'createdBy',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  rejectionReason: 'rejectionReason',
  reason: 'reason',
  attachmentUrl: 'attachmentUrl',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BankPaymentBatchScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  periodId: 'periodId',
  batchNumber: 'batchNumber',
  bankCode: 'bankCode',
  bankName: 'bankName',
  totalRecords: 'totalRecords',
  totalAmount: 'totalAmount',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  fileFormat: 'fileFormat',
  status: 'status',
  generatedAt: 'generatedAt',
  processedAt: 'processedAt',
  processedBy: 'processedBy',
  bankReference: 'bankReference',
  successCount: 'successCount',
  failedCount: 'failedCount',
  bankResponseFile: 'bankResponseFile',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeavePolicyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  leaveType: 'leaveType',
  daysPerYear: 'daysPerYear',
  maxCarryOver: 'maxCarryOver',
  carryOverExpireMonths: 'carryOverExpireMonths',
  minDaysPerRequest: 'minDaysPerRequest',
  maxDaysPerRequest: 'maxDaysPerRequest',
  advanceNoticeDays: 'advanceNoticeDays',
  allowHalfDay: 'allowHalfDay',
  allowNegativeBalance: 'allowNegativeBalance',
  probationEligible: 'probationEligible',
  minTenureMonths: 'minTenureMonths',
  isPaid: 'isPaid',
  isActive: 'isActive',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeaveBalanceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  policyId: 'policyId',
  year: 'year',
  entitlement: 'entitlement',
  carryOver: 'carryOver',
  adjustment: 'adjustment',
  used: 'used',
  pending: 'pending',
  available: 'available',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeaveRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  policyId: 'policyId',
  requestCode: 'requestCode',
  startDate: 'startDate',
  endDate: 'endDate',
  totalDays: 'totalDays',
  startHalf: 'startHalf',
  endHalf: 'endHalf',
  reason: 'reason',
  handoverTo: 'handoverTo',
  handoverNotes: 'handoverNotes',
  attachments: 'attachments',
  status: 'status',
  workflowInstanceId: 'workflowInstanceId',
  cancelledAt: 'cancelledAt',
  cancelledBy: 'cancelledBy',
  cancelReason: 'cancelReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkflowDefinitionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  workflowType: 'workflowType',
  description: 'description',
  isActive: 'isActive',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkflowStepScalarFieldEnum = {
  id: 'id',
  definitionId: 'definitionId',
  stepOrder: 'stepOrder',
  name: 'name',
  approverType: 'approverType',
  specificUserId: 'specificUserId',
  specificRole: 'specificRole',
  conditions: 'conditions',
  slaHours: 'slaHours',
  canSkip: 'canSkip',
  approvalMode: 'approvalMode',
  requiredApprovals: 'requiredApprovals',
  approverUserIds: 'approverUserIds',
  createdAt: 'createdAt'
};

exports.Prisma.WorkflowInstanceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  definitionId: 'definitionId',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  requesterId: 'requesterId',
  status: 'status',
  currentStepOrder: 'currentStepOrder',
  context: 'context',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  finalStatus: 'finalStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApprovalStepScalarFieldEnum = {
  id: 'id',
  instanceId: 'instanceId',
  stepId: 'stepId',
  approverId: 'approverId',
  delegatedFromId: 'delegatedFromId',
  status: 'status',
  respondedAt: 'respondedAt',
  comments: 'comments',
  dueAt: 'dueAt',
  isOverdue: 'isOverdue',
  createdAt: 'createdAt'
};

exports.Prisma.DelegationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  delegatorId: 'delegatorId',
  delegateId: 'delegateId',
  startDate: 'startDate',
  endDate: 'endDate',
  workflowTypes: 'workflowTypes',
  reason: 'reason',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  type: 'type',
  title: 'title',
  message: 'message',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  actionUrl: 'actionUrl',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.ProfileUpdateRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  requestCode: 'requestCode',
  changes: 'changes',
  reason: 'reason',
  status: 'status',
  workflowInstanceId: 'workflowInstanceId',
  appliedAt: 'appliedAt',
  appliedBy: 'appliedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KnowledgeArticleScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  createdBy: 'createdBy',
  title: 'title',
  content: 'content',
  category: 'category',
  keywords: 'keywords',
  isPublished: 'isPublished',
  viewCount: 'viewCount',
  helpfulCount: 'helpfulCount',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AIConversationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  title: 'title',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AIMessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  role: 'role',
  content: 'content',
  intent: 'intent',
  confidence: 'confidence',
  actionType: 'actionType',
  actionData: 'actionData',
  isHelpful: 'isHelpful',
  feedback: 'feedback',
  createdAt: 'createdAt'
};

exports.Prisma.InsightScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  type: 'type',
  severity: 'severity',
  category: 'category',
  title: 'title',
  description: 'description',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  metrics: 'metrics',
  suggestions: 'suggestions',
  isRead: 'isRead',
  isDismissed: 'isDismissed',
  dismissedBy: 'dismissedBy',
  dismissedAt: 'dismissedAt',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  createdAt: 'createdAt'
};

exports.Prisma.SavedReportScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  name: 'name',
  description: 'description',
  reportType: 'reportType',
  parameters: 'parameters',
  isScheduled: 'isScheduled',
  cronExpression: 'cronExpression',
  recipients: 'recipients',
  lastRunAt: 'lastRunAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmailQueueScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  to: 'to',
  cc: 'cc',
  bcc: 'bcc',
  subject: 'subject',
  template: 'template',
  data: 'data',
  status: 'status',
  attempts: 'attempts',
  maxAttempts: 'maxAttempts',
  lastAttemptAt: 'lastAttemptAt',
  sentAt: 'sentAt',
  errorMessage: 'errorMessage',
  scheduledFor: 'scheduledFor',
  createdAt: 'createdAt'
};

exports.Prisma.EmailTemplateScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  code: 'code',
  name: 'name',
  description: 'description',
  subject: 'subject',
  bodyHtml: 'bodyHtml',
  bodyText: 'bodyText',
  variables: 'variables',
  isSystem: 'isSystem',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ImportJobScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  importType: 'importType',
  fileName: 'fileName',
  fileSize: 'fileSize',
  status: 'status',
  totalRows: 'totalRows',
  processedRows: 'processedRows',
  successRows: 'successRows',
  errorRows: 'errorRows',
  errors: 'errors',
  summary: 'summary',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  createdAt: 'createdAt'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  keyHash: 'keyHash',
  keyPrefix: 'keyPrefix',
  permissions: 'permissions',
  isActive: 'isActive',
  lastUsedAt: 'lastUsedAt',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  createdBy: 'createdBy'
};

exports.Prisma.WebhookScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  url: 'url',
  secret: 'secret',
  events: 'events',
  headers: 'headers',
  status: 'status',
  totalDeliveries: 'totalDeliveries',
  successDeliveries: 'successDeliveries',
  failedDeliveries: 'failedDeliveries',
  lastDeliveryAt: 'lastDeliveryAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WebhookDeliveryScalarFieldEnum = {
  id: 'id',
  webhookId: 'webhookId',
  event: 'event',
  payload: 'payload',
  status: 'status',
  statusCode: 'statusCode',
  responseBody: 'responseBody',
  errorMessage: 'errorMessage',
  attempts: 'attempts',
  duration: 'duration',
  createdAt: 'createdAt'
};

exports.Prisma.SystemConfigScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  category: 'category',
  key: 'key',
  value: 'value',
  description: 'description',
  updatedAt: 'updatedAt',
  updatedBy: 'updatedBy'
};

exports.Prisma.AnalyticsMetricScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  metricType: 'metricType',
  period: 'period',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  departmentId: 'departmentId',
  value: 'value',
  previousValue: 'previousValue',
  changePercent: 'changePercent',
  breakdown: 'breakdown',
  metadata: 'metadata',
  calculatedAt: 'calculatedAt'
};

exports.Prisma.TurnoverPredictionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  riskScore: 'riskScore',
  riskLevel: 'riskLevel',
  factors: 'factors',
  recommendations: 'recommendations',
  predictedAt: 'predictedAt',
  validUntil: 'validUntil'
};

exports.Prisma.DashboardScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  name: 'name',
  description: 'description',
  layout: 'layout',
  isDefault: 'isDefault',
  isShared: 'isShared',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DashboardWidgetScalarFieldEnum = {
  id: 'id',
  dashboardId: 'dashboardId',
  widgetType: 'widgetType',
  title: 'title',
  x: 'x',
  y: 'y',
  width: 'width',
  height: 'height',
  config: 'config',
  dataSource: 'dataSource',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnalyticsReportScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  name: 'name',
  description: 'description',
  dataSource: 'dataSource',
  columns: 'columns',
  filters: 'filters',
  sorting: 'sorting',
  grouping: 'grouping',
  aggregations: 'aggregations',
  isScheduled: 'isScheduled',
  schedule: 'schedule',
  lastRunAt: 'lastRunAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalaryBenchmarkScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  position: 'position',
  level: 'level',
  department: 'department',
  marketMin: 'marketMin',
  marketMid: 'marketMid',
  marketMax: 'marketMax',
  internalAvg: 'internalAvg',
  internalMin: 'internalMin',
  internalMax: 'internalMax',
  employeeCount: 'employeeCount',
  source: 'source',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobRequisitionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  requisitionCode: 'requisitionCode',
  title: 'title',
  departmentId: 'departmentId',
  reportingToId: 'reportingToId',
  jobType: 'jobType',
  workMode: 'workMode',
  location: 'location',
  headcount: 'headcount',
  filledCount: 'filledCount',
  salaryMin: 'salaryMin',
  salaryMax: 'salaryMax',
  salaryDisplay: 'salaryDisplay',
  description: 'description',
  requirements: 'requirements',
  benefits: 'benefits',
  priority: 'priority',
  targetHireDate: 'targetHireDate',
  status: 'status',
  approvalNote: 'approvalNote',
  requestedById: 'requestedById',
  approvedById: 'approvedById',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobPostingScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  requisitionId: 'requisitionId',
  title: 'title',
  slug: 'slug',
  description: 'description',
  requirements: 'requirements',
  benefits: 'benefits',
  location: 'location',
  jobType: 'jobType',
  workMode: 'workMode',
  salaryDisplay: 'salaryDisplay',
  isInternal: 'isInternal',
  isPublic: 'isPublic',
  status: 'status',
  publishedAt: 'publishedAt',
  expiresAt: 'expiresAt',
  viewCount: 'viewCount',
  applicationCount: 'applicationCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  email: 'email',
  phone: 'phone',
  fullName: 'fullName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  address: 'address',
  cvUrl: 'cvUrl',
  cvFileName: 'cvFileName',
  portfolioUrl: 'portfolioUrl',
  linkedinUrl: 'linkedinUrl',
  currentCompany: 'currentCompany',
  currentPosition: 'currentPosition',
  currentSalary: 'currentSalary',
  expectedSalary: 'expectedSalary',
  yearsOfExperience: 'yearsOfExperience',
  skills: 'skills',
  education: 'education',
  workHistory: 'workHistory',
  notes: 'notes',
  tags: 'tags',
  source: 'source',
  referredById: 'referredById',
  isBlacklisted: 'isBlacklisted',
  blacklistReason: 'blacklistReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  candidateId: 'candidateId',
  requisitionId: 'requisitionId',
  jobPostingId: 'jobPostingId',
  applicationCode: 'applicationCode',
  status: 'status',
  stage: 'stage',
  screeningScore: 'screeningScore',
  screeningNotes: 'screeningNotes',
  overallRating: 'overallRating',
  coverLetter: 'coverLetter',
  answers: 'answers',
  source: 'source',
  rejectionReason: 'rejectionReason',
  rejectedAt: 'rejectedAt',
  rejectedById: 'rejectedById',
  hiredAt: 'hiredAt',
  hiredById: 'hiredById',
  assignedToId: 'assignedToId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicationActivityScalarFieldEnum = {
  id: 'id',
  applicationId: 'applicationId',
  action: 'action',
  description: 'description',
  oldValue: 'oldValue',
  newValue: 'newValue',
  performedById: 'performedById',
  createdAt: 'createdAt'
};

exports.Prisma.InterviewScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  applicationId: 'applicationId',
  interviewType: 'interviewType',
  round: 'round',
  scheduledAt: 'scheduledAt',
  duration: 'duration',
  location: 'location',
  interviewerIds: 'interviewerIds',
  result: 'result',
  notes: 'notes',
  reminderSent: 'reminderSent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateEvaluationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  applicationId: 'applicationId',
  interviewId: 'interviewId',
  evaluatorId: 'evaluatorId',
  technicalSkills: 'technicalSkills',
  communication: 'communication',
  problemSolving: 'problemSolving',
  cultureFit: 'cultureFit',
  experience: 'experience',
  overallRating: 'overallRating',
  strengths: 'strengths',
  weaknesses: 'weaknesses',
  notes: 'notes',
  recommendation: 'recommendation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OfferScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  applicationId: 'applicationId',
  offerCode: 'offerCode',
  position: 'position',
  departmentId: 'departmentId',
  reportingToId: 'reportingToId',
  jobType: 'jobType',
  workMode: 'workMode',
  location: 'location',
  baseSalary: 'baseSalary',
  allowances: 'allowances',
  bonus: 'bonus',
  benefits: 'benefits',
  startDate: 'startDate',
  probationMonths: 'probationMonths',
  status: 'status',
  expiresAt: 'expiresAt',
  sentAt: 'sentAt',
  sentById: 'sentById',
  respondedAt: 'respondedAt',
  responseNote: 'responseNote',
  approvedById: 'approvedById',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OnboardingTemplateScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  departmentId: 'departmentId',
  positionLevel: 'positionLevel',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OnboardingTemplateTaskScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  title: 'title',
  description: 'description',
  category: 'category',
  daysOffset: 'daysOffset',
  assigneeType: 'assigneeType',
  isRequired: 'isRequired',
  order: 'order',
  createdAt: 'createdAt'
};

exports.Prisma.OnboardingScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  templateId: 'templateId',
  status: 'status',
  startDate: 'startDate',
  expectedEndDate: 'expectedEndDate',
  completedAt: 'completedAt',
  buddyId: 'buddyId',
  hrContactId: 'hrContactId',
  progress: 'progress',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OnboardingTaskScalarFieldEnum = {
  id: 'id',
  onboardingId: 'onboardingId',
  title: 'title',
  description: 'description',
  category: 'category',
  dueDate: 'dueDate',
  assigneeId: 'assigneeId',
  assigneeType: 'assigneeType',
  status: 'status',
  completedAt: 'completedAt',
  completedById: 'completedById',
  notes: 'notes',
  attachments: 'attachments',
  isRequired: 'isRequired',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GoalScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  goalType: 'goalType',
  category: 'category',
  ownerId: 'ownerId',
  departmentId: 'departmentId',
  parentGoalId: 'parentGoalId',
  startDate: 'startDate',
  endDate: 'endDate',
  targetValue: 'targetValue',
  currentValue: 'currentValue',
  unit: 'unit',
  weight: 'weight',
  status: 'status',
  priority: 'priority',
  progress: 'progress',
  score: 'score',
  reviewCycleId: 'reviewCycleId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KeyResultScalarFieldEnum = {
  id: 'id',
  goalId: 'goalId',
  title: 'title',
  description: 'description',
  targetValue: 'targetValue',
  currentValue: 'currentValue',
  unit: 'unit',
  weight: 'weight',
  progress: 'progress',
  dueDate: 'dueDate',
  completedAt: 'completedAt',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GoalUpdateScalarFieldEnum = {
  id: 'id',
  goalId: 'goalId',
  previousValue: 'previousValue',
  newValue: 'newValue',
  previousProgress: 'previousProgress',
  newProgress: 'newProgress',
  notes: 'notes',
  updatedById: 'updatedById',
  createdAt: 'createdAt'
};

exports.Prisma.KeyResultUpdateScalarFieldEnum = {
  id: 'id',
  keyResultId: 'keyResultId',
  previousValue: 'previousValue',
  newValue: 'newValue',
  notes: 'notes',
  updatedById: 'updatedById',
  createdAt: 'createdAt'
};

exports.Prisma.ReviewCycleScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  cycleType: 'cycleType',
  year: 'year',
  startDate: 'startDate',
  endDate: 'endDate',
  goalSettingStart: 'goalSettingStart',
  goalSettingEnd: 'goalSettingEnd',
  selfReviewStart: 'selfReviewStart',
  selfReviewEnd: 'selfReviewEnd',
  managerReviewStart: 'managerReviewStart',
  managerReviewEnd: 'managerReviewEnd',
  calibrationStart: 'calibrationStart',
  calibrationEnd: 'calibrationEnd',
  goalWeight: 'goalWeight',
  competencyWeight: 'competencyWeight',
  valuesWeight: 'valuesWeight',
  feedbackWeight: 'feedbackWeight',
  allowSelfReview: 'allowSelfReview',
  allow360Feedback: 'allow360Feedback',
  requireCalibration: 'requireCalibration',
  status: 'status',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PerformanceReviewScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  reviewCycleId: 'reviewCycleId',
  employeeId: 'employeeId',
  managerId: 'managerId',
  status: 'status',
  goalScore: 'goalScore',
  competencyScore: 'competencyScore',
  valuesScore: 'valuesScore',
  feedbackScore: 'feedbackScore',
  overallScore: 'overallScore',
  selfRating: 'selfRating',
  managerRating: 'managerRating',
  calibratedRating: 'calibratedRating',
  finalRating: 'finalRating',
  selfComments: 'selfComments',
  managerComments: 'managerComments',
  employeeComments: 'employeeComments',
  strengths: 'strengths',
  developmentAreas: 'developmentAreas',
  developmentPlan: 'developmentPlan',
  selfReviewAt: 'selfReviewAt',
  managerReviewAt: 'managerReviewAt',
  calibratedAt: 'calibratedAt',
  acknowledgedAt: 'acknowledgedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewGoalScalarFieldEnum = {
  id: 'id',
  reviewId: 'reviewId',
  goalId: 'goalId',
  selfScore: 'selfScore',
  selfComments: 'selfComments',
  managerScore: 'managerScore',
  managerComments: 'managerComments',
  finalScore: 'finalScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompetencyFrameworkScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompetencyScalarFieldEnum = {
  id: 'id',
  frameworkId: 'frameworkId',
  name: 'name',
  description: 'description',
  category: 'category',
  levels: 'levels',
  isCore: 'isCore',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PositionCompetencyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  competencyId: 'competencyId',
  position: 'position',
  requiredLevel: 'requiredLevel',
  createdAt: 'createdAt'
};

exports.Prisma.ReviewCompetencyScalarFieldEnum = {
  id: 'id',
  reviewId: 'reviewId',
  competencyId: 'competencyId',
  requiredLevel: 'requiredLevel',
  selfRating: 'selfRating',
  selfComments: 'selfComments',
  managerRating: 'managerRating',
  managerComments: 'managerComments',
  finalRating: 'finalRating',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CoreValueScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  indicators: 'indicators',
  isActive: 'isActive',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewValueScalarFieldEnum = {
  id: 'id',
  reviewId: 'reviewId',
  coreValueId: 'coreValueId',
  selfRating: 'selfRating',
  selfComments: 'selfComments',
  managerRating: 'managerRating',
  managerComments: 'managerComments',
  peerRating: 'peerRating',
  finalRating: 'finalRating',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeedbackRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  reviewId: 'reviewId',
  requesterId: 'requesterId',
  providerId: 'providerId',
  subjectId: 'subjectId',
  feedbackType: 'feedbackType',
  status: 'status',
  dueDate: 'dueDate',
  questions: 'questions',
  requestedAt: 'requestedAt',
  respondedAt: 'respondedAt',
  createdAt: 'createdAt'
};

exports.Prisma.FeedbackScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  requestId: 'requestId',
  providerId: 'providerId',
  subjectId: 'subjectId',
  feedbackType: 'feedbackType',
  overallRating: 'overallRating',
  ratings: 'ratings',
  strengths: 'strengths',
  areasForImprovement: 'areasForImprovement',
  comments: 'comments',
  recognitionType: 'recognitionType',
  isPublic: 'isPublic',
  isAnonymous: 'isAnonymous',
  createdAt: 'createdAt'
};

exports.Prisma.CalibrationSessionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  reviewCycleId: 'reviewCycleId',
  name: 'name',
  description: 'description',
  departmentId: 'departmentId',
  scheduledAt: 'scheduledAt',
  completedAt: 'completedAt',
  facilitatorId: 'facilitatorId',
  participantIds: 'participantIds',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CalibrationDecisionScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  employeeId: 'employeeId',
  originalRating: 'originalRating',
  calibratedRating: 'calibratedRating',
  reason: 'reason',
  decidedById: 'decidedById',
  createdAt: 'createdAt'
};

exports.Prisma.CheckInScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  managerId: 'managerId',
  checkInDate: 'checkInDate',
  accomplishments: 'accomplishments',
  challenges: 'challenges',
  priorities: 'priorities',
  supportNeeded: 'supportNeeded',
  moodRating: 'moodRating',
  managerNotes: 'managerNotes',
  actionItems: 'actionItems',
  isCompleted: 'isCompleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OneOnOneScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  managerId: 'managerId',
  scheduledAt: 'scheduledAt',
  duration: 'duration',
  agenda: 'agenda',
  employeeNotes: 'employeeNotes',
  managerNotes: 'managerNotes',
  actionItems: 'actionItems',
  completedAt: 'completedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PerformanceImprovementPlanScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  managerId: 'managerId',
  hrContactId: 'hrContactId',
  startDate: 'startDate',
  endDate: 'endDate',
  performanceIssues: 'performanceIssues',
  impactDescription: 'impactDescription',
  expectedOutcomes: 'expectedOutcomes',
  supportProvided: 'supportProvided',
  resources: 'resources',
  status: 'status',
  outcome: 'outcome',
  completedAt: 'completedAt',
  employeeAcknowledgedAt: 'employeeAcknowledgedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PIPMilestoneScalarFieldEnum = {
  id: 'id',
  pipId: 'pipId',
  title: 'title',
  description: 'description',
  dueDate: 'dueDate',
  completedAt: 'completedAt',
  status: 'status',
  notes: 'notes',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PIPCheckInScalarFieldEnum = {
  id: 'id',
  pipId: 'pipId',
  checkInDate: 'checkInDate',
  progressNotes: 'progressNotes',
  managerAssessment: 'managerAssessment',
  isOnTrack: 'isOnTrack',
  nextSteps: 'nextSteps',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.SkillCategoryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  parentId: 'parentId',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  categoryId: 'categoryId',
  name: 'name',
  description: 'description',
  levels: 'levels',
  isActive: 'isActive',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeSkillScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  skillId: 'skillId',
  currentLevel: 'currentLevel',
  targetLevel: 'targetLevel',
  selfAssessment: 'selfAssessment',
  managerAssessment: 'managerAssessment',
  assessedAt: 'assessedAt',
  assessedById: 'assessedById',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PositionSkillScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  skillId: 'skillId',
  position: 'position',
  requiredLevel: 'requiredLevel',
  isRequired: 'isRequired',
  createdAt: 'createdAt'
};

exports.Prisma.CourseCategoryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  code: 'code',
  parentId: 'parentId',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  categoryId: 'categoryId',
  code: 'code',
  title: 'title',
  description: 'description',
  objectives: 'objectives',
  courseType: 'courseType',
  level: 'level',
  durationHours: 'durationHours',
  contentUrl: 'contentUrl',
  contentType: 'contentType',
  maxParticipants: 'maxParticipants',
  minParticipants: 'minParticipants',
  providerId: 'providerId',
  instructorName: 'instructorName',
  costPerPerson: 'costPerPerson',
  currency: 'currency',
  prerequisites: 'prerequisites',
  targetAudience: 'targetAudience',
  isMandatory: 'isMandatory',
  mandatoryForPositions: 'mandatoryForPositions',
  recertificationMonths: 'recertificationMonths',
  thumbnailUrl: 'thumbnailUrl',
  status: 'status',
  publishedAt: 'publishedAt',
  archivedAt: 'archivedAt',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseModuleScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  title: 'title',
  description: 'description',
  contentUrl: 'contentUrl',
  contentType: 'contentType',
  durationMinutes: 'durationMinutes',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseSkillScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  skillId: 'skillId',
  skillLevelGained: 'skillLevelGained',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingProviderScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  type: 'type',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  website: 'website',
  address: 'address',
  notes: 'notes',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TrainingSessionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  courseId: 'courseId',
  sessionCode: 'sessionCode',
  title: 'title',
  startDate: 'startDate',
  endDate: 'endDate',
  location: 'location',
  room: 'room',
  isVirtual: 'isVirtual',
  virtualLink: 'virtualLink',
  providerId: 'providerId',
  instructorName: 'instructorName',
  instructorEmail: 'instructorEmail',
  maxParticipants: 'maxParticipants',
  minParticipants: 'minParticipants',
  totalCost: 'totalCost',
  costPerPerson: 'costPerPerson',
  enrollmentDeadline: 'enrollmentDeadline',
  autoConfirm: 'autoConfirm',
  status: 'status',
  cancellationReason: 'cancellationReason',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  courseId: 'courseId',
  sessionId: 'sessionId',
  status: 'status',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  progress: 'progress',
  score: 'score',
  passed: 'passed',
  approvedById: 'approvedById',
  approvedAt: 'approvedAt',
  rejectionReason: 'rejectionReason',
  actualCost: 'actualCost',
  rating: 'rating',
  feedback: 'feedback',
  certificateIssued: 'certificateIssued',
  certificateUrl: 'certificateUrl',
  requestId: 'requestId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuleCompletionScalarFieldEnum = {
  id: 'id',
  enrollmentId: 'enrollmentId',
  moduleId: 'moduleId',
  completedAt: 'completedAt',
  timeSpentMinutes: 'timeSpentMinutes',
  createdAt: 'createdAt'
};

exports.Prisma.SessionAttendanceScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  employeeId: 'employeeId',
  date: 'date',
  attended: 'attended',
  checkInTime: 'checkInTime',
  checkOutTime: 'checkOutTime',
  notes: 'notes',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  requestCode: 'requestCode',
  courseId: 'courseId',
  externalCourseName: 'externalCourseName',
  externalProvider: 'externalProvider',
  externalUrl: 'externalUrl',
  reason: 'reason',
  expectedOutcome: 'expectedOutcome',
  preferredStartDate: 'preferredStartDate',
  preferredEndDate: 'preferredEndDate',
  estimatedCost: 'estimatedCost',
  status: 'status',
  managerApprovedById: 'managerApprovedById',
  managerApprovedAt: 'managerApprovedAt',
  managerComments: 'managerComments',
  hrApprovedById: 'hrApprovedById',
  hrApprovedAt: 'hrApprovedAt',
  hrComments: 'hrComments',
  rejectedById: 'rejectedById',
  rejectedAt: 'rejectedAt',
  rejectionReason: 'rejectionReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LearningPathScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  targetPosition: 'targetPosition',
  targetLevel: 'targetLevel',
  estimatedMonths: 'estimatedMonths',
  totalHours: 'totalHours',
  thumbnailUrl: 'thumbnailUrl',
  isActive: 'isActive',
  isPublic: 'isPublic',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LearningPathStageScalarFieldEnum = {
  id: 'id',
  pathId: 'pathId',
  name: 'name',
  description: 'description',
  order: 'order',
  targetMonths: 'targetMonths',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LearningPathCourseScalarFieldEnum = {
  id: 'id',
  stageId: 'stageId',
  courseId: 'courseId',
  isRequired: 'isRequired',
  order: 'order',
  createdAt: 'createdAt'
};

exports.Prisma.LearningPathEnrollmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  pathId: 'pathId',
  status: 'status',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  currentStageId: 'currentStageId',
  progress: 'progress',
  targetCompletionDate: 'targetCompletionDate',
  assignedById: 'assignedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificationTypeScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  provider: 'provider',
  validityMonths: 'validityMonths',
  isExternal: 'isExternal',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeCertificationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  certificationTypeId: 'certificationTypeId',
  certificateNumber: 'certificateNumber',
  issuedDate: 'issuedDate',
  expiryDate: 'expiryDate',
  status: 'status',
  documentUrl: 'documentUrl',
  cost: 'cost',
  paidByCompany: 'paidByCompany',
  renewalReminderSent: 'renewalReminderSent',
  renewalRequestedAt: 'renewalRequestedAt',
  notes: 'notes',
  verifiedById: 'verifiedById',
  verifiedAt: 'verifiedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  courseId: 'courseId',
  title: 'title',
  description: 'description',
  instructions: 'instructions',
  assessmentType: 'assessmentType',
  timeLimitMinutes: 'timeLimitMinutes',
  passingScore: 'passingScore',
  totalPoints: 'totalPoints',
  maxAttempts: 'maxAttempts',
  availableFrom: 'availableFrom',
  availableUntil: 'availableUntil',
  isActive: 'isActive',
  shuffleQuestions: 'shuffleQuestions',
  showCorrectAnswers: 'showCorrectAnswers',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentQuestionScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  questionText: 'questionText',
  questionType: 'questionType',
  options: 'options',
  correctAnswer: 'correctAnswer',
  points: 'points',
  explanation: 'explanation',
  order: 'order',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentAttemptScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  assessmentId: 'assessmentId',
  employeeId: 'employeeId',
  enrollmentId: 'enrollmentId',
  attemptNumber: 'attemptNumber',
  startedAt: 'startedAt',
  submittedAt: 'submittedAt',
  score: 'score',
  percentageScore: 'percentageScore',
  passed: 'passed',
  timeSpentMinutes: 'timeSpentMinutes',
  createdAt: 'createdAt'
};

exports.Prisma.QuestionResponseScalarFieldEnum = {
  id: 'id',
  attemptId: 'attemptId',
  questionId: 'questionId',
  response: 'response',
  selectedOptions: 'selectedOptions',
  isCorrect: 'isCorrect',
  pointsEarned: 'pointsEarned',
  gradedById: 'gradedById',
  gradedAt: 'gradedAt',
  graderComments: 'graderComments',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingBudgetScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  year: 'year',
  departmentId: 'departmentId',
  totalBudget: 'totalBudget',
  allocatedAmount: 'allocatedAmount',
  spentAmount: 'spentAmount',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalaryGradeScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  code: 'code',
  name: 'name',
  level: 'level',
  minSalary: 'minSalary',
  midSalary: 'midSalary',
  maxSalary: 'maxSalary',
  currency: 'currency',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MeritMatrixScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  performanceRating: 'performanceRating',
  compaRatioMin: 'compaRatioMin',
  compaRatioMax: 'compaRatioMax',
  meritIncreasePercent: 'meritIncreasePercent',
  compaRatioLabel: 'compaRatioLabel',
  effectiveYear: 'effectiveYear',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompensationCycleScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  year: 'year',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  budgetPercent: 'budgetPercent',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompensationReviewScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  cycleId: 'cycleId',
  employeeId: 'employeeId',
  status: 'status',
  currentSalary: 'currentSalary',
  proposedSalary: 'proposedSalary',
  approvedSalary: 'approvedSalary',
  changeType: 'changeType',
  changePercent: 'changePercent',
  performanceRating: 'performanceRating',
  compaRatio: 'compaRatio',
  justification: 'justification',
  managerComments: 'managerComments',
  hrComments: 'hrComments',
  effectiveDate: 'effectiveDate',
  submittedAt: 'submittedAt',
  approvedAt: 'approvedAt',
  approvedById: 'approvedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompensationChangeScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  changeType: 'changeType',
  effectiveDate: 'effectiveDate',
  previousSalary: 'previousSalary',
  newSalary: 'newSalary',
  changePercent: 'changePercent',
  previousGradeId: 'previousGradeId',
  newGradeId: 'newGradeId',
  reason: 'reason',
  approvedById: 'approvedById',
  createdAt: 'createdAt'
};

exports.Prisma.CompensationBudgetScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  cycleId: 'cycleId',
  departmentId: 'departmentId',
  totalBudget: 'totalBudget',
  allocatedAmount: 'allocatedAmount',
  spentAmount: 'spentAmount',
  headcount: 'headcount',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeCompensationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  baseSalary: 'baseSalary',
  currency: 'currency',
  gradeId: 'gradeId',
  effectiveDate: 'effectiveDate',
  salaryType: 'salaryType',
  payFrequency: 'payFrequency',
  isCurrent: 'isCurrent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BenefitPlanScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  type: 'type',
  description: 'description',
  employerContribution: 'employerContribution',
  employeeContribution: 'employeeContribution',
  contributionPercent: 'contributionPercent',
  ceilingAmount: 'ceilingAmount',
  eligibilityCriteria: 'eligibilityCriteria',
  isActive: 'isActive',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BenefitEnrollmentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  planId: 'planId',
  status: 'status',
  enrollmentDate: 'enrollmentDate',
  effectiveDate: 'effectiveDate',
  endDate: 'endDate',
  employerAmount: 'employerAmount',
  employeeAmount: 'employeeAmount',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AllowanceTypeScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  description: 'description',
  defaultAmount: 'defaultAmount',
  frequency: 'frequency',
  isTaxable: 'isTaxable',
  isInsurable: 'isInsurable',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeAllowanceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  allowanceTypeId: 'allowanceTypeId',
  amount: 'amount',
  frequency: 'frequency',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  isActive: 'isActive',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TotalRewardsStatementScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  year: 'year',
  baseSalary: 'baseSalary',
  totalAllowances: 'totalAllowances',
  totalBenefitsValue: 'totalBenefitsValue',
  employerContributions: 'employerContributions',
  totalRewards: 'totalRewards',
  generatedAt: 'generatedAt',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.PayEquityAnalysisScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  analysisDate: 'analysisDate',
  departmentId: 'departmentId',
  gradeId: 'gradeId',
  genderGap: 'genderGap',
  avgMaleSalary: 'avgMaleSalary',
  avgFemaleSalary: 'avgFemaleSalary',
  medianSalary: 'medianSalary',
  avgCompaRatio: 'avgCompaRatio',
  headcount: 'headcount',
  findings: 'findings',
  recommendations: 'recommendations',
  createdAt: 'createdAt'
};

exports.Prisma.CompensationBenchmarkScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  positionTitle: 'positionTitle',
  gradeLevel: 'gradeLevel',
  industry: 'industry',
  location: 'location',
  percentile25: 'percentile25',
  percentile50: 'percentile50',
  percentile75: 'percentile75',
  percentile90: 'percentile90',
  surveySource: 'surveySource',
  surveyYear: 'surveyYear',
  currency: 'currency',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompensationHistoryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  eventType: 'eventType',
  eventDate: 'eventDate',
  previousValue: 'previousValue',
  newValue: 'newValue',
  changePercent: 'changePercent',
  notes: 'notes',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.EmployeeInsuranceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  socialInsuranceNumber: 'socialInsuranceNumber',
  healthInsuranceNumber: 'healthInsuranceNumber',
  unemploymentNumber: 'unemploymentNumber',
  registrationDate: 'registrationDate',
  terminationDate: 'terminationDate',
  insuranceSalaryBase: 'insuranceSalaryBase',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  employeeRate: 'employeeRate',
  employerRate: 'employerRate',
  registeredHospital: 'registeredHospital',
  hospitalCode: 'hospitalCode',
  isActive: 'isActive',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InsuranceReportScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  reportType: 'reportType',
  reportCode: 'reportCode',
  reportMonth: 'reportMonth',
  reportYear: 'reportYear',
  totalEmployees: 'totalEmployees',
  totalInsuranceSalary: 'totalInsuranceSalary',
  totalEmployeeAmount: 'totalEmployeeAmount',
  totalEmployerAmount: 'totalEmployerAmount',
  totalAmount: 'totalAmount',
  status: 'status',
  submittedAt: 'submittedAt',
  submittedBy: 'submittedBy',
  approvedAt: 'approvedAt',
  approvedBy: 'approvedBy',
  rejectionReason: 'rejectionReason',
  exportedFile: 'exportedFile',
  exportedAt: 'exportedAt',
  notes: 'notes',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InsuranceReportDetailScalarFieldEnum = {
  id: 'id',
  reportId: 'reportId',
  employeeInsuranceId: 'employeeInsuranceId',
  employeeCode: 'employeeCode',
  employeeName: 'employeeName',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  idNumber: 'idNumber',
  insuranceSalary: 'insuranceSalary',
  employeeAmount: 'employeeAmount',
  employerAmount: 'employerAmount',
  totalAmount: 'totalAmount',
  changeType: 'changeType',
  effectiveDate: 'effectiveDate',
  reason: 'reason',
  createdAt: 'createdAt'
};

exports.Prisma.TaxSettlementScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  settlementYear: 'settlementYear',
  totalGrossIncome: 'totalGrossIncome',
  totalInsuranceDeduction: 'totalInsuranceDeduction',
  personalDeduction: 'personalDeduction',
  dependentDeduction: 'dependentDeduction',
  otherDeductions: 'otherDeductions',
  taxableIncome: 'taxableIncome',
  taxAmount: 'taxAmount',
  taxPaid: 'taxPaid',
  taxRefund: 'taxRefund',
  taxOwed: 'taxOwed',
  dependentCount: 'dependentCount',
  dependentsData: 'dependentsData',
  status: 'status',
  finalizedAt: 'finalizedAt',
  submittedAt: 'submittedAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttendanceDeviceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  deviceCode: 'deviceCode',
  deviceName: 'deviceName',
  deviceType: 'deviceType',
  manufacturer: 'manufacturer',
  model: 'model',
  serialNumber: 'serialNumber',
  ipAddress: 'ipAddress',
  port: 'port',
  connectionType: 'connectionType',
  officeLocationId: 'officeLocationId',
  installationLocation: 'installationLocation',
  sdkConfig: 'sdkConfig',
  status: 'status',
  lastSyncAt: 'lastSyncAt',
  lastHeartbeat: 'lastHeartbeat',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OfficeLocationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  locationCode: 'locationCode',
  locationName: 'locationName',
  address: 'address',
  latitude: 'latitude',
  longitude: 'longitude',
  radiusMeters: 'radiusMeters',
  allowedWifiSSIDs: 'allowedWifiSSIDs',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DeviceSyncLogScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  deviceId: 'deviceId',
  syncType: 'syncType',
  syncStartAt: 'syncStartAt',
  syncEndAt: 'syncEndAt',
  recordsFetched: 'recordsFetched',
  recordsProcessed: 'recordsProcessed',
  recordsFailed: 'recordsFailed',
  status: 'status',
  errorMessage: 'errorMessage',
  errorDetails: 'errorDetails',
  createdAt: 'createdAt'
};

exports.Prisma.RawPunchLogScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  deviceId: 'deviceId',
  deviceUserId: 'deviceUserId',
  punchTime: 'punchTime',
  punchType: 'punchType',
  verifyType: 'verifyType',
  employeeId: 'employeeId',
  latitude: 'latitude',
  longitude: 'longitude',
  accuracy: 'accuracy',
  isProcessed: 'isProcessed',
  processedAt: 'processedAt',
  attendanceId: 'attendanceId',
  rawData: 'rawData',
  createdAt: 'createdAt'
};

exports.Prisma.BankConfigurationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  bankCode: 'bankCode',
  bankName: 'bankName',
  accountNumber: 'accountNumber',
  accountName: 'accountName',
  branchCode: 'branchCode',
  branchName: 'branchName',
  apiEndpoint: 'apiEndpoint',
  apiVersion: 'apiVersion',
  clientId: 'clientId',
  encryptedSecret: 'encryptedSecret',
  certificatePath: 'certificatePath',
  isDefault: 'isDefault',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentBatchScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  bankConfigId: 'bankConfigId',
  batchCode: 'batchCode',
  batchName: 'batchName',
  batchType: 'batchType',
  payrollPeriodId: 'payrollPeriodId',
  totalTransactions: 'totalTransactions',
  totalAmount: 'totalAmount',
  successCount: 'successCount',
  failedCount: 'failedCount',
  status: 'status',
  submittedAt: 'submittedAt',
  submittedBy: 'submittedBy',
  approvedAt: 'approvedAt',
  approvedBy: 'approvedBy',
  processedAt: 'processedAt',
  completedAt: 'completedAt',
  bankReferenceId: 'bankReferenceId',
  bankResponseData: 'bankResponseData',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentTransactionScalarFieldEnum = {
  id: 'id',
  batchId: 'batchId',
  employeeId: 'employeeId',
  recipientName: 'recipientName',
  recipientBank: 'recipientBank',
  recipientAccount: 'recipientAccount',
  recipientBranch: 'recipientBranch',
  amount: 'amount',
  currency: 'currency',
  description: 'description',
  status: 'status',
  processedAt: 'processedAt',
  bankTransactionId: 'bankTransactionId',
  bankResponseCode: 'bankResponseCode',
  bankResponseMessage: 'bankResponseMessage',
  retryCount: 'retryCount',
  lastError: 'lastError',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SignatureProviderScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  providerCode: 'providerCode',
  providerName: 'providerName',
  apiEndpoint: 'apiEndpoint',
  apiVersion: 'apiVersion',
  clientId: 'clientId',
  encryptedSecret: 'encryptedSecret',
  isDefault: 'isDefault',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeCertificateScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  providerId: 'providerId',
  certificateSerial: 'certificateSerial',
  certificateSubject: 'certificateSubject',
  issuedAt: 'issuedAt',
  expiresAt: 'expiresAt',
  status: 'status',
  revokedAt: 'revokedAt',
  revokedReason: 'revokedReason',
  tokenSerial: 'tokenSerial',
  tokenType: 'tokenType',
  isDefault: 'isDefault',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SignableDocumentScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  documentType: 'documentType',
  documentCode: 'documentCode',
  documentName: 'documentName',
  sourceType: 'sourceType',
  sourceId: 'sourceId',
  originalFile: 'originalFile',
  signedFile: 'signedFile',
  requiredSigners: 'requiredSigners',
  status: 'status',
  completedAt: 'completedAt',
  expiresAt: 'expiresAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentSignatureScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  certificateId: 'certificateId',
  signerId: 'signerId',
  signatureOrder: 'signatureOrder',
  signerRole: 'signerRole',
  signedAt: 'signedAt',
  signatureData: 'signatureData',
  signatureHash: 'signatureHash',
  signatureX: 'signatureX',
  signatureY: 'signatureY',
  signaturePage: 'signaturePage',
  status: 'status',
  rejectedAt: 'rejectedAt',
  rejectedReason: 'rejectedReason',
  providerTransactionId: 'providerTransactionId',
  providerResponse: 'providerResponse',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SurveyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate',
  isRecurring: 'isRecurring',
  recurrenceRule: 'recurrenceRule',
  targetType: 'targetType',
  targetDepartments: 'targetDepartments',
  targetPositions: 'targetPositions',
  isAnonymous: 'isAnonymous',
  allowComments: 'allowComments',
  requireAllQuestions: 'requireAllQuestions',
  status: 'status',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SurveyQuestionScalarFieldEnum = {
  id: 'id',
  surveyId: 'surveyId',
  questionText: 'questionText',
  questionType: 'questionType',
  scaleMin: 'scaleMin',
  scaleMax: 'scaleMax',
  scaleMinLabel: 'scaleMinLabel',
  scaleMaxLabel: 'scaleMaxLabel',
  options: 'options',
  allowMultiple: 'allowMultiple',
  isENPS: 'isENPS',
  isRequired: 'isRequired',
  sortOrder: 'sortOrder',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.SurveyResponseScalarFieldEnum = {
  id: 'id',
  surveyId: 'surveyId',
  respondentId: 'respondentId',
  anonymousToken: 'anonymousToken',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  deviceType: 'deviceType'
};

exports.Prisma.SurveyAnswerScalarFieldEnum = {
  id: 'id',
  responseId: 'responseId',
  questionId: 'questionId',
  scaleValue: 'scaleValue',
  selectedOptions: 'selectedOptions',
  textValue: 'textValue',
  createdAt: 'createdAt'
};

exports.Prisma.RecognitionCategoryScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  nameVi: 'nameVi',
  description: 'description',
  icon: 'icon',
  color: 'color',
  pointsValue: 'pointsValue',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.RecognitionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  giverId: 'giverId',
  receiverId: 'receiverId',
  categoryId: 'categoryId',
  message: 'message',
  isPublic: 'isPublic',
  pointsAwarded: 'pointsAwarded',
  createdAt: 'createdAt'
};

exports.Prisma.RecognitionReactionScalarFieldEnum = {
  id: 'id',
  recognitionId: 'recognitionId',
  employeeId: 'employeeId',
  emoji: 'emoji',
  createdAt: 'createdAt'
};

exports.Prisma.RecognitionCommentScalarFieldEnum = {
  id: 'id',
  recognitionId: 'recognitionId',
  authorId: 'authorId',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.EmployeePointsScalarFieldEnum = {
  id: 'id',
  employeeId: 'employeeId',
  totalEarned: 'totalEarned',
  totalSpent: 'totalSpent',
  currentBalance: 'currentBalance',
  monthlyAllowance: 'monthlyAllowance',
  monthlyUsed: 'monthlyUsed',
  allowanceResetAt: 'allowanceResetAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PointTransactionScalarFieldEnum = {
  id: 'id',
  employeePointsId: 'employeePointsId',
  type: 'type',
  amount: 'amount',
  description: 'description',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  createdAt: 'createdAt'
};

exports.Prisma.CompanyPostScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  authorId: 'authorId',
  type: 'type',
  title: 'title',
  content: 'content',
  mediaUrls: 'mediaUrls',
  isPinned: 'isPinned',
  pinExpiresAt: 'pinExpiresAt',
  visibility: 'visibility',
  targetDepartments: 'targetDepartments',
  status: 'status',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostReactionScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  employeeId: 'employeeId',
  emoji: 'emoji',
  createdAt: 'createdAt'
};

exports.Prisma.PostCommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  authorId: 'authorId',
  content: 'content',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostReadScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  employeeId: 'employeeId',
  readAt: 'readAt'
};

exports.Prisma.CompanyEventScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate',
  isAllDay: 'isAllDay',
  location: 'location',
  isVirtual: 'isVirtual',
  virtualLink: 'virtualLink',
  maxAttendees: 'maxAttendees',
  requiresRsvp: 'requiresRsvp',
  rsvpDeadline: 'rsvpDeadline',
  postId: 'postId',
  organizerId: 'organizerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EventAttendeeScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  employeeId: 'employeeId',
  status: 'status',
  respondedAt: 'respondedAt',
  createdAt: 'createdAt'
};

exports.Prisma.OffboardingInstanceScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  noticeDate: 'noticeDate',
  lastWorkingDay: 'lastWorkingDay',
  separationType: 'separationType',
  reason: 'reason',
  isVoluntary: 'isVoluntary',
  status: 'status',
  exitSurveyId: 'exitSurveyId',
  exitInterviewDate: 'exitInterviewDate',
  exitInterviewNotes: 'exitInterviewNotes',
  eligibleForRehire: 'eligibleForRehire',
  rehireNotes: 'rehireNotes',
  knowledgeTransferTo: 'knowledgeTransferTo',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OffboardingTaskScalarFieldEnum = {
  id: 'id',
  instanceId: 'instanceId',
  title: 'title',
  description: 'description',
  category: 'category',
  assigneeId: 'assigneeId',
  status: 'status',
  completedAt: 'completedAt',
  completedBy: 'completedBy',
  notes: 'notes',
  dueDate: 'dueDate',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.AnalyticsSnapshotScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  snapshotType: 'snapshotType',
  snapshotDate: 'snapshotDate',
  totalHeadcount: 'totalHeadcount',
  activeEmployees: 'activeEmployees',
  probationEmployees: 'probationEmployees',
  newHires: 'newHires',
  terminations: 'terminations',
  voluntaryTerminations: 'voluntaryTerminations',
  turnoverRate: 'turnoverRate',
  voluntaryTurnoverRate: 'voluntaryTurnoverRate',
  retentionRate: 'retentionRate',
  avgAttendanceRate: 'avgAttendanceRate',
  totalAbsentDays: 'totalAbsentDays',
  totalLeaveDays: 'totalLeaveDays',
  totalOvertimeHours: 'totalOvertimeHours',
  totalPayrollCost: 'totalPayrollCost',
  avgSalary: 'avgSalary',
  laborCostPercentage: 'laborCostPercentage',
  openPositions: 'openPositions',
  totalApplications: 'totalApplications',
  hiredCount: 'hiredCount',
  avgTimeToHire: 'avgTimeToHire',
  avgPerformanceScore: 'avgPerformanceScore',
  highPerformers: 'highPerformers',
  lowPerformers: 'lowPerformers',
  goalsCompletionRate: 'goalsCompletionRate',
  avgTrainingHours: 'avgTrainingHours',
  courseCompletionRate: 'courseCompletionRate',
  certifiedEmployees: 'certifiedEmployees',
  departmentBreakdown: 'departmentBreakdown',
  rawData: 'rawData',
  createdAt: 'createdAt'
};

exports.Prisma.PredictiveModelScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  modelType: 'modelType',
  config: 'config',
  features: 'features',
  thresholds: 'thresholds',
  accuracy: 'accuracy',
  precision: 'precision',
  recall: 'recall',
  f1Score: 'f1Score',
  trainedAt: 'trainedAt',
  trainingDataSize: 'trainingDataSize',
  lastEvaluatedAt: 'lastEvaluatedAt',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PredictionScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  modelId: 'modelId',
  entityType: 'entityType',
  entityId: 'entityId',
  predictionType: 'predictionType',
  score: 'score',
  riskLevel: 'riskLevel',
  confidence: 'confidence',
  factors: 'factors',
  recommendations: 'recommendations',
  status: 'status',
  predictedAt: 'predictedAt',
  validUntil: 'validUntil',
  actualOutcome: 'actualOutcome',
  outcomeRecordedAt: 'outcomeRecordedAt'
};

exports.Prisma.CustomReportScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  userId: 'userId',
  name: 'name',
  description: 'description',
  category: 'category',
  primarySource: 'primarySource',
  joinedSources: 'joinedSources',
  columns: 'columns',
  filters: 'filters',
  parameters: 'parameters',
  sorting: 'sorting',
  grouping: 'grouping',
  aggregations: 'aggregations',
  chartType: 'chartType',
  chartConfig: 'chartConfig',
  layout: 'layout',
  formatting: 'formatting',
  isPublic: 'isPublic',
  sharedWith: 'sharedWith',
  isScheduled: 'isScheduled',
  schedule: 'schedule',
  lastRunAt: 'lastRunAt',
  nextRunAt: 'nextRunAt',
  recipients: 'recipients',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReportExportScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  reportId: 'reportId',
  userId: 'userId',
  format: 'format',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  fileSize: 'fileSize',
  status: 'status',
  errorMessage: 'errorMessage',
  parameters: 'parameters',
  dateRange: 'dateRange',
  rowCount: 'rowCount',
  requestedAt: 'requestedAt',
  completedAt: 'completedAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.AnalyticsAlertScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  description: 'description',
  metricType: 'metricType',
  condition: 'condition',
  threshold: 'threshold',
  compareWith: 'compareWith',
  severity: 'severity',
  departmentId: 'departmentId',
  status: 'status',
  lastTriggeredAt: 'lastTriggeredAt',
  lastValue: 'lastValue',
  triggerCount: 'triggerCount',
  notifyUsers: 'notifyUsers',
  notifyRoles: 'notifyRoles',
  notifyEmail: 'notifyEmail',
  notifyInApp: 'notifyInApp',
  cooldownMinutes: 'cooldownMinutes',
  isActive: 'isActive',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AlertTriggerHistoryScalarFieldEnum = {
  id: 'id',
  alertId: 'alertId',
  triggeredAt: 'triggeredAt',
  metricValue: 'metricValue',
  thresholdValue: 'thresholdValue',
  message: 'message',
  acknowledgedById: 'acknowledgedById',
  acknowledgedAt: 'acknowledgedAt',
  resolvedById: 'resolvedById',
  resolvedAt: 'resolvedAt',
  resolution: 'resolution'
};

exports.Prisma.CustomRoleScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  code: 'code',
  description: 'description',
  level: 'level',
  isSystem: 'isSystem',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  resource: 'resource',
  action: 'action',
  scope: 'scope',
  createdAt: 'createdAt'
};

exports.Prisma.UserCustomRoleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId',
  assignedAt: 'assignedAt'
};

exports.Prisma.FieldPermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  entity: 'entity',
  fieldName: 'fieldName',
  access: 'access',
  createdAt: 'createdAt'
};

exports.Prisma.ErasureRequestScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  requestedBy: 'requestedBy',
  reason: 'reason',
  legalBasis: 'legalBasis',
  scopeFields: 'scopeFields',
  status: 'status',
  reviewedBy: 'reviewedBy',
  reviewedAt: 'reviewedAt',
  reviewNotes: 'reviewNotes',
  executedAt: 'executedAt',
  executedBy: 'executedBy',
  erasureLog: 'erasureLog',
  retentionExceptions: 'retentionExceptions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RetentionPolicyScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  name: 'name',
  entityType: 'entityType',
  description: 'description',
  retentionDays: 'retentionDays',
  action: 'action',
  conditions: 'conditions',
  isActive: 'isActive',
  lastRunAt: 'lastRunAt',
  lastRunCount: 'lastRunCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InternalJobPostingScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  title: 'title',
  description: 'description',
  jobType: 'jobType',
  visibility: 'visibility',
  status: 'status',
  departmentId: 'departmentId',
  positionId: 'positionId',
  requirements: 'requirements',
  preferredSkills: 'preferredSkills',
  minExperienceYears: 'minExperienceYears',
  applicationDeadline: 'applicationDeadline',
  visibleToDepartmentIds: 'visibleToDepartmentIds',
  hiringManagerId: 'hiringManagerId',
  createdById: 'createdById',
  viewCount: 'viewCount',
  applicationCount: 'applicationCount',
  closedAt: 'closedAt',
  closedReason: 'closedReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InternalApplicationScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  postingId: 'postingId',
  applicantId: 'applicantId',
  status: 'status',
  coverLetter: 'coverLetter',
  resumeUrl: 'resumeUrl',
  managerApproval: 'managerApproval',
  managerApprovalAt: 'managerApprovalAt',
  managerNotes: 'managerNotes',
  interviewNotes: 'interviewNotes',
  rejectionReason: 'rejectionReason',
  withdrawnAt: 'withdrawnAt',
  withdrawnReason: 'withdrawnReason',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CareerProfileScalarFieldEnum = {
  id: 'id',
  tenantId: 'tenantId',
  employeeId: 'employeeId',
  headline: 'headline',
  summary: 'summary',
  skills: 'skills',
  interests: 'interests',
  careerGoals: 'careerGoals',
  openToOpportunities: 'openToOpportunities',
  preferredJobTypes: 'preferredJobTypes',
  preferredDepartments: 'preferredDepartments',
  bookmarkedPostings: 'bookmarkedPostings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  HR_MANAGER: 'HR_MANAGER',
  HR_STAFF: 'HR_STAFF',
  VIEWER: 'VIEWER'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.EmployeeStatus = exports.$Enums.EmployeeStatus = {
  ACTIVE: 'ACTIVE',
  PROBATION: 'PROBATION',
  ON_LEAVE: 'ON_LEAVE',
  RESIGNED: 'RESIGNED',
  TERMINATED: 'TERMINATED'
};

exports.RelationshipType = exports.$Enums.RelationshipType = {
  SPOUSE: 'SPOUSE',
  CHILD: 'CHILD',
  PARENT: 'PARENT',
  OTHER: 'OTHER'
};

exports.ContractType = exports.$Enums.ContractType = {
  PROBATION: 'PROBATION',
  DEFINITE_TERM: 'DEFINITE_TERM',
  INDEFINITE_TERM: 'INDEFINITE_TERM',
  SEASONAL: 'SEASONAL',
  PART_TIME: 'PART_TIME'
};

exports.SalaryType = exports.$Enums.SalaryType = {
  GROSS: 'GROSS',
  NET: 'NET'
};

exports.ContractStatus = exports.$Enums.ContractStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
};

exports.AuditAction = exports.$Enums.AuditAction = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  IMPORT: 'IMPORT',
  EXPORT: 'EXPORT',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT'
};

exports.ShiftType = exports.$Enums.ShiftType = {
  STANDARD: 'STANDARD',
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  NIGHT: 'NIGHT',
  FLEXIBLE: 'FLEXIBLE',
  ROTATING: 'ROTATING'
};

exports.DayType = exports.$Enums.DayType = {
  NORMAL: 'NORMAL',
  WEEKEND: 'WEEKEND',
  HOLIDAY: 'HOLIDAY',
  COMPENSATORY: 'COMPENSATORY'
};

exports.AttendanceSource = exports.$Enums.AttendanceSource = {
  MANUAL: 'MANUAL',
  WEB_CLOCK: 'WEB_CLOCK',
  MOBILE_APP: 'MOBILE_APP',
  FINGERPRINT: 'FINGERPRINT',
  FACE_ID: 'FACE_ID',
  CARD: 'CARD',
  IMPORT: 'IMPORT'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EARLY_LEAVE: 'EARLY_LEAVE',
  LATE_AND_EARLY: 'LATE_AND_EARLY',
  ON_LEAVE: 'ON_LEAVE',
  BUSINESS_TRIP: 'BUSINESS_TRIP',
  WORK_FROM_HOME: 'WORK_FROM_HOME',
  HOLIDAY: 'HOLIDAY'
};

exports.OTStatus = exports.$Enums.OTStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.AnomalyType = exports.$Enums.AnomalyType = {
  MISSING_CHECKOUT: 'MISSING_CHECKOUT',
  MISSING_CHECKIN: 'MISSING_CHECKIN',
  EARLY_CHECKIN: 'EARLY_CHECKIN',
  LATE_CHECKOUT: 'LATE_CHECKOUT',
  LOCATION_MISMATCH: 'LOCATION_MISMATCH',
  DUPLICATE_RECORD: 'DUPLICATE_RECORD',
  OVERTIME_NO_REQUEST: 'OVERTIME_NO_REQUEST',
  MANUAL_ADJUSTMENT: 'MANUAL_ADJUSTMENT'
};

exports.AnomalySeverity = exports.$Enums.AnomalySeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.PayrollComponentCategory = exports.$Enums.PayrollComponentCategory = {
  BASE_SALARY: 'BASE_SALARY',
  ALLOWANCE_TAXABLE: 'ALLOWANCE_TAXABLE',
  ALLOWANCE_NON_TAXABLE: 'ALLOWANCE_NON_TAXABLE',
  OVERTIME: 'OVERTIME',
  BONUS: 'BONUS',
  COMMISSION: 'COMMISSION',
  INSURANCE_EMPLOYEE: 'INSURANCE_EMPLOYEE',
  INSURANCE_EMPLOYER: 'INSURANCE_EMPLOYER',
  PIT: 'PIT',
  ADVANCE: 'ADVANCE',
  LOAN: 'LOAN',
  OTHER_DEDUCTION: 'OTHER_DEDUCTION',
  OTHER_EARNING: 'OTHER_EARNING'
};

exports.PayrollItemType = exports.$Enums.PayrollItemType = {
  EARNING: 'EARNING',
  DEDUCTION: 'DEDUCTION',
  EMPLOYER_COST: 'EMPLOYER_COST'
};

exports.PayrollStatus = exports.$Enums.PayrollStatus = {
  DRAFT: 'DRAFT',
  CALCULATING: 'CALCULATING',
  SIMULATED: 'SIMULATED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

exports.BankCode = exports.$Enums.BankCode = {
  VCB: 'VCB',
  TCB: 'TCB',
  ACB: 'ACB',
  BIDV: 'BIDV',
  VTB: 'VTB',
  MB: 'MB',
  VPB: 'VPB',
  TPB: 'TPB',
  STB: 'STB',
  SHB: 'SHB',
  MSB: 'MSB',
  OCB: 'OCB',
  OTHER: 'OTHER'
};

exports.LeaveType = exports.$Enums.LeaveType = {
  ANNUAL: 'ANNUAL',
  SICK: 'SICK',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
  PERSONAL: 'PERSONAL',
  WEDDING: 'WEDDING',
  BEREAVEMENT: 'BEREAVEMENT',
  UNPAID: 'UNPAID',
  COMPENSATORY: 'COMPENSATORY',
  OTHER: 'OTHER'
};

exports.RequestStatus = exports.$Enums.RequestStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.WorkflowType = exports.$Enums.WorkflowType = {
  LEAVE_REQUEST: 'LEAVE_REQUEST',
  OT_REQUEST: 'OT_REQUEST',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  RESIGNATION: 'RESIGNATION',
  CUSTOM: 'CUSTOM'
};

exports.ApproverType = exports.$Enums.ApproverType = {
  DIRECT_MANAGER: 'DIRECT_MANAGER',
  DEPARTMENT_HEAD: 'DEPARTMENT_HEAD',
  HR_MANAGER: 'HR_MANAGER',
  SPECIFIC_USER: 'SPECIFIC_USER',
  ROLE_BASED: 'ROLE_BASED'
};

exports.ApprovalMode = exports.$Enums.ApprovalMode = {
  SEQUENTIAL: 'SEQUENTIAL',
  PARALLEL: 'PARALLEL',
  QUORUM: 'QUORUM'
};

exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SKIPPED: 'SKIPPED'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  REQUEST_SUBMITTED: 'REQUEST_SUBMITTED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  REQUEST_APPROVED: 'REQUEST_APPROVED',
  REQUEST_REJECTED: 'REQUEST_REJECTED',
  REQUEST_CANCELLED: 'REQUEST_CANCELLED',
  DELEGATION_ASSIGNED: 'DELEGATION_ASSIGNED',
  BALANCE_LOW: 'BALANCE_LOW',
  GENERAL: 'GENERAL'
};

exports.AIIntentType = exports.$Enums.AIIntentType = {
  FAQ: 'FAQ',
  DATA_QUERY: 'DATA_QUERY',
  ACTION_REQUEST: 'ACTION_REQUEST',
  REPORT_REQUEST: 'REPORT_REQUEST',
  GENERAL_CHAT: 'GENERAL_CHAT',
  UNKNOWN: 'UNKNOWN'
};

exports.InsightType = exports.$Enums.InsightType = {
  ANOMALY: 'ANOMALY',
  TREND: 'TREND',
  SUGGESTION: 'SUGGESTION',
  WARNING: 'WARNING'
};

exports.InsightSeverity = exports.$Enums.InsightSeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.EmailStatus = exports.$Enums.EmailStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
  BOUNCED: 'BOUNCED'
};

exports.ImportStatus = exports.$Enums.ImportStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  ROLLED_BACK: 'ROLLED_BACK'
};

exports.WebhookStatus = exports.$Enums.WebhookStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DISABLED: 'DISABLED'
};

exports.MetricType = exports.$Enums.MetricType = {
  HEADCOUNT: 'HEADCOUNT',
  TURNOVER: 'TURNOVER',
  ATTENDANCE: 'ATTENDANCE',
  LABOR_COST: 'LABOR_COST',
  PRODUCTIVITY: 'PRODUCTIVITY',
  LEAVE_USAGE: 'LEAVE_USAGE',
  OVERTIME: 'OVERTIME'
};

exports.MetricPeriod = exports.$Enums.MetricPeriod = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY'
};

exports.RiskLevel = exports.$Enums.RiskLevel = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.JobType = exports.$Enums.JobType = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP',
  TEMPORARY: 'TEMPORARY'
};

exports.WorkMode = exports.$Enums.WorkMode = {
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID'
};

exports.RequisitionStatus = exports.$Enums.RequisitionStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  OPEN: 'OPEN',
  ON_HOLD: 'ON_HOLD',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED'
};

exports.JobPostingStatus = exports.$Enums.JobPostingStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CLOSED: 'CLOSED',
  ARCHIVED: 'ARCHIVED'
};

exports.ApplicationSource = exports.$Enums.ApplicationSource = {
  CAREERS_PAGE: 'CAREERS_PAGE',
  INTERNAL: 'INTERNAL',
  REFERRAL: 'REFERRAL',
  LINKEDIN: 'LINKEDIN',
  FACEBOOK: 'FACEBOOK',
  JOB_BOARD: 'JOB_BOARD',
  AGENCY: 'AGENCY',
  OTHER: 'OTHER'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  NEW: 'NEW',
  SCREENING: 'SCREENING',
  PHONE_SCREEN: 'PHONE_SCREEN',
  INTERVIEW: 'INTERVIEW',
  ASSESSMENT: 'ASSESSMENT',
  OFFER: 'OFFER',
  HIRED: 'HIRED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
};

exports.InterviewType = exports.$Enums.InterviewType = {
  PHONE: 'PHONE',
  VIDEO: 'VIDEO',
  ONSITE: 'ONSITE',
  TECHNICAL: 'TECHNICAL',
  HR: 'HR',
  FINAL: 'FINAL'
};

exports.InterviewResult = exports.$Enums.InterviewResult = {
  PENDING: 'PENDING',
  PASSED: 'PASSED',
  FAILED: 'FAILED',
  NO_SHOW: 'NO_SHOW',
  RESCHEDULED: 'RESCHEDULED'
};

exports.OfferStatus = exports.$Enums.OfferStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
  WITHDRAWN: 'WITHDRAWN'
};

exports.OnboardingStatus = exports.$Enums.OnboardingStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.OnboardingTaskStatus = exports.$Enums.OnboardingTaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  OVERDUE: 'OVERDUE'
};

exports.GoalType = exports.$Enums.GoalType = {
  COMPANY: 'COMPANY',
  DEPARTMENT: 'DEPARTMENT',
  TEAM: 'TEAM',
  INDIVIDUAL: 'INDIVIDUAL'
};

exports.GoalStatus = exports.$Enums.GoalStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  ON_HOLD: 'ON_HOLD'
};

exports.GoalPriority = exports.$Enums.GoalPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.ReviewCycleType = exports.$Enums.ReviewCycleType = {
  ANNUAL: 'ANNUAL',
  SEMI_ANNUAL: 'SEMI_ANNUAL',
  QUARTERLY: 'QUARTERLY',
  PROBATION: 'PROBATION',
  PROJECT: 'PROJECT',
  AD_HOC: 'AD_HOC'
};

exports.ReviewCycleStatus = exports.$Enums.ReviewCycleStatus = {
  DRAFT: 'DRAFT',
  GOAL_SETTING: 'GOAL_SETTING',
  IN_PROGRESS: 'IN_PROGRESS',
  SELF_REVIEW: 'SELF_REVIEW',
  MANAGER_REVIEW: 'MANAGER_REVIEW',
  CALIBRATION: 'CALIBRATION',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.ReviewStatus = exports.$Enums.ReviewStatus = {
  NOT_STARTED: 'NOT_STARTED',
  SELF_REVIEW_PENDING: 'SELF_REVIEW_PENDING',
  SELF_REVIEW_DONE: 'SELF_REVIEW_DONE',
  MANAGER_REVIEW_PENDING: 'MANAGER_REVIEW_PENDING',
  MANAGER_REVIEW_DONE: 'MANAGER_REVIEW_DONE',
  CALIBRATION_PENDING: 'CALIBRATION_PENDING',
  COMPLETED: 'COMPLETED',
  ACKNOWLEDGED: 'ACKNOWLEDGED'
};

exports.FeedbackType = exports.$Enums.FeedbackType = {
  CONTINUOUS: 'CONTINUOUS',
  REVIEW_360: 'REVIEW_360',
  PEER: 'PEER',
  UPWARD: 'UPWARD',
  RECOGNITION: 'RECOGNITION'
};

exports.FeedbackRequestStatus = exports.$Enums.FeedbackRequestStatus = {
  REQUESTED: 'REQUESTED',
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  DECLINED: 'DECLINED'
};

exports.PIPStatus = exports.$Enums.PIPStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  EXTENDED: 'EXTENDED',
  COMPLETED_SUCCESS: 'COMPLETED_SUCCESS',
  COMPLETED_FAIL: 'COMPLETED_FAIL',
  CANCELLED: 'CANCELLED'
};

exports.CourseType = exports.$Enums.CourseType = {
  CLASSROOM: 'CLASSROOM',
  ELEARNING: 'ELEARNING',
  BLENDED: 'BLENDED',
  VIRTUAL: 'VIRTUAL',
  ON_THE_JOB: 'ON_THE_JOB',
  MENTORING: 'MENTORING'
};

exports.CourseLevel = exports.$Enums.CourseLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.CourseStatus = exports.$Enums.CourseStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.SessionStatus = exports.$Enums.SessionStatus = {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  POSTPONED: 'POSTPONED'
};

exports.EnrollmentStatus = exports.$Enums.EnrollmentStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ENROLLED: 'ENROLLED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

exports.TrainingRequestStatus = exports.$Enums.TrainingRequestStatus = {
  DRAFT: 'DRAFT',
  PENDING_MANAGER: 'PENDING_MANAGER',
  PENDING_HR: 'PENDING_HR',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.LearningPathStatus = exports.$Enums.LearningPathStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ABANDONED: 'ABANDONED'
};

exports.CertificationStatus = exports.$Enums.CertificationStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRING_SOON: 'EXPIRING_SOON',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

exports.AssessmentType = exports.$Enums.AssessmentType = {
  QUIZ: 'QUIZ',
  TEST: 'TEST',
  ASSIGNMENT: 'ASSIGNMENT',
  PRACTICAL: 'PRACTICAL',
  SURVEY: 'SURVEY'
};

exports.QuestionType = exports.$Enums.QuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  SHORT_ANSWER: 'SHORT_ANSWER',
  ESSAY: 'ESSAY',
  RATING: 'RATING'
};

exports.CompensationCycleStatus = exports.$Enums.CompensationCycleStatus = {
  PLANNING: 'PLANNING',
  IN_PROGRESS: 'IN_PROGRESS',
  CALIBRATION: 'CALIBRATION',
  APPROVAL: 'APPROVAL',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.CompensationReviewStatus = exports.$Enums.CompensationReviewStatus = {
  DRAFT: 'DRAFT',
  PENDING_MANAGER: 'PENDING_MANAGER',
  PENDING_HR: 'PENDING_HR',
  PENDING_CALIBRATION: 'PENDING_CALIBRATION',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

exports.CompensationChangeType = exports.$Enums.CompensationChangeType = {
  MERIT_INCREASE: 'MERIT_INCREASE',
  PROMOTION: 'PROMOTION',
  ADJUSTMENT: 'ADJUSTMENT',
  MARKET_CORRECTION: 'MARKET_CORRECTION',
  DEMOTION: 'DEMOTION',
  NEW_HIRE: 'NEW_HIRE',
  TRANSFER: 'TRANSFER'
};

exports.BenefitType = exports.$Enums.BenefitType = {
  MANDATORY: 'MANDATORY',
  OPTIONAL: 'OPTIONAL',
  ALLOWANCE: 'ALLOWANCE',
  PERK: 'PERK'
};

exports.BenefitEnrollmentStatus = exports.$Enums.BenefitEnrollmentStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

exports.AllowanceFrequency = exports.$Enums.AllowanceFrequency = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  ANNUAL: 'ANNUAL',
  ONE_TIME: 'ONE_TIME'
};

exports.InsuranceReportType = exports.$Enums.InsuranceReportType = {
  D02_TS: 'D02_TS',
  D03_TS: 'D03_TS',
  C12_TS: 'C12_TS',
  TK1_TS: 'TK1_TS'
};

exports.InsuranceReportStatus = exports.$Enums.InsuranceReportStatus = {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  SUBMITTED: 'SUBMITTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

exports.DeviceType = exports.$Enums.DeviceType = {
  FINGERPRINT: 'FINGERPRINT',
  FACE_RECOGNITION: 'FACE_RECOGNITION',
  CARD_READER: 'CARD_READER',
  GPS_CHECKIN: 'GPS_CHECKIN',
  QR_CODE: 'QR_CODE'
};

exports.DeviceStatus = exports.$Enums.DeviceStatus = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  MAINTENANCE: 'MAINTENANCE',
  ERROR: 'ERROR'
};

exports.PaymentBatchStatus = exports.$Enums.PaymentBatchStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.PaymentTransactionStatus = exports.$Enums.PaymentTransactionStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.CertificateStatus = exports.$Enums.CertificateStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
  PENDING_RENEWAL: 'PENDING_RENEWAL'
};

exports.SignatureStatus = exports.$Enums.SignatureStatus = {
  PENDING: 'PENDING',
  SIGNED: 'SIGNED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

exports.SurveyType = exports.$Enums.SurveyType = {
  PULSE: 'PULSE',
  ENPS: 'ENPS',
  ENGAGEMENT: 'ENGAGEMENT',
  ONBOARDING: 'ONBOARDING',
  EXIT: 'EXIT',
  EVENT: 'EVENT',
  CUSTOM: 'CUSTOM'
};

exports.SurveyTargetType = exports.$Enums.SurveyTargetType = {
  ALL: 'ALL',
  DEPARTMENT: 'DEPARTMENT',
  POSITION: 'POSITION',
  CUSTOM: 'CUSTOM'
};

exports.SurveyStatus = exports.$Enums.SurveyStatus = {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  ARCHIVED: 'ARCHIVED'
};

exports.SurveyQuestionType = exports.$Enums.SurveyQuestionType = {
  SCALE: 'SCALE',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
  RATING: 'RATING',
  NPS: 'NPS',
  YES_NO: 'YES_NO'
};

exports.PointTransactionType = exports.$Enums.PointTransactionType = {
  EARNED_RECOGNITION: 'EARNED_RECOGNITION',
  GAVE_RECOGNITION: 'GAVE_RECOGNITION',
  EARNED_ACHIEVEMENT: 'EARNED_ACHIEVEMENT',
  SPENT_REWARD: 'SPENT_REWARD',
  ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT',
  MONTHLY_BONUS: 'MONTHLY_BONUS'
};

exports.PostType = exports.$Enums.PostType = {
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  NEWS: 'NEWS',
  UPDATE: 'UPDATE',
  EVENT: 'EVENT',
  CELEBRATION: 'CELEBRATION',
  POLL: 'POLL',
  SOCIAL: 'SOCIAL'
};

exports.PostVisibility = exports.$Enums.PostVisibility = {
  ALL: 'ALL',
  DEPARTMENT: 'DEPARTMENT',
  MANAGERS: 'MANAGERS',
  HR: 'HR'
};

exports.PostStatus = exports.$Enums.PostStatus = {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.EventType = exports.$Enums.EventType = {
  MEETING: 'MEETING',
  TRAINING: 'TRAINING',
  SOCIAL: 'SOCIAL',
  CELEBRATION: 'CELEBRATION',
  TOWN_HALL: 'TOWN_HALL',
  WORKSHOP: 'WORKSHOP',
  OTHER: 'OTHER'
};

exports.RsvpStatus = exports.$Enums.RsvpStatus = {
  PENDING: 'PENDING',
  ATTENDING: 'ATTENDING',
  NOT_ATTENDING: 'NOT_ATTENDING',
  MAYBE: 'MAYBE'
};

exports.SeparationType = exports.$Enums.SeparationType = {
  RESIGNATION: 'RESIGNATION',
  TERMINATION: 'TERMINATION',
  RETIREMENT: 'RETIREMENT',
  CONTRACT_END: 'CONTRACT_END',
  MUTUAL: 'MUTUAL',
  OTHER: 'OTHER'
};

exports.OffboardingStatus = exports.$Enums.OffboardingStatus = {
  INITIATED: 'INITIATED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING_CLEARANCE: 'PENDING_CLEARANCE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.OffboardingCategory = exports.$Enums.OffboardingCategory = {
  DOCUMENTATION: 'DOCUMENTATION',
  IT: 'IT',
  FINANCE: 'FINANCE',
  ASSETS: 'ASSETS',
  KNOWLEDGE: 'KNOWLEDGE',
  HR: 'HR',
  BENEFITS: 'BENEFITS'
};

exports.SnapshotType = exports.$Enums.SnapshotType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY'
};

exports.PredictionModelType = exports.$Enums.PredictionModelType = {
  TURNOVER_RISK: 'TURNOVER_RISK',
  PROMOTION_READINESS: 'PROMOTION_READINESS',
  PERFORMANCE_TREND: 'PERFORMANCE_TREND',
  SKILL_GAP: 'SKILL_GAP',
  COMPENSATION_EQUITY: 'COMPENSATION_EQUITY',
  HEADCOUNT_FORECAST: 'HEADCOUNT_FORECAST'
};

exports.PredictionStatus = exports.$Enums.PredictionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED'
};

exports.ReportExportFormat = exports.$Enums.ReportExportFormat = {
  PDF: 'PDF',
  EXCEL: 'EXCEL',
  CSV: 'CSV',
  JSON: 'JSON'
};

exports.ReportExportStatus = exports.$Enums.ReportExportStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.AlertSeverity = exports.$Enums.AlertSeverity = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};

exports.AlertStatus = exports.$Enums.AlertStatus = {
  ACTIVE: 'ACTIVE',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  RESOLVED: 'RESOLVED',
  DISMISSED: 'DISMISSED'
};

exports.ErasureStatus = exports.$Enums.ErasureStatus = {
  REQUESTED: 'REQUESTED',
  REVIEWING: 'REVIEWING',
  APPROVED: 'APPROVED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

exports.InternalJobType = exports.$Enums.InternalJobType = {
  TRANSFER: 'TRANSFER',
  PROMOTION: 'PROMOTION',
  ROTATION: 'ROTATION',
  PROJECT: 'PROJECT',
  TEMPORARY: 'TEMPORARY'
};

exports.MarketplaceVisibility = exports.$Enums.MarketplaceVisibility = {
  ALL: 'ALL',
  DEPARTMENT: 'DEPARTMENT',
  SELECTED_DEPARTMENTS: 'SELECTED_DEPARTMENTS',
  INTERNAL_ONLY: 'INTERNAL_ONLY'
};

exports.MarketplacePostingStatus = exports.$Enums.MarketplacePostingStatus = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED'
};

exports.InternalApplicationStatus = exports.$Enums.InternalApplicationStatus = {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  MANAGER_APPROVED: 'MANAGER_APPROVED',
  MANAGER_REJECTED: 'MANAGER_REJECTED',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW: 'INTERVIEW',
  OFFERED: 'OFFERED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
};

exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  User: 'User',
  Department: 'Department',
  Position: 'Position',
  Branch: 'Branch',
  Employee: 'Employee',
  Dependent: 'Dependent',
  Contract: 'Contract',
  AuditLog: 'AuditLog',
  EmployeeChangeHistory: 'EmployeeChangeHistory',
  Shift: 'Shift',
  ShiftAssignment: 'ShiftAssignment',
  WorkSchedule: 'WorkSchedule',
  Holiday: 'Holiday',
  Attendance: 'Attendance',
  OvertimeRequest: 'OvertimeRequest',
  AttendanceSummary: 'AttendanceSummary',
  AttendanceAnomaly: 'AttendanceAnomaly',
  PayrollConfig: 'PayrollConfig',
  SalaryComponent: 'SalaryComponent',
  PayrollPeriod: 'PayrollPeriod',
  Payroll: 'Payroll',
  PayrollItem: 'PayrollItem',
  PayrollAdjustment: 'PayrollAdjustment',
  BankPaymentBatch: 'BankPaymentBatch',
  LeavePolicy: 'LeavePolicy',
  LeaveBalance: 'LeaveBalance',
  LeaveRequest: 'LeaveRequest',
  WorkflowDefinition: 'WorkflowDefinition',
  WorkflowStep: 'WorkflowStep',
  WorkflowInstance: 'WorkflowInstance',
  ApprovalStep: 'ApprovalStep',
  Delegation: 'Delegation',
  Notification: 'Notification',
  ProfileUpdateRequest: 'ProfileUpdateRequest',
  KnowledgeArticle: 'KnowledgeArticle',
  AIConversation: 'AIConversation',
  AIMessage: 'AIMessage',
  Insight: 'Insight',
  SavedReport: 'SavedReport',
  EmailQueue: 'EmailQueue',
  EmailTemplate: 'EmailTemplate',
  ImportJob: 'ImportJob',
  ApiKey: 'ApiKey',
  Webhook: 'Webhook',
  WebhookDelivery: 'WebhookDelivery',
  SystemConfig: 'SystemConfig',
  AnalyticsMetric: 'AnalyticsMetric',
  TurnoverPrediction: 'TurnoverPrediction',
  Dashboard: 'Dashboard',
  DashboardWidget: 'DashboardWidget',
  AnalyticsReport: 'AnalyticsReport',
  SalaryBenchmark: 'SalaryBenchmark',
  JobRequisition: 'JobRequisition',
  JobPosting: 'JobPosting',
  Candidate: 'Candidate',
  Application: 'Application',
  ApplicationActivity: 'ApplicationActivity',
  Interview: 'Interview',
  CandidateEvaluation: 'CandidateEvaluation',
  Offer: 'Offer',
  OnboardingTemplate: 'OnboardingTemplate',
  OnboardingTemplateTask: 'OnboardingTemplateTask',
  Onboarding: 'Onboarding',
  OnboardingTask: 'OnboardingTask',
  Goal: 'Goal',
  KeyResult: 'KeyResult',
  GoalUpdate: 'GoalUpdate',
  KeyResultUpdate: 'KeyResultUpdate',
  ReviewCycle: 'ReviewCycle',
  PerformanceReview: 'PerformanceReview',
  ReviewGoal: 'ReviewGoal',
  CompetencyFramework: 'CompetencyFramework',
  Competency: 'Competency',
  PositionCompetency: 'PositionCompetency',
  ReviewCompetency: 'ReviewCompetency',
  CoreValue: 'CoreValue',
  ReviewValue: 'ReviewValue',
  FeedbackRequest: 'FeedbackRequest',
  Feedback: 'Feedback',
  CalibrationSession: 'CalibrationSession',
  CalibrationDecision: 'CalibrationDecision',
  CheckIn: 'CheckIn',
  OneOnOne: 'OneOnOne',
  PerformanceImprovementPlan: 'PerformanceImprovementPlan',
  PIPMilestone: 'PIPMilestone',
  PIPCheckIn: 'PIPCheckIn',
  SkillCategory: 'SkillCategory',
  Skill: 'Skill',
  EmployeeSkill: 'EmployeeSkill',
  PositionSkill: 'PositionSkill',
  CourseCategory: 'CourseCategory',
  Course: 'Course',
  CourseModule: 'CourseModule',
  CourseSkill: 'CourseSkill',
  TrainingProvider: 'TrainingProvider',
  TrainingSession: 'TrainingSession',
  Enrollment: 'Enrollment',
  ModuleCompletion: 'ModuleCompletion',
  SessionAttendance: 'SessionAttendance',
  TrainingRequest: 'TrainingRequest',
  LearningPath: 'LearningPath',
  LearningPathStage: 'LearningPathStage',
  LearningPathCourse: 'LearningPathCourse',
  LearningPathEnrollment: 'LearningPathEnrollment',
  CertificationType: 'CertificationType',
  EmployeeCertification: 'EmployeeCertification',
  Assessment: 'Assessment',
  AssessmentQuestion: 'AssessmentQuestion',
  AssessmentAttempt: 'AssessmentAttempt',
  QuestionResponse: 'QuestionResponse',
  TrainingBudget: 'TrainingBudget',
  SalaryGrade: 'SalaryGrade',
  MeritMatrix: 'MeritMatrix',
  CompensationCycle: 'CompensationCycle',
  CompensationReview: 'CompensationReview',
  CompensationChange: 'CompensationChange',
  CompensationBudget: 'CompensationBudget',
  EmployeeCompensation: 'EmployeeCompensation',
  BenefitPlan: 'BenefitPlan',
  BenefitEnrollment: 'BenefitEnrollment',
  AllowanceType: 'AllowanceType',
  EmployeeAllowance: 'EmployeeAllowance',
  TotalRewardsStatement: 'TotalRewardsStatement',
  PayEquityAnalysis: 'PayEquityAnalysis',
  CompensationBenchmark: 'CompensationBenchmark',
  CompensationHistory: 'CompensationHistory',
  EmployeeInsurance: 'EmployeeInsurance',
  InsuranceReport: 'InsuranceReport',
  InsuranceReportDetail: 'InsuranceReportDetail',
  TaxSettlement: 'TaxSettlement',
  AttendanceDevice: 'AttendanceDevice',
  OfficeLocation: 'OfficeLocation',
  DeviceSyncLog: 'DeviceSyncLog',
  RawPunchLog: 'RawPunchLog',
  BankConfiguration: 'BankConfiguration',
  PaymentBatch: 'PaymentBatch',
  PaymentTransaction: 'PaymentTransaction',
  SignatureProvider: 'SignatureProvider',
  EmployeeCertificate: 'EmployeeCertificate',
  SignableDocument: 'SignableDocument',
  DocumentSignature: 'DocumentSignature',
  Survey: 'Survey',
  SurveyQuestion: 'SurveyQuestion',
  SurveyResponse: 'SurveyResponse',
  SurveyAnswer: 'SurveyAnswer',
  RecognitionCategory: 'RecognitionCategory',
  Recognition: 'Recognition',
  RecognitionReaction: 'RecognitionReaction',
  RecognitionComment: 'RecognitionComment',
  EmployeePoints: 'EmployeePoints',
  PointTransaction: 'PointTransaction',
  CompanyPost: 'CompanyPost',
  PostReaction: 'PostReaction',
  PostComment: 'PostComment',
  PostRead: 'PostRead',
  CompanyEvent: 'CompanyEvent',
  EventAttendee: 'EventAttendee',
  OffboardingInstance: 'OffboardingInstance',
  OffboardingTask: 'OffboardingTask',
  AnalyticsSnapshot: 'AnalyticsSnapshot',
  PredictiveModel: 'PredictiveModel',
  Prediction: 'Prediction',
  CustomReport: 'CustomReport',
  ReportExport: 'ReportExport',
  AnalyticsAlert: 'AnalyticsAlert',
  AlertTriggerHistory: 'AlertTriggerHistory',
  CustomRole: 'CustomRole',
  RolePermission: 'RolePermission',
  UserCustomRole: 'UserCustomRole',
  FieldPermission: 'FieldPermission',
  ErasureRequest: 'ErasureRequest',
  RetentionPolicy: 'RetentionPolicy',
  InternalJobPosting: 'InternalJobPosting',
  InternalApplication: 'InternalApplication',
  CareerProfile: 'CareerProfile'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
