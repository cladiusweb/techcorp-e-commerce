'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toastMessage: string | null;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage or server on mount
  useEffect(() => {
    const loadCart = async () => {
      // 1. First load from localStorage for instant display
      try {
        const local = localStorage.getItem('techcorp_cart');
        if (local) {
          setItems(JSON.parse(local));
        }
      } catch (e) {
        console.error('LocalStorage read error:', e);
      }

      // 2. Fetch from backend API
      try {
        const res = await fetch(`${API_BASE_URL}/cart`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.items?.length > 0) {
            setItems(json.data.items);
            localStorage.setItem('techcorp_cart', JSON.stringify(json.data.items));
          }
        }
      } catch {
        // Backend offline or starting, local storage remains active
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('techcorp_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const closeToast = () => setToastMessage(null);

  const addToCart = async (product: Product, quantity = 1) => {
    const prodId = product._id || product.id || '';
    
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.productId === prodId);
      if (existing) {
        return prevItems.map((i) =>
          i.productId === prodId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prevItems,
        {
          id: `item-${Date.now()}`,
          productId: prodId,
          product,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
        },
      ];
    });

    showToast(`"${product.name}" sepete eklendi!`);

    // Sync with backend API asynchronously
    try {
      await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: prodId, quantity }),
      });
    } catch (e) {
      console.warn('API sync warning (using client cart state):', e);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );

    try {
      await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
    } catch (e) {
      console.warn('API sync warning:', e);
    }
  };

  const removeFromCart = async (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    showToast('Ürün sepetten çıkarıldı.');

    try {
      await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('API sync warning:', e);
    }
  };

  const clearCart = async () => {
    setItems([]);
    try {
      await fetch(`${API_BASE_URL}/cart`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('API sync warning:', e);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toastMessage,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
