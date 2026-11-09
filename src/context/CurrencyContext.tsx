import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, ExchangeRates } from '../types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: ExchangeRates;
  formatPrice: (usdAmount: number, forceCurrency?: Currency) => string;
  convertPrice: (usdAmount: number, targetCurrency?: Currency) => number;
  currencySymbol: string;
}

const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  EGP: 49.50,
};

const SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  EGP: 'E£',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('love_egypt_currency');
    return (saved as Currency) || 'USD';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('love_egypt_currency', c);
  };

  const convertPrice = (usdAmount: number, targetCurrency: Currency = currency): number => {
    const rate = DEFAULT_RATES[targetCurrency] || 1;
    return Math.round(usdAmount * rate);
  };

  const formatPrice = (usdAmount: number, forceCurrency?: Currency): string => {
    const activeCurrency = forceCurrency || currency;
    const converted = convertPrice(usdAmount, activeCurrency);
    const symbol = SYMBOLS[activeCurrency];

    if (activeCurrency === 'EGP') {
      return `${converted.toLocaleString()} E£`;
    }
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates: DEFAULT_RATES,
        formatPrice,
        convertPrice,
        currencySymbol: SYMBOLS[currency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
