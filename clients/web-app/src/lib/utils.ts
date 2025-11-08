import { clsx, type ClassValue } from "clsx";
import { addDays, endOfMonth, format, parseISO, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parsePeriod = (value: string | string[] | undefined) => {
  switch (value) {
    case '30': {
      return 30
    };
    case '60': {
      return 60;
    }
    case '90': {
      return 90
    }
    case '180': {
      return 180
    }
    default: {
      return undefined
    }
  }
}

export const parseRange = (params: { [key: string]: string | string[] | undefined }) => {
  const rangeStart = params.rangeStart;
  const rangeEnd = params.rangeEnd;

  try {
    if (rangeStart && rangeEnd && typeof rangeStart === 'string' && typeof rangeEnd === 'string') {

      return {
        startAt: parseISO(rangeStart),
        endAt: parseISO(rangeEnd)
      }
    }
    return {
      startAt: startOfMonth(new Date()),
      endAt: endOfMonth(new Date())
    }
  } catch (err) {
    return {
      startAt: startOfMonth(new Date()),
      endAt: endOfMonth(new Date())
    }
  }
}

export const parsePagination = (params: { [key: string]: string | string[] | undefined }) => {
  const page = params.page;
  const limit = params.limit;

  try {



    return {
      page: page ? parseInt(page as string) || 1 : 1,
      limit: limit ? parseInt(limit as string) || 25 : 25
    }

  } catch (err) {
    return {
      page: 1,
      limit: 25
    }
  }
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const formatMoneyValue = (value: number) => {
  return formatter.format(value)
}

export const formatPeriodDate = (start: Date, end: Date) => {
  return `${format(start, 'dd MMM', { locale: ptBR })} - ${format(end, 'dd MMM', { locale: ptBR })}`
}

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy \'às\' HH:mm:ss', { locale: ptBR })
}