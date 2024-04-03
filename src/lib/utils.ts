import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


interface BCFBoard {
  id: number;
  name: string;
  createdAt: string;
}

interface BCF {
  id: number;
  name: string;
  createdAt: string;
  bcfBoards: BCFBoard[];
}

interface UseCase {
  id: number;
  name: string;
  createdAt: string;
  bcfs: BCF[];
}

export function buildMenuHierarchy(boards: UseCase[]) {
  return boards.map((board) => ({
    name: board.name,
    children: buildBcfHierarchy(board.bcfs),
  }));
}

export function buildBcfHierarchy(bcfs: BCF[]) {
  return bcfs.map((bcf) => ({
    name: bcf.name,
    children: buildBcfBoardHierarchy(bcf.bcfBoards),
  }));
}

export function buildBcfBoardHierarchy(bcfBoards: BCFBoard[]) {
  return bcfBoards.map((bcfBoard) => ({
    name: bcfBoard.name,
  }));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


