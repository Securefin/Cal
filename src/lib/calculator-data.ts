
import type { LucideIcon } from "lucide-react"; // Still needed for the type, but not for direct imports

// Note: We are changing icon?: LucideIcon to iconName?: string
// and icon: LucideIcon to iconName: string for categories (making it required).

export interface CalculatorItem {
  name: string;
  slug: string;
  isImplemented?: boolean;
  isAdvanced?: boolean;
  isDemo?: boolean;
  iconName?: string; // Changed from icon: LucideIcon
}

export interface CalculatorCategory {
  name: string;
  iconName: string; // Changed from icon: LucideIcon, made non-optional for categories
  calculators: CalculatorItem[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: "Basic Math Calculators",
    iconName: "Sigma",
    calculators: [
      { name: "Basic Calculator", slug: "basic", isImplemented: true, iconName: "Calculator" },
      { name: "Scientific Calculator", slug: "scientific", isImplemented: true, iconName: "Atom" },
      { name: "Percentage Calculator", slug: "percentage", isImplemented: true, iconName: "Percent" },
      { name: "Average Calculator", slug: "average", isImplemented: true, iconName: "Hash" },
      { name: "Ratio Calculator", slug: "ratio", isImplemented: true, iconName: "Ratio" },
      { name: "Fraction Calculator", slug: "fraction", isImplemented: true, iconName: "DivideSquare" },
      { name: "LCM & HCF Calculator", slug: "lcm-hcf", isImplemented: true, iconName: "Layers" },
      { name: "Exponent Calculator", slug: "exponent", isImplemented: true, iconName: "Baseline" },
      { name: "Logarithm Calculator", slug: "logarithm", isImplemented: true, iconName: "Target" },
      { name: "Modulo Calculator", slug: "modulo", isImplemented: true, iconName: "Binary" },
    ],
  },
  {
    name: "Financial Calculators",
    iconName: "Landmark",
    calculators: [
      { name: "Loan EMI Calculator", slug: "loan-emi", isImplemented: true, iconName: "Banknote" },
      { name: "SIP (Mutual Fund) Calculator", slug: "sip", isImplemented: true, iconName: "TrendingUp" },
      { name: "Public Provident Fund (PPF) Calculator", slug: "ppf", isImplemented: true, iconName: "PiggyBank" },
      { name: "Fixed Deposit (FD) Calculator", slug: "fd", isImplemented: true, iconName: "ShieldCheck" },
      { name: "GST Calculator", slug: "gst", isImplemented: true, iconName: "ReceiptText" },
      { name: "Income Tax Calculator", slug: "income-tax", isImplemented: true, iconName: "FileText" },
      { name: "Inflation Calculator", slug: "inflation", isImplemented: true, iconName: "ArrowBigUpDash" },
      { name: "Credit Card Payment Calculator", slug: "credit-card-payment", isImplemented: true, iconName: "CreditCard" },
      { name: "ROI (Return on Investment) Calculator", slug: "roi", isImplemented: true, iconName: "Activity" },
      { name: "NPV (Net Present Value) Calculator", slug: "npv", isImplemented: true, iconName: "LineChart" },
    ],
  },
  {
    name: "Health & Fitness Calculators",
    iconName: "HeartPulse",
    calculators: [
      { name: "BMI (Body Mass Index) Calculator", slug: "bmi", isImplemented: true, iconName: "Scale" },
      { name: "BMR (Basal Metabolic Rate) Calculator", slug: "bmr", isImplemented: true, iconName: "HeartPulse" },
      { name: "Calorie Calculator", slug: "calorie", isImplemented: true, iconName: "Flame" },
      { name: "Pregnancy Due Date Calculator", slug: "pregnancy-due-date", isImplemented: true, iconName: "CalendarDays" },
      { name: "Blood Pressure Calculator", slug: "blood-pressure", isImplemented: true, iconName: "Activity" },
      { name: "Water Intake Calculator", slug: "water-intake", isImplemented: true, iconName: "Droplet" },
      { name: "Steps to Calorie Calculator", slug: "steps-to-calorie", isImplemented: true, iconName: "Footprints" },
      { name: "Muscle Mass Calculator", slug: "muscle-mass", isImplemented: true, iconName: "Dumbbell" },
    ],
  },
  {
    name: "Engineering & Science Calculators",
    iconName: "FlaskConical",
    calculators: [
      { name: "Scientific Notation Calculator", slug: "scientific-notation", isImplemented: true, iconName: "Atom" },
      { name: "Graphing Calculator", slug: "graphing", isImplemented: true, isDemo: true, iconName: "Spline" },
      { name: "Matrix Calculator", slug: "matrix", isImplemented: true, iconName: "LayoutGrid" },
      { name: "Chemistry Molar Mass Calculator", slug: "chemistry-molar-mass", isImplemented: true, iconName: "FlaskConical" },
      { name: "Electricity Calculator", slug: "electricity", isImplemented: true, iconName: "Zap" },
      { name: "Ohm's Law Calculator", slug: "ohms-law", isImplemented: true, iconName: "Zap" },
      { name: "Wavelength Calculator", slug: "wavelength", isImplemented: true, iconName: "Signal" },
      { name: "Binary/Hexadecimal Calculator", slug: "binary-hexadecimal", isImplemented: true, iconName: "Binary" },
    ],
  },
  {
    name: "Everyday Life Calculators",
    iconName: "Sparkles",
    calculators: [
      { name: "Tip Calculator", slug: "tip", isImplemented: true, iconName: "HandCoins" },
      { name: "Discount Calculator", slug: "discount", isImplemented: true, iconName: "Tag" },
      { name: "Unit Converter", slug: "unit-converter", isImplemented: true, isDemo: true, iconName: "Replace" },
      { name: "Currency Converter", slug: "currency-converter", isImplemented: true, isDemo: true, iconName: "Landmark" },
      { name: "Age Calculator", slug: "age", isImplemented: true, iconName: "Cake" },
      { name: "Date Difference Calculator", slug: "date-difference", isImplemented: true, iconName: "CalendarClock" },
      { name: "Time Calculator", slug: "time", isImplemented: true, iconName: "Clock" },
      { name: "Password Generator", slug: "password-generator", isImplemented: true, iconName: "KeyRound" },
    ],
  },
  {
    name: "Advanced & Special Tools",
    iconName: "Wand2",
    calculators: [
      { name: "Function Graph Plotter", slug: "graphing", isImplemented: true, isDemo: true, iconName: "Spline" },
      { name: "Casio-style Calculator", slug: "casio-style", isImplemented: true, iconName: "Calculator" }, // Kept Calculator icon name
      { name: "Barcode Generator", slug: "barcode-generator", isImplemented: true, iconName: "ScanLine" },
      { name: "QR Code Generator", slug: "qr-code-generator", isImplemented: true, iconName: "QrCode" },
      { name: "Random Number Generator", slug: "random-number-generator", isImplemented: true, iconName: "Dice5" },
      { name: "Password Strength Checker", slug: "password-strength-checker", isImplemented: true, iconName: "LockKeyhole" },
      { name: "Math Formula Solver", slug: "math-formula-solver", isImplemented: true, iconName: "Wand2" },
    ],
  },
];
