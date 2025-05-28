
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sigma,
  Landmark,
  HeartPulse,
  FlaskConical,
  Sparkles,
  Wand2,
  Calculator as CalculatorIcon,
  ChevronRight,
  Percent,
  Atom,
  Hash, // Icon for Average Calculator
  Ratio, // Icon for Ratio Calculator
  DivideSquare, // Icon for Fraction Calculator
  Layers, // Icon for LCM & HCF Calculator
  Baseline, // Icon for Exponent Calculator
  Target, // Icon for Logarithm Calculator
  Binary, // Icon for Modulo Calculator & Binary/Hex Calculator
  Banknote, // Icon for Loan EMI Calculator
  TrendingUp, // Icon for SIP Calculator
  PiggyBank, // Icon for PPF Calculator
  ShieldCheck, // Icon for FD Calculator
  ReceiptText, // Icon for GST Calculator
  FileText, // Icon for Income Tax Calculator
  ArrowBigUpDash, // Corrected Icon for Inflation Calculator
  CreditCard, // Icon for Credit Card Payment Calculator
  Activity, // Icon for ROI, Blood Pressure Calculator
  LineChart, // Icon for NPV Calculator
  Scale, // Icon for BMI Calculator
  Flame, // Icon for Calorie Calculator
  CalendarDays, // Icon for Pregnancy Due Date
  Droplet, // Icon for Water Intake Calculator
  Footprints, // Icon for Steps to Calorie Calculator
  Dumbbell, // Icon for Muscle Mass Calculator
  Spline, // Icon for Graphing Calculator
  Grid3x3, // Icon for Matrix page title
  LayoutGrid, // Icon for Matrix Calculator in the list
  Zap, // Icon for Electricity Calculator, Ohm's Law
  Signal, // Icon for Wavelength Calculator
  Users, // Added for Muscle Mass Calculator inputs if needed elsewhere
  HandCoins, // Icon for Tip Calculator
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CalculatorItem {
  name: string;
  slug: string;
  isImplemented?: boolean;
  isAdvanced?: boolean; // To indicate it's a complex feature, even if a basic version is there
  icon?: LucideIcon;
}

interface CalculatorCategory {
  name: string;
  icon: LucideIcon;
  calculators: CalculatorItem[];
}

const calculatorCategories: CalculatorCategory[] = [
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
      { name: "Graphing Calculator", slug: "graphing", isImplemented: true, isAdvanced: true, icon: Spline },
      { name: "Matrix Calculator", slug: "matrix", isImplemented: true, icon: LayoutGrid },
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
      { name: "Discount Calculator", slug: "discount" },
      { name: "Unit Converter", slug: "unit-converter" },
      { name: "Currency Converter", slug: "currency-converter" },
      { name: "Age Calculator", slug: "age" },
      { name: "Date Difference Calculator", slug: "date-difference" },
      { name: "Time Calculator", slug: "time" },
      { name: "Password Generator", slug: "password-generator" },
    ],
  },
  {
    name: "Advanced & Special Tools",
    icon: Wand2,
    calculators: [
      { name: "Function Graph Plotter", slug: "function-graph-plotter" },
      { name: "Casio-style Calculator", slug: "casio-style" },
      { name: "Barcode Generator", slug: "barcode-generator" },
      { name: "QR Code Generator", slug: "qr-code-generator" },
      { name: "Random Number Generator", slug: "random-number-generator" },
      { name: "Password Strength Checker", slug: "password-strength-checker" },
      { name: "Math Formula Solver", slug: "math-formula-solver" },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <CalculatorIcon className="h-10 w-10 text-primary" />
            <CardTitle className="text-4xl font-bold">Explore Calculators</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Browse our comprehensive suite of calculators, organized by category.
            More tools are being added regularly!
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={category.name} className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-xl text-primary">
                  <CategoryIcon className="mr-3 h-6 w-6" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <ul className="space-y-2">
                  {category.calculators.map((calc) => {
                    const CalcItemIcon = calc.icon;
                    return (
                    <li key={calc.slug}>
                      <Link
                        href={calc.isImplemented ? `/calculators/${calc.slug}` : `#`}
                        className={`flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors group ${!calc.isImplemented ? 'cursor-not-allowed opacity-70' : ''}`}
                        aria-disabled={!calc.isImplemented}
                        tabIndex={!calc.isImplemented ? -1 : undefined}
                      >
                        <div className="flex items-center">
                          {CalcItemIcon && <CalcItemIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                          <span className="text-foreground/90 group-hover:text-primary">{calc.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {(!calc.isImplemented || calc.isAdvanced) && (
                            <Badge variant="outline" className="text-xs border-accent text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                              {calc.isAdvanced && calc.isImplemented ? "Basic" : "Soon"}
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    </li>
                  )}
                  )}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
    
