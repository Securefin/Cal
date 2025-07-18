
import type { LucideIcon } from "lucide-react";

export interface CalculatorItem {
  name: string;
  slug: string;
  description?: string; // Added description
  isImplemented?: boolean;
  isAdvanced?: boolean;
  isDemo?: boolean;
  iconName?: string;
}

export interface CalculatorCategory {
  name: string;
  iconName: string;
  calculators: CalculatorItem[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: "Basic Math Calculators",
    iconName: "Sigma",
    calculators: [
      { name: "Basic Calculator", slug: "basic", description: "Perform simple arithmetic operations.", isImplemented: true, iconName: "Calculator" },
      { name: "Scientific Calculator", slug: "scientific", description: "Advanced functions like trig and logs.", isImplemented: true, iconName: "Atom" },
      { name: "Percentage Calculator", slug: "percentage", description: "Calculate percentages, increases, and decreases.", isImplemented: true, iconName: "Percent" },
      { name: "Average Calculator", slug: "average", description: "Find the mean of a set of numbers.", isImplemented: true, iconName: "Hash" },
      { name: "Ratio Calculator", slug: "ratio", description: "Solve for unknowns in proportions.", isImplemented: true, iconName: "Ratio" },
      { name: "Fraction Calculator", slug: "fraction", description: "Add, subtract, multiply, and divide fractions.", isImplemented: true, iconName: "DivideSquare" },
      { name: "LCM & HCF Calculator", slug: "lcm-hcf", description: "Find the least common multiple and highest common factor.", isImplemented: true, iconName: "Layers" },
      { name: "Exponent Calculator", slug: "exponent", description: "Calculate numbers raised to a power.", isImplemented: true, iconName: "Baseline" },
      { name: "Logarithm Calculator", slug: "logarithm", description: "Compute logarithms to any base.", isImplemented: true, iconName: "Target" },
      { name: "Modulo Calculator", slug: "modulo", description: "Find the remainder of a division.", isImplemented: true, iconName: "Binary" },
    ],
  },
  {
    name: "Financial Calculators",
    iconName: "Landmark",
    calculators: [
      { name: "Loan EMI Calculator", slug: "loan-emi", description: "Calculate your equated monthly loan installments.", isImplemented: true, iconName: "Banknote" },
      { name: "SIP (Mutual Fund) Calculator", slug: "sip", description: "Project the future value of your SIP investments.", isImplemented: true, iconName: "TrendingUp" },
      { name: "Public Provident Fund (PPF) Calculator", slug: "ppf", description: "Estimate returns on your PPF account.", isImplemented: true, iconName: "PiggyBank" },
      { name: "Fixed Deposit (FD) Calculator", slug: "fd", description: "Calculate maturity value of fixed deposits.", isImplemented: true, iconName: "ShieldCheck" },
      { name: "GST Calculator", slug: "gst", description: "Add or remove Goods and Services Tax.", isImplemented: true, iconName: "ReceiptText" },
      { name: "Income Tax Calculator", slug: "income-tax", description: "Estimate your annual income tax liability.", isImplemented: true, iconName: "FileText" },
      { name: "Inflation Calculator", slug: "inflation", description: "Calculate the future value of money.", isImplemented: true, iconName: "ArrowBigUpDash" },
      { name: "Credit Card Payment Calculator", slug: "credit-card-payment", description: "Estimate your credit card payoff time.", isImplemented: true, iconName: "CreditCard" },
      { name: "ROI (Return on Investment) Calculator", slug: "roi", description: "Evaluate the profitability of an investment.", isImplemented: true, iconName: "Activity" },
      { name: "NPV (Net Present Value) Calculator", slug: "npv", description: "Analyze the profitability of a project.", isImplemented: true, iconName: "LineChart" },
    ],
  },
  {
    name: "Health & Fitness Calculators",
    iconName: "HeartPulse",
    calculators: [
      { name: "BMI (Body Mass Index) Calculator", slug: "bmi", description: "Check your body mass index.", isImplemented: true, iconName: "Scale" },
      { name: "BMR (Basal Metabolic Rate) Calculator", slug: "bmr", description: "Calculate your daily calorie needs at rest.", isImplemented: true, iconName: "HeartPulse" },
      { name: "Calorie Calculator", slug: "calorie", description: "Estimate your daily calorie needs.", isImplemented: true, iconName: "Flame" },
      { name: "Pregnancy Due Date Calculator", slug: "pregnancy-due-date", description: "Estimate your baby's due date.", isImplemented: true, iconName: "CalendarDays" },
      { name: "Blood Pressure Calculator", slug: "blood-pressure", description: "Interpret your blood pressure readings.", isImplemented: true, iconName: "Activity" },
      { name: "Water Intake Calculator", slug: "water-intake", description: "Estimate your daily water needs.", isImplemented: true, iconName: "Droplet" },
      { name: "Steps to Calorie Calculator", slug: "steps-to-calorie", description: "Convert steps walked to calories burned.", isImplemented: true, iconName: "Footprints" },
      { name: "Muscle Mass Calculator", slug: "muscle-mass", description: "Estimate your lean body mass.", isImplemented: true, iconName: "Dumbbell" },
    ],
  },
  {
    name: "Engineering & Science Calculators",
    iconName: "FlaskConical",
    calculators: [
      { name: "Scientific Notation Calculator", slug: "scientific-notation", description: "Convert numbers to/from scientific notation.", isImplemented: true, iconName: "Atom" },
      { name: "Graphing Calculator", slug: "graphing", description: "Plot mathematical functions on a graph.", isImplemented: true, isDemo: true, iconName: "Spline" },
      { name: "Matrix Calculator", slug: "matrix", description: "Perform matrix addition, subtraction, multiplication.", isImplemented: true, iconName: "LayoutGrid" },
      { name: "Chemistry Molar Mass Calculator", slug: "chemistry-molar-mass", description: "Calculate the molar mass of compounds.", isImplemented: true, iconName: "FlaskConical" },
      { name: "Electricity Calculator", slug: "electricity", description: "Estimate appliance electricity costs.", isImplemented: true, iconName: "Zap" },
      { name: "Ohm's Law Calculator", slug: "ohms-law", description: "Calculate V, I, or R based on Ohm's Law.", isImplemented: true, iconName: "Zap" },
      { name: "Wavelength Calculator", slug: "wavelength", description: "Convert between wavelength and frequency.", isImplemented: true, iconName: "Signal" },
      { name: "Binary/Hexadecimal Calculator", slug: "binary-hexadecimal", description: "Convert between number systems.", isImplemented: true, iconName: "Binary" },
    ],
  },
  {
    name: "Everyday Life Calculators",
    iconName: "Sparkles",
    calculators: [
      { name: "Tip Calculator", slug: "tip", description: "Calculate tips and split the bill.", isImplemented: true, iconName: "HandCoins" },
      { name: "Discount Calculator", slug: "discount", description: "Calculate final price after a discount.", isImplemented: true, iconName: "Tag" },
      { name: "Unit Converter", slug: "unit-converter", description: "Convert between different units of measurement.", isImplemented: true, isDemo: true, iconName: "Replace" },
      { name: "Currency Converter", slug: "currency-converter", description: "Convert between different currencies.", isImplemented: true, isDemo: true, iconName: "Landmark" },
      { name: "Age Calculator", slug: "age", description: "Calculate age in years, months, and days.", isImplemented: true, iconName: "Cake" },
      { name: "Date Difference Calculator", slug: "date-difference", description: "Find the duration between two dates.", isImplemented: true, iconName: "CalendarClock" },
      { name: "Time Calculator", slug: "time", description: "Add or subtract time durations.", isImplemented: true, iconName: "Clock" },
      { name: "Password Generator", slug: "password-generator", description: "Create strong, random passwords.", isImplemented: true, iconName: "KeyRound" },
    ],
  },
  {
    name: "Advanced & Special Tools",
    iconName: "Wand2",
    calculators: [
      { name: "Function Graph Plotter", slug: "graphing", description: "Visualize equations on a 2D graph.", isImplemented: true, isDemo: true, iconName: "Spline" },
      { name: "Casio-style Calculator", slug: "casio-style", description: "A familiar scientific calculator interface.", isImplemented: true, iconName: "Calculator" },
      { name: "Barcode Generator", slug: "barcode-generator", description: "Generate scannable CODE128 barcodes.", isImplemented: true, iconName: "ScanLine" },
      { name: "QR Code Generator", slug: "qr-code-generator", description: "Create and download custom QR codes.", isImplemented: true, iconName: "QrCode" },
      { name: "Random Number Generator", slug: "random-number-generator", description: "Generate random numbers in a range.", isImplemented: true, iconName: "Dice5" },
      { name: "Password Strength Checker", slug: "password-strength-checker", description: "Analyze the strength of your password.", isImplemented: true, iconName: "LockKeyhole" },
      { name: "Math Formula Solver", slug: "ai-suggestions", description: "Get AI suggestions for math formulas.", isImplemented: true, iconName: "Wand2" },
    ],
  },
];
