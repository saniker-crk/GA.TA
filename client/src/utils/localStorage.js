// src/utils/localStorage.js

export const loadCartState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined; // Επιστρέφει undefined αν δεν υπάρχει αποθηκευμένο state
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Could not load cart state from localStorage:', err);
        return undefined;
    }
};

export const saveCartState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error('Could not save cart state to localStorage:', err);
    }
};
