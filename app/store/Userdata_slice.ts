import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills?: string[];
  bio?: string;
}

export interface UserState {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Helper function to get user data from localStorage
const getUserFromLocalStorage = (): UserData | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null;
      }
    }
  }
  return null;
};

// Helper function to save user data to localStorage
const saveUserToLocalStorage = (user: UserData | null): void => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  }
};

// Initial state
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the slice
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // Initialize user from localStorage
    initializeUser: (state) => {
      const user = getUserFromLocalStorage();
      state.user = user;
      state.isAuthenticated = !!user;
    },
    // Set user data
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      saveUserToLocalStorage(action.payload);
    },
    // Update user data
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveUserToLocalStorage(state.user);
      }
    },
    // Clear user data (logout)
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      saveUserToLocalStorage(null);
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  initializeUser,
  setUser,
  updateUser,
  clearUser,
  setLoading,
  setError,
} = userDataSlice.actions;

// Export reducer
export default userDataSlice.reducer;
