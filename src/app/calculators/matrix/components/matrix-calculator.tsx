
"use client";

import React, { useState, type ChangeEvent } from "react"; // Added React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, Eraser, Grid, AppWindow, X } from "lucide-react";

const MAX_DIM = 5; // Maximum rows/columns

type MatrixData = number[][];
type OperationType = "add" | "subtract" | "multiply";

// Helper to initialize a matrix with default values (e.g., empty strings for input, 0 for calculation)
const createMatrix = (rows: number, cols: number, defaultValue: string | number = ""): (string | number)[][] => {
  return Array(rows).fill(null).map(() => Array(cols).fill(defaultValue));
};

function MatrixCalculatorComponent() {
  const [rowsA, setRowsA] = useState<number>(2);
  const [colsA, setColsA] = useState<number>(2);
  const [matrixA, setMatrixA] = useState<string[][]>(createMatrix(2, 2, "") as string[][]);

  const [rowsB, setRowsB] = useState<number>(2);
  const [colsB, setColsB] = useState<number>(2);
  const [matrixB, setMatrixB] = useState<string[][]>(createMatrix(2, 2, "") as string[][]);

  const [operation, setOperation] = useState<OperationType>("add");
  const [resultMatrix, setResultMatrix] = useState<MatrixData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDimensionChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
    otherDim: number,
    matrixSetter: React.Dispatch<React.SetStateAction<string[][]>>,
    isRows: boolean
  ) => {
    let newDim = parseInt(value, 10);
    if (isNaN(newDim) || newDim < 1) newDim = 1;
    if (newDim > MAX_DIM) newDim = MAX_DIM;
    setter(newDim);
    matrixSetter(createMatrix(isRows ? newDim : otherDim, isRows ? otherDim : newDim, "") as string[][]);
    setError(null);
    setResultMatrix(null);
  };

  const handleMatrixElementChange = (
    matrixSetter: React.Dispatch<React.SetStateAction<string[][]>>,
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    matrixSetter((prevMatrix) => {
      const newMatrix = prevMatrix.map(row => [...row]);
      newMatrix[rowIndex][colIndex] = value;
      return newMatrix;
    });
    setError(null);
    setResultMatrix(null);
  };

  const parseMatrix = (matrixStr: string[][]): MatrixData | null => {
    const parsed: MatrixData = [];
    for (let i = 0; i < matrixStr.length; i++) {
      parsed[i] = [];
      for (let j = 0; j < matrixStr[0].length; j++) {
        const val = parseFloat(matrixStr[i][j]);
        if (isNaN(val)) {
          setError(`Invalid number in matrix at row ${i + 1}, col ${j + 1}.`);
          return null;
        }
        parsed[i][j] = val;
      }
    }
    return parsed;
  };

  const handleCalculate = () => {
    setError(null);
    setResultMatrix(null);

    const numMatrixA = parseMatrix(matrixA);
    const numMatrixB = parseMatrix(matrixB);

    if (!numMatrixA || !numMatrixB) return; // Error already set by parseMatrix

    let result: MatrixData | null = null;

    try {
      switch (operation) {
        case "add":
          if (rowsA !== rowsB || colsA !== colsB) {
            setError("Matrices must have the same dimensions for addition."); return;
          }
          result = numMatrixA.map((row, i) => row.map((val, j) => val + numMatrixB[i][j]));
          break;
        case "subtract":
          if (rowsA !== rowsB || colsA !== colsB) {
            setError("Matrices must have the same dimensions for subtraction."); return;
          }
          result = numMatrixA.map((row, i) => row.map((val, j) => val - numMatrixB[i][j]));
          break;
        case "multiply":
          if (colsA !== rowsB) {
            setError("Number of columns in Matrix A must equal number of rows in Matrix B for multiplication."); return;
          }
          result = Array(rowsA).fill(null).map(() => Array(colsB).fill(0));
          for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
              for (let k = 0; k < colsA; k++) {
                result[i][j] += numMatrixA[i][k] * numMatrixB[k][j];
              }
            }
          }
          break;
        default:
          setError("Invalid operation selected."); return;
      }
    } catch (e) {
      setError("An error occurred during calculation.");
      console.error(e);
      return;
    }

    if (result) {
      // Round results for display
      setResultMatrix(result.map(row => row.map(val => parseFloat(val.toFixed(5)))));
    }
  };
  
  const handleClear = () => {
    setRowsA(2); setColsA(2); setMatrixA(createMatrix(2, 2, "") as string[][]);
    setRowsB(2); setColsB(2); setMatrixB(createMatrix(2, 2, "") as string[][]);
    setOperation("add");
    setResultMatrix(null);
    setError(null);
  };

  const renderMatrixInputs = (
    rows: number,
    cols: number,
    matrix: string[][],
    matrixSetter: React.Dispatch<React.SetStateAction<string[][]>>,
    matrixLabel: string
  ) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground/90">Matrix {matrixLabel} ({rows}x{cols})</h3>
      <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array(rows).fill(null).map((_, rIndex) =>
          Array(cols).fill(null).map((_, cIndex) => (
            <Input
              key={`${matrixLabel}-${rIndex}-${cIndex}`}
              type="number"
              placeholder={`A${rIndex+1}${cIndex+1}`}
              value={matrix[rIndex]?.[cIndex] ?? ""}
              onChange={(e) => handleMatrixElementChange(matrixSetter, rIndex, cIndex, e.target.value)}
              className="h-10 text-center text-sm min-w-[50px]"
              aria-label={`Matrix ${matrixLabel} element row ${rIndex+1} column ${cIndex+1}`}
            />
          ))
        )}
      </div>
    </div>
  );

  const renderResultMatrix = (matrix: MatrixData) => (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-primary">Result Matrix ({matrix.length}x{matrix[0]?.length || 0})</h3>
      <div className={`grid gap-1 p-2 bg-muted/50 rounded-md`} style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 1}, minmax(0, 1fr))` }}>
        {matrix.map((row, rIndex) =>
          row.map((val, cIndex) => (
            <div
              key={`result-${rIndex}-${cIndex}`}
              className="h-10 flex items-center justify-center text-sm border border-border rounded bg-background min-w-[50px] px-1"
            >
              {val.toLocaleString()}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Matrix A Dimensions and Inputs */}
      <Card className="p-4">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-xl flex items-center"><AppWindow className="mr-2 h-5 w-5 text-primary" /> Matrix A Setup</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="rowsA" className="whitespace-nowrap">Rows A:</Label>
            <Input id="rowsA" type="number" value={rowsA} min="1" max={MAX_DIM} onChange={(e) => handleDimensionChange(e.target.value, setRowsA, colsA, setMatrixA, true)} className="w-20 h-9" />
            <Label htmlFor="colsA" className="whitespace-nowrap">Cols A:</Label>
            <Input id="colsA" type="number" value={colsA} min="1" max={MAX_DIM} onChange={(e) => handleDimensionChange(e.target.value, setColsA, rowsA, setMatrixA, false)} className="w-20 h-9" />
          </div>
          {renderMatrixInputs(rowsA, colsA, matrixA, setMatrixA, "A")}
        </CardContent>
      </Card>

      {/* Operation Selector */}
      <div className="space-y-1.5">
        <Label htmlFor="operationSelect">Operation</Label>
        <Select value={operation} onValueChange={(val) => { setOperation(val as OperationType); setResultMatrix(null); setError(null); }}>
          <SelectTrigger id="operationSelect">
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">Addition (A + B)</SelectItem>
            <SelectItem value="subtract">Subtraction (A - B)</SelectItem>
            <SelectItem value="multiply">Multiplication (A * B)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Matrix B Dimensions and Inputs */}
       <Card className="p-4">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-xl flex items-center"><AppWindow className="mr-2 h-5 w-5 text-primary" /> Matrix B Setup</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
            <div className="flex items-center gap-2">
                <Label htmlFor="rowsB" className="whitespace-nowrap">Rows B:</Label>
                <Input id="rowsB" type="number" value={rowsB} min="1" max={MAX_DIM} onChange={(e) => handleDimensionChange(e.target.value, setRowsB, colsB, setMatrixB, true)} className="w-20 h-9" />
                <Label htmlFor="colsB" className="whitespace-nowrap">Cols B:</Label>
                <Input id="colsB" type="number" value={colsB} min="1" max={MAX_DIM} onChange={(e) => handleDimensionChange(e.target.value, setColsB, rowsB, setMatrixB, false)} className="w-20 h-9" />
            </div>
            {renderMatrixInputs(rowsB, colsB, matrixB, setMatrixB, "B")}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full sm:w-auto flex-grow">
          <Calculator className="mr-2 h-4 w-4" /> Calculate
        </Button>
        <Button onClick={handleClear} variant="outline" className="w-full sm:w-auto">
          <Eraser className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-destructive/10 border-destructive/50">
          <CardHeader className="py-2 px-3"><CardTitle className="flex items-center text-destructive text-sm"><AlertCircle className="mr-2 h-4 w-4" />Error</CardTitle></CardHeader>
          <CardContent className="py-2 px-3"><p className="text-destructive text-sm">{error}</p></CardContent>
        </Card>
      )}

      {/* Result Display */}
      {resultMatrix && (
        <Card className="bg-accent/10 border-accent/50 p-4">
          <CardContent className="p-0">
            {renderResultMatrix(resultMatrix)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
MatrixCalculatorComponent.displayName = "MatrixCalculatorComponent";
export const MatrixCalculator = React.memo(MatrixCalculatorComponent);
