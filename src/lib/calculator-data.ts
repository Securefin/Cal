
import {
  Sigma,
  Landmark,
  HeartPulse,
  FlaskConical,
  Sparkles,
  Wand2,
  Calculator as CalculatorIcon,
  Percent,
  Atom,
  Hash,
  Ratio,
  DivideSquare,
  Layers,
  Baseline,
  Target,
  Binary,
  Banknote,
  TrendingUp,
  PiggyBank,
  ShieldCheck,
  ReceiptText,
  FileText,
  ArrowBigUpDash,
  CreditCard,
  Activity,
  LineChart,
  Scale,
  Flame,
  CalendarDays,
  CalendarClock,
  Droplet,
  Footprints,
  Dumbbell,
  Spline,
  Grid3x3,
  LayoutGrid,
  Zap,
  Signal,
  HandCoins,
  Tag,
  Replace,
  Cake,
  Clock,
  KeyRound,
  ScanLine,
  QrCode,
  Dice5,
  LockKeyhole,
  LucideIcon
} from "lucide-react";

export interface CalculatorItem {
  name: string;
  slug: string;
  isImplemented?: boolean;
  isAdvanced?: boolean;
  isDemo?: boolean;
  icon?: LucideIcon;
}

export interface CalculatorCategory {
  name: string;
  icon: LucideIcon;
  calculators: CalculatorItem[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: "Basic Math Calculators",
    icon: Sigma,
    calculators: [
      { name: "Basic Calculator", slug: "basic", isImplemented: true, icon: CalculatorIcon },
      { name: "Scientific Calculator", slug: "scientific", isImplemented: true, icon: Atom },
      { name: "Percentage Calculator", slug: "percentage", isImplemented: true, icon: Percent },
      { name: "Average Calculator", slug: "average", isImplemented: true, icon: Hash },
      { name: "Ratio Calculator", slug: "ratio", isImplemented: true, icon: Ratio },
      { name: "Fraction Calculator", slug: "fraction", isImplemented: true, icon: DivideSquare },
      { name: "LCM & HCF Calculator", slug: "lcm-hcf", isImplemented: true, icon: Layers },
      { name: "Exponent Calculator", slug: "exponent", isImplemented: true, icon: Baseline },
      { name: "Logarithm Calculator", slug: "logarithm", isImplemented: true, icon: Target },
      { name: "Modulo Calculator", slug: "modulo", isImplemented: true, icon: Binary },
    ],
  },
  {
    name: "Financial Calculators",
    icon: Landmark,
    calculators: [
      { name: "Loan EMI Calculator", slug: "loan-emi", isImplemented: true, icon: Banknote },
      { name: "SIP (Mutual Fund) Calculator", slug: "sip", isImplemented: true, icon: TrendingUp },
      { name: "Public Provident Fund (PPF) Calculator", slug: "ppf", isImplemented: true, icon: PiggyBank },
      { name: "Fixed Deposit (FD) Calculator", slug: "fd", isImplemented: true, icon: ShieldCheck },
      { name: "GST Calculator", slug: "gst", isImplemented: true, icon: ReceiptText },
      { name: "Income Tax Calculator", slug: "income-tax", isImplemented: true, icon: FileText },
      { name: "Inflation Calculator", slug: "inflation", isImplemented: true, icon: ArrowBigUpDash },
      { name: "Credit Card Payment Calculator", slug: "credit-card-payment", isImplemented: true, icon: CreditCard },
      { name: "ROI (Return on Investment) Calculator", slug: "roi", isImplemented: true, icon: Activity },
      { name: "NPV (Net Present Value) Calculator", slug: "npv", isImplemented: true, icon: LineChart },
    ],
  },
  {
    name: "Health & Fitness Calculators",
    icon: HeartPulse,
    calculators: [
      { name: "BMI (Body Mass Index) Calculator", slug: "bmi", isImplemented: true, icon: Scale },
      { name: "BMR (Basal Metabolic Rate) Calculator", slug: "bmr", isImplemented: true, icon: HeartPulse },
      { name: "Calorie Calculator", slug: "calorie", isImplemented: true, icon: Flame },
      { name: "Pregnancy Due Date Calculator", slug: "pregnancy-due-date", isImplemented: true, icon: CalendarDays },
      { name: "Blood Pressure Calculator", slug: "blood-pressure", isImplemented: true, icon: Activity },
      { name: "Water Intake Calculator", slug: "water-intake", isImplemented: true, icon: Droplet },
      { name: "Steps to Calorie Calculator", slug: "steps-to-calorie", isImplemented: true, icon: Footprints },
      { name: "Muscle Mass Calculator", slug: "muscle-mass", isImplemented: true, icon: Dumbbell },
    ],
  },
  {
    name: "Engineering & Science Calculators",
    icon: FlaskConical,
    calculators: [
      { name: "Scientific Notation Calculator", slug: "scientific-notation", isImplemented: true, icon: Atom },
      { name: "Graphing Calculator", slug: "graphing", isImplemented: true, isDemo: true, icon: Spline },
      { name: "Matrix Calculator", slug: "matrix", isImplemented: true, icon: LayoutGrid }, // Changed icon for list
      { name: "Chemistry Molar Mass Calculator", slug: "chemistry-molar-mass", isImplemented: true, icon: FlaskConical },
      { name: "Electricity Calculator", slug: "electricity", isImplemented: true, icon: Zap },
      { name: "Ohm's Law Calculator", slug: "ohms-law", isImplemented: true, icon: Zap },
      { name: "Wavelength Calculator", slug: "wavelength", isImplemented: true, icon: Signal },
      { name: "Binary/Hexadecimal Calculator", slug: "binary-hexadecimal", isImplemented: true, icon: Binary },
    ],
  },
  {
    name: "Everyday Life Calculators",
    icon: Sparkles,
    calculators: [
      { name: "Tip Calculator", slug: "tip", isImplemented: true, icon: HandCoins },
      { name: "Discount Calculator", slug: "discount", isImplemented: true, icon: Tag },
      { name: "Unit Converter", slug: "unit-converter", isImplemented: true, isDemo: true, icon: Replace },
      { name: "Currency Converter", slug: "currency-converter", isImplemented: true, isDemo: true, icon: Landmark },
      { name: "Age Calculator", slug: "age", isImplemented: true, icon: Cake },
      { name: "Date Difference Calculator", slug: "date-difference", isImplemented: true, icon: CalendarClock },
      { name: "Time Calculator", slug: "time", isImplemented: true, icon: Clock },
      { name: "Password Generator", slug: "password-generator", isImplemented: true, icon: KeyRound },
    ],
  },
  {
    name: "Advanced & Special Tools",
    icon: Wand2,
    calculators: [
      { name: "Function Graph Plotter", slug: "graphing", isImplemented: true, isDemo: true, icon: Spline }, // Points to graphing
      { name: "Casio-style Calculator", slug: "casio-style", isImplemented: true, icon: CalculatorIcon },
      { name: "Barcode Generator", slug: "barcode-generator", isImplemented: true, icon: ScanLine },
      { name: "QR Code Generator", slug: "qr-code-generator", isImplemented: true, icon: QrCode },
      { name: "Random Number Generator", slug: "random-number-generator", isImplemented: true, icon: Dice5 },
      { name: "Password Strength Checker", slug: "password-strength-checker", isImplemented: true, icon: LockKeyhole },
      { name: "Math Formula Solver", slug: "math-formula-solver", isImplemented: true, icon: Wand2 },
    ],
  },
];
